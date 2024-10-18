import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './auth-guard.guard'; // Importa el guard

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [authGuardGuard]  // Protegemos esta ruta con el guard
  },
  {
    path: 'sugerencias',
    loadChildren: () => import('./sugerencias/sugerencias.module').then( m => m.SugerenciasPageModule),
    canActivate: [authGuardGuard]  // Protegemos esta ruta con el guard
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule),
    canActivate: [authGuardGuard]  // Protegemos esta ruta con el guard
  },
  {
    path: 'camara',
    loadChildren: () => import('./camara/camara.module').then( m => m.CamaraPageModule),
    canActivate: [authGuardGuard]  // Protegemos esta ruta con el guard
  },
  {
    path: 'edit-user',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule),
    canActivate: [authGuardGuard]  // Protegemos esta ruta con el guard
  },
  {
    path: 'machine-info',
    loadChildren: () => import('./machine-info/machine-info.module').then( m => m.MachineInfoPageModule),
    canActivate: [authGuardGuard]  // Protegemos esta ruta con el guard
  },
  {
    path: 'buscar',
    loadChildren: () => import('./buscar/buscar.module').then( m => m.BuscarPageModule),
    canActivate: [authGuardGuard]  // Protegemos esta ruta con el guard
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
