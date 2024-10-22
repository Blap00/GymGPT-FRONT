import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular';
import { Router } from '@angular/router';
import { ServiceUsuarioService } from './services/service-usuario.service';

import { AlertController , NavController } from '@ionic/angular';
interface Componente{
  icon: string;
  name: string;
  redirecTo: string;

}
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  user: any;
  constructor(private userService: ServiceUsuarioService,
    private menuController: MenuController ,
    private alertController: AlertController,
    private routerLink: Router,
  ) {}
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
          // IT GETS UNDEFINED
          console.log(this.media_url)
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


  handlerMessage = '';
  async alertapro() {
    const alert = await this.alertController.create({
      header: '¿Estas Seguro?',
      message: 'Al cerrar la sesión volvera al inicio de registro.',
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Cancelo el salir de la sesión';
          },
        },
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Confirmo el cerrar la sesión, necesitara Abrir la cuenta nuevamente';
            this.cerrarSesion();
            this.routerLink.navigate(['/inicio'])
          },
        },
      ]
    });
    await alert.present();
  }
  cerrarSesion(){
    console.log(localStorage.clear());
    localStorage.setItem('sesnop','true');
    this.menuController.enable(false, 'first')
  }
  componentes: Componente[]=[
    {
      icon: 'home-outline',
      name:  'Inicio',
      redirecTo: '/inicio'
    },

    {
      icon: 'camera-outline',
      name:  'Camara',
      redirecTo: '/camara'
    },
    {
      icon: 'star-outline',
      name: 'Sugerencias',
      redirecTo: '/sugerencias'
    },
    {
      icon: 'person-outline',
      name: 'Perfil',
      redirecTo: '/user'
    },

  ]
  componentes1: Componente[]=[
    {
      icon:'exit-outline',
      name: 'Cerrar sesion',
      redirecTo: '/home'
    },
  ]
}

