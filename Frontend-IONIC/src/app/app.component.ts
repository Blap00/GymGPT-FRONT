import { Component } from '@angular/core';
import { MenuController} from '@ionic/angular';
import { Router } from '@angular/router';

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
  constructor(private menuController: MenuController ,
    private alertController: AlertController,
    private routerLink: Router,
  ) {}
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
      redirecTo: '/camaraa'
    },
    {
      icon:'search-outline',
      name: 'Buscar',
      redirecTo: '/buscar'
    },
    {
      icon: 'star-outline',
      name: 'Sugerencias',
      redirecTo: '/sugerencias'
    },
    {
      icon: 'person-outline',
      name: 'Perfil',
      redirecTo: '/perfil'
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

