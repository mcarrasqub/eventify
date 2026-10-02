// Imports
import { describe, expect, it } from 'vitest';
import Utils from '@/utils/Utils';

// Test Suite
describe('Utils - generateNextId', () => {
  it('debe retornar 1 cuando el arreglo está vacío', () => {
    const items: { id: number }[] = [];
    const nextId = Utils.generateNextId(items);
    expect(nextId).toBe(1);
  });

  it('debe generar el id consecutivo mayor al existente', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 5 }];
    const nextId = Utils.generateNextId(items);
    expect(nextId).toBe(6);
  });

  it('debe manejar listas desordenadas correctamente', () => {
    const items = [{ id: 10 }, { id: 3 }, { id: 7 }];
    const nextId = Utils.generateNextId(items);
    expect(nextId).toBe(11);
  });
});
