import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceUsuarioService } from '../services/service-usuario.service';
import { MenuController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ToastController } from '@ionic/angular'; // Para mostrar notificaciones

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})
export class PaginaPrincipalPage implements OnInit {
  user: any;
  sugerenciaForm: FormGroup; // Formulario reactivo para sugerencias
  media_url: string = '';
  statusImage: boolean = false;
  baseUrl: string = 'http://localhost:8000'; // Ajusta esto según tu entorno
  componente = this.appComponent.componentes;

  constructor(
    private userService: ServiceUsuarioService,
    private menuController: MenuController,
    private navController: NavController,
    private appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private toastController: ToastController // Para mostrar mensajes de éxito/error
  ) {
    // Inicializamos el formulario reactivo
    this.sugerenciaForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required]
    });
  }
  ngOnInit() {
  }

}
