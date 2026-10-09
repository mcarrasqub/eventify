// Imports
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import { UserService } from '@/services/UserService';
import { useUserStore } from '@/stores/userstore';

// Test Suite
describe('UserService', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('debe obtener todos los usuarios del store', () => {
    const store = useUserStore();
    store.users = [
      {
        id: 1,
        name: 'User 1',
        email: 'u1@test.com',
        password: '123',
        role: 'user',
        phone: '1234567890',
      },
      {
        id: 2,
        name: 'User 2',
        email: 'u2@test.com',
        password: '123',
        role: 'admin',
        phone: '0987654321',
      },
    ];

    const users = UserService.getAll();
    expect(users.length).toBe(2);
  });

  it('debe encontrar un usuario por su ID', () => {
    const store = useUserStore();
    store.users = [
      {
        id: 1,
        name: 'User 1',
        email: 'u1@test.com',
        password: '123',
        role: 'user',
        phone: '1234567890',
      },
      {
        id: 2,
        name: 'User 2',
        email: 'u2@test.com',
        password: '123',
        role: 'admin',
        phone: '0987654321',
      },
    ];

    const user = UserService.getById(2);
    expect(user).toBeDefined();
    expect(user?.name).toBe('User 2');
    expect(user?.role).toBe('admin');
  });

  it('debe retornar undefined si el ID de usuario no existe', () => {
    const user = UserService.getById(999);
    expect(user).toBeUndefined();
  });
});
