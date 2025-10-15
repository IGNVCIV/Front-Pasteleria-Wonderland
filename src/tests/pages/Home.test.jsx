import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => cleanup());

vi.mock('bootstrap', () => ({ Carousel: vi.fn() }));

vi.mock('../../lib/Data_Catalogo', () => {
  const MOCK_CATALOGO = [
    { id: "TC001", nombre: "Torta Cuadrada de Chocolate", precio: 45000, categoria: "Tortas Cuadradas", ventas: 120, imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-chocolate.jpg" },
    { id: "TC002", nombre: "Torta Cuadrada de Frutas",   precio: 50000, categoria: "Tortas Cuadradas", ventas: 80,  imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-frutas.jpg" },
    { id: "TT001", nombre: "Torta Circular de Vainilla",  precio: 40000, categoria: "Tortas Circulares", ventas: 450, imagen: "/assets/img/Catalogo/tortas-circulares/circular-vainilla.jpg" },
    { id: "TT002", nombre: "Torta Circular de Manjar",    precio: 42000, categoria: "Tortas Circulares", ventas: 95,  imagen: "/assets/img/Catalogo/tortas-circulares/circular-manjar.jpeg" },
    { id: "PI001", nombre: "Mousse de Chocolate",         precio: 5000,  categoria: "Postres Individuales", ventas: 180, imagen: "/assets/img/Catalogo/postres-individuales/mousse-chocolate.jpg" },
  ];
  const fn = () => ({ catalogo: MOCK_CATALOGO });
  return { default: fn, CATALOGO_INICIAL: MOCK_CATALOGO };
});

import Home from '../../pages/Home';

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

describe('Home.jsx', () => {
  beforeEach(() => vi.clearAllMocks());

  // [Renderizado]
  it('muestra encabezado "Productos de la semana", carrusel y Noticia', () => {
    renderHome();
    expect(screen.getByRole('heading', { name: /productos de la semana/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /slide 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /slide 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /slide 3/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /técnica internacional que inspira nuestra pastelería/i })).toBeInTheDocument();
  });

  // [Estado] + [Renderizado condicional]
  it('con datos: renderiza los 4 top por ventas y no muestra "Cargando productos..."', async () => {
    renderHome();
    const links = await screen.findAllByRole('link', { name: /ver producto/i });
    expect(links).toHaveLength(4);
    expect(screen.getByText(/torta circular de vainilla/i)).toBeInTheDocument();
    expect(screen.getByText(/mousse de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/torta cuadrada de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/torta circular de manjar/i)).toBeInTheDocument();
    expect(screen.queryByText(/cargando productos/i)).not.toBeInTheDocument();
  });

  // [Renderizado]
  it('los CTAs enlazan a /productos', () => {
    renderHome();
    expect(screen.getByRole('link', { name: /revisa nuestra carta/i })).toHaveAttribute('href', '/productos');
    expect(screen.getByRole('link', { name: /conoce nuestras tortas artesanales/i })).toHaveAttribute('href', '/productos');
  });
});

// [Renderizado condicional]
describe('Home.jsx – catálogo vacío', () => {
  it('permanece "Cargando productos..." cuando no hay datos', async () => {
    vi.resetModules();
    vi.doMock('../../lib/Data_Catalogo', () => ({
      default: () => ({ catalogo: [] }),
      CATALOGO_INICIAL: [],
    }));
    const { default: HomeReloaded } = await import('../../pages/Home');

    render(
      <MemoryRouter>
        <HomeReloaded />
      </MemoryRouter>
    );

    expect(screen.getByText(/cargando productos/i)).toBeInTheDocument();
    const links = screen.queryAllByRole('link', { name: /ver producto/i });
    expect(links).toHaveLength(0);
  });
});
