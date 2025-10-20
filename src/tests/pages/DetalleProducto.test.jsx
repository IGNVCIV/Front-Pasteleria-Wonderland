import React from 'react';
import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

afterEach(() => cleanup());

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('../../lib/Data_Catalogo', () => {
  const MOCK_CATALOGO = [
    { id: 'TC001', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, categoria: 'Tortas Cuadradas', imagen: '/img1.jpg' },
    { id: 'TT001', nombre: 'Torta Circular de Vainilla', precio: 40000, categoria: 'Tortas Circulares', imagen: '/img2.jpg' },
  ];
  const fn = () => ({ catalogo: MOCK_CATALOGO });
  return { default: fn, CATALOGO_INICIAL: MOCK_CATALOGO };
});

vi.mock('../../lib/Descripcion', () => ({
  DESCRIPCIONES_PRODUCTOS: {
    TC001: 'Deliciosa torta de chocolate con cobertura artesanal',
  },
}));

vi.mock('../../components/AlertaSimple', () => ({
  default: ({ message }) => (message ? <div>{message}</div> : null),
}));
vi.mock('../../components/Navbar', () => ({ default: () => <nav>Navbar</nav> }));
vi.mock('../../components/Footer', () => ({ default: () => <footer>Footer</footer> }));
vi.mock('../../components/Recomendados', () => ({ default: () => <div>Recomendados</div> }));

import DetalleProducto from '../../pages/DetalleProducto';

const renderDetalle = (id = 'TC001') =>
  render(
    <MemoryRouter initialEntries={[`/detalle/${id}`]}>
      <Routes>
        <Route path="/detalle/:id" element={<DetalleProducto />} />
        <Route path="/productos" element={<div>Redirigido a productos</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('DetalleProducto.jsx', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
    afterEach(() => {
      vi.resetModules();
    });

    it('renderiza correctamente el producto y su información', async () => {
      renderDetalle('TC001');

      expect(await screen.findByRole('heading', { name: /torta cuadrada de chocolate/i })).toBeInTheDocument();
      expect(screen.getByText(/\$45\.000/i)).toBeInTheDocument();
      expect(screen.getByText(/deliciosa torta de chocolate/i)).toBeInTheDocument();
    });

    it('muestra "Cargando producto..." si no hay catálogo', async () => {
      vi.doMock('../../lib/Data_Catalogo', () => ({
        default: () => ({ catalogo: [] }),
        CATALOGO_INICIAL: [],
      }));

      const { default: DetalleReloaded } = await import('../../pages/DetalleProducto');

      render(
        <MemoryRouter initialEntries={['/detalle/TC001']}>
          <DetalleReloaded />
        </MemoryRouter>
      );

      expect(await screen.findByText(/cargando producto/i)).toBeInTheDocument();
    });

    it('redirige si el producto no existe', async () => {
      vi.doMock('../../lib/Data_Catalogo', () => ({
        default: () => ({
          catalogo: [
            { id: 'TC001', nombre: 'Torta de Chocolate', precio: 45000, imagen: '/img1.jpg', categoria: 'Tortas' },
          ],
        }),
        CATALOGO_INICIAL: [],
      }));

      const { default: DetalleReloaded } = await import('../../pages/DetalleProducto');

      render(
        <MemoryRouter initialEntries={['/detalle/XYZ']}>
          <DetalleReloaded />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/productos');
      });
    });

    it('aumenta y disminuye la cantidad correctamente', async () => {
      renderDetalle('TC001');

      const input = await screen.findByDisplayValue('1');
      const increaseBtn = screen.getByRole('button', { name: /\+/i });
      const decreaseBtn = screen.getByRole('button', { name: /−|-/i });

      fireEvent.click(increaseBtn);
      expect(input.value).toBe('2');

      fireEvent.click(decreaseBtn);
      expect(input.value).toBe('1');
    });

    it('muestra alerta cuando se supera la cantidad máxima (8)', async () => {
      renderDetalle('TC001');

      const increaseBtn = await screen.findByRole('button', { name: /\+/i });

      for (let i = 0; i < 8; i++) fireEvent.click(increaseBtn);

      const alerta = await screen.findByText(/cantidad máxima/i);
      expect(alerta).toBeInTheDocument();
    });

    it('agrega producto al carrito correctamente', async () => {
      Storage.prototype.setItem = vi.fn();

      renderDetalle('TC001');

      const addButton = await screen.findByRole('button', { name: /añadir al carrito/i });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(Storage.prototype.setItem).toHaveBeenCalled();
      });
    });
});
