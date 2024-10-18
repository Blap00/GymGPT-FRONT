import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceUsuarioService } from '../services/service-usuario.service'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: ServiceUsuarioService // Asegúrate de que tu servicio esté configurado correctamente
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  goToRegistrarse() {
    this.navCtrl.navigateForward('/registrarse');
  }

  goToHome() {
    this.navCtrl.navigateForward('/home');
  }
  goToInicio(){
    this.navCtrl.navigateForward('/inicio');
  }
  username:string ='';
  login() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    const formData = this.loginForm.value;
    const body = {
      email: formData.email,
      password: formData.password,
    };
    this.username = body.email.split('@')[0]
    this.authService.loginUser(body).subscribe(
      (response) => {
        localStorage.removeItem('userId'); // Limpia el localStorage
        const userId = response.user   ; // Ajusta según tu respuesta de la API
        localStorage.setItem('userId', userId); // Guarda la ID en localStorage
        localStorage.removeItem('token'); // Limpia el localStorage


        const tokenRequestBody = {
            username: this.username,
            password: body.password
        };

        this.authService.getToken(tokenRequestBody).subscribe(
          (tokenResponse: any) => {
            const token = tokenResponse.access; // Ajusta según tu respuesta
            localStorage.setItem('token', token);
            this.goToInicio();
          },
          (error) => {
            console.error('Error al obtener el token', error);
            this.errorMessage = 'Error al obtener el token.';
          }
        );
        this.goToInicio();
      },
      (error) => {
        console.error('Error al iniciar sesión', error);
        this.errorMessage = error.error.message || 'Credenciales incorrectas. Inténtalo de nuevo.';
      }
    );
  }
}
