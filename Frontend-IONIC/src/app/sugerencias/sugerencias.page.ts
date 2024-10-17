import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ToastController } from '@ionic/angular'; // Para mostrar notificaciones

@Component({
  selector: 'app-sugerencias',
  templateUrl: './sugerencias.page.html',
  styleUrls: ['./sugerencias.page.scss'],
})
export class SugerenciasPage implements OnInit {
  user: any;
  sugerenciaForm: FormGroup; // Formulario reactivo para sugerencias
  media_url: string = '';
  statusImage: boolean = false;
  baseUrl: string = 'http://localhost:8000'; // Ajusta esto según tu entorno
  componente = this.appComponent.componentes;

  constructor(
    private userService: ServiceUsuarioService,
    private menuController: MenuController,
    private navController: NavController,
    private appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private toastController: ToastController // Para mostrar mensajes de éxito/error
  ) {
    // Inicializamos el formulario reactivo
    this.sugerenciaForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required]
    });
  }

  ngOnInit() {
    const userId = localStorage.getItem('userId'); // Recupera la ID del usuario
    if (userId) {
      this.userService.getUser(parseInt(userId)).subscribe(
        data => {
          this.user = data;
          this.media_url = this.user.user.image;
          if (this.user.user.image && this.user.user.image !== '') {
            this.user.user.image = `${this.baseUrl}${this.media_url}`;
            this.statusImage = true;
          } else {
            console.log("La imagen no se encontró.");
            this.statusImage = false;
          }
          this.populateForm();
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
  populateForm() {
    if (this.user) {
      this.sugerenciaForm.patchValue({
        first_name: this.user.user.first_name,
        last_name: this.user.user.last_name,
        email: this.user.user.email
      });
    }
  }

  mostrarMenu() {
    this.menuController.open('first');
    this.menuController.enable(true, 'first');
  }

  // Método para enviar la sugerencia
  enviarSugerencia() {
    if (this.sugerenciaForm.valid) {
      const sugerenciaData = this.sugerenciaForm.value;
      console.log(sugerenciaData);
      this.userService.postFeedback(sugerenciaData).subscribe(
        async response => {
          console.log('Sugerencia enviada con éxito:', response);
          const toast = await this.toastController.create({
            message: 'Sugerencia enviada con éxito.',
            duration: 2000,
            color: 'success'
          });
          toast.present();
          this.sugerenciaForm.reset(); // Limpiar el formulario después de enviar
        },
        async error => {
          console.error('Error al enviar la sugerencia:', error);
          const toast = await this.toastController.create({
            message: 'Error al enviar la sugerencia. Inténtalo de nuevo.',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
    } else {
      console.error('El formulario no es válido.');
    }
  }
}
