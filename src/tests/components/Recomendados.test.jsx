import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Recomendados from '../../components/Recomendados';

afterEach(() => cleanup());

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

describe('Recomendados.jsx', () => {
  const MOCK_CATALOGO = [
    { id: "TC001", nombre: "Torta Cuadrada de Chocolate", precio: 45000, categoria: "Tortas Cuadradas", ventas: 120, imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-chocolate.jpg" },
    { id: "TC002", nombre: "Torta Cuadrada de Frutas",   precio: 50000, categoria: "Tortas Cuadradas", ventas: 80,  imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-frutas.jpg" },
    { id: "TT001", nombre: "Torta Circular de Vainilla",  precio: 40000, categoria: "Tortas Circulares", ventas: 450, imagen: "/assets/img/Catalogo/tortas-circulares/circular-vainilla.jpg" },
    { id: "TT002", nombre: "Torta Circular de Manjar",    precio: 42000, categoria: "Tortas Circulares", ventas: 95,  imagen: "/assets/img/Catalogo/tortas-circulares/circular-manjar.jpeg" },
    { id: "PI001", nombre: "Mousse de Chocolate",         precio: 5000,  categoria: "Postres Individuales", ventas: 180, imagen: "/assets/img/Catalogo/postres-individuales/mousse-chocolate.jpg" },
  ];

  it('renderiza correctamente los productos recomendados', () => {
    render(
      <MemoryRouter>
        <Recomendados catalogo={MOCK_CATALOGO} productoId="TC001" />
      </MemoryRouter>
    );

    expect(screen.getByText(/también te puede gustar/i)).toBeInTheDocument();
    const cards = screen.getAllByRole('img');
    expect(cards.length).toBeLessThanOrEqual(3);
  });

  it('no renderiza nada si no hay productos en el catálogo', () => {
    const { container } = render(
      <MemoryRouter>
        <Recomendados catalogo={[]} productoId="TC001" />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

  it('navega al detalle del producto al hacer click en "Ver Producto"', () => {
    render(
      <MemoryRouter>
        <Recomendados catalogo={MOCK_CATALOGO} productoId="TC002" />
      </MemoryRouter>
    );

    const btn = screen.getAllByRole('button', { name: /ver producto/i })[0];
    fireEvent.click(btn);

    expect(mockNavigate).toHaveBeenCalled();
    const rutaLlamada = mockNavigate.mock.calls[0][0];
    expect(rutaLlamada).toMatch(/\/producto\/[A-Z]+\d+/);
  });
});
