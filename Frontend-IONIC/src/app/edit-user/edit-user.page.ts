import { Component, OnInit } from '@angular/core';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  user: any;
  editForm: FormGroup;
  errorMessage = '';
  baseUrl: string = 'https://fabianpalma000.pythonanywhere.com/'; // Ajusta esto según tu entorno

  constructor(
    private userService: ServiceUsuarioService,
    private formBuilder: FormBuilder,
    private menuController: MenuController,
    private navController: NavController,
    private appComponent: AppComponent

  ) {
    this.editForm = this.formBuilder.group({
      nombreCompleto: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      edad: ['', [Validators.required]],
      altura: ['', [Validators.required]],
      peso: ['', [Validators.required]]
    });
  }
  componente = this.appComponent.componentes;
  media_url = ''
  statusImage:boolean = false
  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(parseInt(userId)).subscribe(
        data => {
          this.user = data;
          this.media_url = this.user.user.image
          if(this.user.user.image!='' && this.media_url!=undefined){
            this.user.user.image = `${this.baseUrl}${this.media_url}`;
            this.statusImage=true
          }else{
            console.log("La imagen no se encontro!")
            this.statusImage=false
            this.user.user.image = `${this.baseUrl}${this.media_url}`
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
      const fullName = `${this.user.user.first_name} ${this.user.user.last_name}`;

      this.editForm.patchValue({
        nombreCompleto: fullName,
        edad: this.user.user.age,
        altura: this.user.user.height,
        peso: this.user.user.weight
      });
    }
  }

  updateUser() {
    if (this.editForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    const formData = this.editForm.value;
    const nombres = formData.nombreCompleto.trim().split(' ');

    const firstName = nombres[0];  // El primer nombre
    const lastName = nombres.length > 1 ? nombres.slice(1).join(' ') : '';  // Los apellidos (si existen)

    const body = {
      first_name: firstName,
      last_name: lastName,
      password: formData.password,
      age: formData.edad,
      height: formData.altura,
      weight: formData.peso
    };


    this.userService.updateUser(body).subscribe(
      (response) => {
        console.log('Perfil actualizado exitosamente', response);
        // this.navController.navigateForward('/perfil');
      },
      (error) => {
        console.error('Error al actualizar el perfil', error);
        this.errorMessage = 'Error al actualizar el perfil';
      }
    );
  }
  mostrarMenu() {
    this.menuController.open('first');
    this.menuController.enable(true, 'first');
  }
}
