import { Component, OnInit } from '@angular/core';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: any;

  constructor(
    private userService: ServiceUsuarioService,
    private formBuilder: FormBuilder,
    private menuController: MenuController,
    private navController: NavController,
    private appComponent: AppComponent

  ) {
  }
  componente = this.appComponent.componentes;
  ngOnInit() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(parseInt(userId)).subscribe(
        data => {
          this.user = data;
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
}
