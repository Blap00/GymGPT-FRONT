import { Component, OnInit } from '@angular/core';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: any;

  baseUrl: string = environment.baseUrl;

  constructor(
    private userService: ServiceUsuarioService,
    private formBuilder: FormBuilder,
    private menuController: MenuController,
    private navController: NavController,
    private appComponent: AppComponent

  ) {
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
  abrirPerfil(){
    this.navController.navigateForward('/edit-user')
  }
  mostrarMenu() {
    this.menuController.open('first');
    this.menuController.enable(true, 'first');
  }
}
