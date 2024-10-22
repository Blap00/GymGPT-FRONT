import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage implements OnInit {
  user: any;
  image: any;
  


  constructor(private userService: ServiceUsuarioService,
    private menuController: MenuController,
    private navController: NavController,
    private appComponent: AppComponent
  ) {}
  componente = this.appComponent.componentes;
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
  mostrarMenu() {
    this.menuController.open('first');
    this.menuController.enable(true, 'first');
  }
  async openCamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });

    this.image = 'data:image/jpeg;base64,' + image.base64String;
  }
}