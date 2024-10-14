import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  goToIniciarSesion() {
    this.navCtrl.navigateForward('/iniciar-sesion')
  }

  goToRegistrarse() {
    this.navCtrl.navigateForward('/registrarse')
  }
}