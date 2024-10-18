import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';  // Necesitamos Router para hacer redirecciones

export const authGuardGuard: CanActivateFn = (route, state) => {
  const userId = localStorage.getItem('userId'); // Obtenemos el userId desde el localStorage

  if (userId) {
    return true;  // El usuario está autenticado, permitir el acceso
  } else {
    // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
    const router = new Router(); // Creamos una instancia del Router
    router.navigate(['/iniciar-sesion']);  // Redirigimos al usuario a la página de inicio de sesión
    return false; // Bloqueamos el acceso a la ruta
  }
};
