import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importa ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { EditUserPageRoutingModule } from './edit-user-routing.module';

import { EditUserPage } from './edit-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditUserPageRoutingModule,
    ReactiveFormsModule  // Asegúrate de agregar ReactiveFormsModule aquí

  ],
  declarations: [EditUserPage]
})
export class EditUserPageModule {}
