import { Component, OnInit } from '@angular/core';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage{

  // Definicion de objeto a mandar al Back mediante REST CONNECTION

  registerForm: FormGroup;
  errorMessage: string = '';


  constructor(private formBuilder: FormBuilder,private authService: ServiceUsuarioService, private navCtrl: NavController) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pass1: ['', [Validators.required, Validators.minLength(6)]],
      pass2: ['', [Validators.required]],
      terms: [false, Validators.requiredTrue] // Checkbox para términos
    });
  }

  goToIniciarSesion() {
    this.navCtrl.navigateForward('/iniciar-sesion')
  }

  goToRegistrarse() {
    this.navCtrl.navigateForward('/registrarse')
  }
  goToHome(){
    this.navCtrl.navigateForward('/home')
  }


  /****************
   * METODOS
   ****************/
  validatePasswords(): boolean {
    const pass1 = this.registerForm.get('pass1')?.value;
    const pass2 = this.registerForm.get('pass2')?.value;
    return pass1 === pass2;
  }

  register() {
    console.log("ON REGISTER!")
    if (!this.validatePasswords()) {
      this.errorMessage = 'Las contraseñas no coinciden';
      console.log("ON REGISTER, BAD PASS!")
      return;
    }
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      console.log("ON REGISTER!, ISNT ALL CHECKED")
      return;
    }
    const formData = this.registerForm.value;
    const fullName = formData.username.split(" ");

    // Asignar primer y segundo nombre (o apellido)
    formData.first_name = fullName[0];  // Primer nombre
    formData.last_name = fullName.length > 1 ? fullName.slice(1).join(" ") : "";  // Si hay más de un nombre, el resto se considera apellido
    const body = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.pass1,
      password2: formData.pass2,
    };
    this.authService.registerUser(body).subscribe(
      (response) => {
        console.log('Usuario registrado exitosamente', response);
        // Redirigir al login o dashboard después del registro
        this.goToIniciarSesion();
      },
      (error) => {
        console.error('Error al registrar el usuario', error);
      }
    );
  }

}
