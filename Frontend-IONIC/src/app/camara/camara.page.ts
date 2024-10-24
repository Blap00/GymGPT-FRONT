import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';import { Camera, CameraResultType } from '@capacitor/camera';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  image: string | null = null;
  user: any;
  


  constructor(private userService: ServiceUsuarioService,
    private menuController: MenuController,
    private navController: NavController,
    private appComponent: AppComponent
  ) {}
  componente = this.appComponent.componentes;
  media_url = ''
  statusImage:boolean = false
  baseUrl: string = 'http://localhost:8000'; // Ajusta esto según tu entorno
  ngOnInit() {
    const userId = localStorage.getItem('userId'); // Recupera la ID del usuario
    if (userId) {
      this.userService.getUser(parseInt(userId)).subscribe(
        data => {
          this.user = data;
          this.media_url = this.user.user.image
          if(this.user.user.image!=''){
            this.user.user.image = `${this.baseUrl}${this.media_url}`;
            this.statusImage=true
          }else{
            console.log("La imagen no se encontro!")
            this.statusImage=false
            this.user.user.image = `${this.baseUrl}${this.media_url}`
          }
          console.log('Datos del usuario:', this.user);
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.error('No hay un usuario conectado');
    }
  }
  mostrarMenu() {
    this.menuController.open('first');
    this.menuController.enable(true, 'first');
  }
  async openCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.videoElement.nativeElement.srcObject = stream;

      // Detener el stream cuando se cierre el video (opcional)
      this.videoElement.nativeElement.onended = () => {
        stream.getTracks().forEach(track => track.stop());
      };
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }
}