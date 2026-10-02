// Imports
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import type { UserInterface } from '@/interfaces/UserInterface';
import { AuthService } from '@/services/AuthService';
import { useAuthStore } from '@/stores/authstore';
import { useUserStore } from '@/stores/userstore';

// Test Suite
describe('AuthService', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('debe autenticar exitosamente y no exponer la contraseña en el usuario retornado', () => {
    const userStore = useUserStore();
    const testUser: UserInterface = {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@test.com',
      password: 'password123',
      role: 'admin',
      phone: '1234567890',
    };
    userStore.users = [testUser];

    const loggedUser = AuthService.login({
      email: 'juan@test.com',
      password: 'password123',
    });

    expect(loggedUser).not.toBeNull();
    expect(loggedUser?.email).toBe('juan@test.com');
    expect(loggedUser?.role).toBe('admin');
    expect((loggedUser as unknown as { password?: string }).password).toBeUndefined();

    // Validar que se guardó en la sesión
    const currentUser = AuthService.getCurrentUser();
    expect(currentUser?.email).toBe('juan@test.com');
  });

  it('debe retornar null cuando las credenciales son incorrectas', () => {
    const userStore = useUserStore();
    userStore.users = [
      {
        id: 1,
        name: 'Ana García',
        email: 'ana@test.com',
        password: 'password123',
        role: 'user',
        phone: '1234567890',
      },
    ];

    const invalidLogin = AuthService.login({
      email: 'ana@test.com',
      password: 'wrongpassword',
    });

    expect(invalidLogin).toBeNull();
    expect(AuthService.getCurrentUser()).toBeNull();
  });

  it('debe cerrar la sesión correctamente al llamar logout', () => {
    const authStore = useAuthStore();
    authStore.currentUser = {
      id: 1,
      name: 'Usuario Logueado',
      email: 'user@test.com',
      role: 'user',
      phone: '1234567890',
    };

    AuthService.logout();

    expect(AuthService.getCurrentUser()).toBeNull();
  });
});
