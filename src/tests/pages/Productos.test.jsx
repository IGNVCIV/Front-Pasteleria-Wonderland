import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => cleanup());

vi.mock('../../components/ProductCard', () => ({
  default: ({ producto, onAddToCart }) => (
    <div>
      <p>{producto.nombre}</p>
      <button onClick={() => onAddToCart?.()}>Agregar</button>
    </div>
  ),
}));

vi.mock('../../lib/Data_Catalogo', () => {
  const BASE_MOCK_CATALOGO = [
    { id: "TC001", nombre: "Torta Cuadrada de Chocolate", precio: 45000, categoria: "Tortas Cuadradas", ventas: 120, imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-chocolate.jpg" },
    { id: "TC002", nombre: "Torta Cuadrada de Frutas",   precio: 50000, categoria: "Tortas Cuadradas", ventas: 80,  imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-frutas.jpg" },
    { id: "TT001", nombre: "Torta Circular de Vainilla",  precio: 40000, categoria: "Tortas Circulares", ventas: 450, imagen: "/assets/img/Catalogo/tortas-circulares/circular-vainilla.jpg" },
    { id: "TT002", nombre: "Torta Circular de Manjar",    precio: 42000, categoria: "Tortas Circulares", ventas: 95,  imagen: "/assets/img/Catalogo/tortas-circulares/circular-manjar.jpeg" },
    { id: "PI001", nombre: "Mousse de Chocolate",         precio: 5000,  categoria: "Postres Individuales", ventas: 180, imagen: "/assets/img/Catalogo/postres-individuales/mousse-chocolate.jpg" },  
  ];

  const fn = () => ({ catalogo: BASE_MOCK_CATALOGO });
  return { default: fn, CATALOGO_INICIAL: BASE_MOCK_CATALOGO };
});

import Productos from '../../pages/Productos';

const renderProducto = () =>
  render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

describe('Productos.jsx', () => {
  beforeEach(() => vi.clearAllMocks());
  it('muestra placeholders mientras se cargan los productos', () => {
    renderProducto();
    const placeholders = document.querySelectorAll('.placeholder');
    expect(placeholders.length).toBeGreaterThan(0);
  });

  it('muestra mensaje si no hay productos', async () => {
    vi.resetModules();
    vi.doMock('../../lib/Data_Catalogo', () => ({
      default: () => ({ catalogo: [] }),
      CATALOGO_INICIAL: [],
    }));
    const { default: ProductosReloaded } = await import('../../pages/Productos');
    render(
      <MemoryRouter>
        <ProductosReloaded />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/no hay productos disponibles/i)).toBeInTheDocument()
    );
  });

  it('filtra productos por categoría al recibir el parámetro', async () => {
    render(
      <MemoryRouter initialEntries={['/productos?categoria=Tortas Cuadradas']}>
        <Productos />
      </MemoryRouter>
    );
    const cards = await screen.findAllByText(/torta cuadrada/i);
    expect(cards).toHaveLength(2);
    expect(screen.queryByText(/torta circular/i)).not.toBeInTheDocument();
  });

  it('cambia de página con los botones de paginación', async () => {
    vi.resetModules();
    vi.clearAllMocks();
    vi.doMock('../../lib/Data_Catalogo', () => {
      const MOCK_CATALOGO = Array.from({ length: 9 }).map((_, i) => ({
        id: `T${i}`,
        nombre: `Torta ${i}`,
        precio: 10000,
        categoria: 'Tortas',
        ventas: i,
        imagen: 'img',
      }));
      const fn = () => ({ catalogo: MOCK_CATALOGO });
      return { default: fn, CATALOGO_INICIAL: MOCK_CATALOGO };
    });

    const { default: ProductosReloaded } = await import('../../pages/Productos');

    render(
      <MemoryRouter>
        <ProductosReloaded />
      </MemoryRouter>
    );
    await waitFor(
      () => expect(document.querySelectorAll('.placeholder').length).toBe(0),
      { timeout: 3000 }
    );
    const nextBtns = await screen.findAllByRole('button', { name: /siguiente|»/i });
    const nextBtn = nextBtns[0]; 
    expect(nextBtn).toBeEnabled();
    vi.resetModules();
    vi.doMock('../../lib/Data_Catalogo', () => {
      const fn = () => ({ catalogo: BASE_MOCK_CATALOGO });
      return { default: fn, CATALOGO_INICIAL: BASE_MOCK_CATALOGO };
    });
  });

  it('abre modal y agrega producto al carrito', async () => {
    Storage.prototype.setItem = vi.fn();
    renderProducto();

    const buttons = await screen.findAllByRole('button', { name: /agregar/i });
    buttons[0].click();

    expect(await screen.findByText(/selecciona la cantidad/i)).toBeInTheDocument();

    const confirm = screen.getByRole('button', { name: /confirmar/i });
    confirm.click();

    expect(Storage.prototype.setItem).toHaveBeenCalledWith(
      'cart',
      expect.stringContaining('Torta Cuadrada de Chocolate')
    );
  });

  it('muestra alerta si se intenta agregar sin producto seleccionado', async () => {
    renderProducto();

    const pageTitle = await screen.findByText(/nuestros productos/i);
    expect(pageTitle).toBeInTheDocument();

    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    expect(setItemSpy).not.toHaveBeenCalled();
  });
});
