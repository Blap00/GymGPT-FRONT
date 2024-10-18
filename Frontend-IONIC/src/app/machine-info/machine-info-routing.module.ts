import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MachineInfoPage } from './machine-info.page';

const routes: Routes = [
  {
    path: '',
    component: MachineInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachineInfoPageRoutingModule {}
