import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage {

  constructor(private navCtrl: NavController) {}

  goToIniciarSesion() {
    this.navCtrl.navigateForward('/iniciar-sesion')
  }

  goToRegistrarse() {
    this.navCtrl.navigateForward('/registrarse')
  }
  goToHome(){
    this.navCtrl.navigateForward('/home')
  }
}
