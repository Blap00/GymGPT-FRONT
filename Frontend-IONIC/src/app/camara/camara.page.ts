import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  image: string | null = null;
  user: any;
  model!: cocoSsd.ObjectDetection;

  constructor(
    private userService: ServiceUsuarioService,
    private menuController: MenuController,
    private navController: NavController,
    private appComponent: AppComponent
  ) {}

  componente = this.appComponent.componentes;
  media_url = '';
  statusImage = false;
  baseUrl: string = 'http://localhost:8000';

  async ngOnInit() {
    // Configura el backend de TensorFlow.js
    await tf.setBackend('webgl').then(() => {
      console.log('WebGL backend loaded.');
    }).catch(async () => {
      console.log('Error loading WebGL backend. Switching to CPU.');
      await tf.setBackend('cpu');
    });

    // Esperamos a que el backend esté listo antes de cargar el modelo
    await tf.ready();

    // Cargamos el modelo y lo asignamos
    this.model = await cocoSsd.load();
    console.log('Modelo coco-ssd cargado.');

    // Acceder a la cámara del dispositivo
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.videoElement.nativeElement.srcObject = stream;

      // Esperamos a que el video tenga sus dimensiones correctas
      this.videoElement.nativeElement.addEventListener('loadedmetadata', () => {
        console.log('Dimensiones del video:', this.videoElement.nativeElement.videoWidth, 'x', this.videoElement.nativeElement.videoHeight);
        this.detectFrame(); // Iniciar detección solo cuando el video esté listo
      });
    }).catch((error) => {
      console.error('Error al acceder a la cámara:', error);
    });

    // Recuperar los datos del usuario desde el localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(parseInt(userId)).subscribe(
        (data) => {
          this.user = data;
          this.media_url = this.user.user.image;
          if (this.user.user.image !== '') {
            this.user.user.image = `${this.baseUrl}${this.media_url}`;
            this.statusImage = true;
          } else {
            console.log('La imagen no se encontró!');
            this.statusImage = false;
            this.user.user.image = `${this.baseUrl}${this.media_url}`;
          }
          console.log('Datos del usuario:', this.user);
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.error('No hay un usuario conectado');
    }
  }

  detectFrame() {
    this.model.detect(this.videoElement.nativeElement).then((predictions: cocoSsd.DetectedObject[]) => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => this.detectFrame());
    });
  }

  renderPredictions(predictions: cocoSsd.DetectedObject[]) {
    predictions.forEach((prediction) => {
      console.log(`Objeto detectado: ${prediction.class}, Probabilidad: ${prediction.score}`);
    });
  }

  mostrarMenu() {
    this.menuController.open('first');
    this.menuController.enable(true, 'first');
  }

  async openCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;

      this.videoElement.nativeElement.onended = () => {
        stream.getTracks().forEach((track) => track.stop());
      };
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }
}
