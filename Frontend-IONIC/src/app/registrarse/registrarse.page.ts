import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage{

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
