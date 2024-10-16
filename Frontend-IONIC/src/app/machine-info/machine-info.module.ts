import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MachineInfoPageRoutingModule } from './machine-info-routing.module';

import { MachineInfoPage } from './machine-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MachineInfoPageRoutingModule
  ],
  declarations: [MachineInfoPage]
})
export class MachineInfoPageModule {}
