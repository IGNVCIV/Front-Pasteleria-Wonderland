import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';

afterEach(() => cleanup());

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: vi.fn() };
});

describe('ProductCard.jsx', () => {
  const mockNavigate = vi.fn();
  const mockAddToCart = vi.fn();

  const producto = { 
    id: "TC001", 
    nombre: "Torta Cuadrada de Chocolate", 
    precio: 45000, 
    categoria: "Tortas Cuadradas", 
    ventas: 120, 
    imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-chocolate.jpg"
  };

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    mockNavigate.mockReset();
    mockAddToCart.mockReset();
  });

  it('renderiza nombre, precio e imagen correctamente', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAddToCart={mockAddToCart} />
      </MemoryRouter>
    );

    expect(screen.getByText(/torta cuadrada de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ *45\.000/)).toBeInTheDocument();
    const img = screen.getByAltText(/torta cuadrada de chocolate/i);
    expect(img).toHaveAttribute('src', producto.imagen);
  });

  it('usa un valor alternativo si no se proporciona imagen', () => {
    const sinImagen = { ...producto, imagen: '' };

    render(
      <MemoryRouter>
        <ProductCard producto={sinImagen} onAddToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('navega al detalle del producto al hacer click en la card', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAddToCart={mockAddToCart} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/torta cuadrada de chocolate/i));
    expect(mockNavigate).toHaveBeenCalledWith('/producto/TC001');
  });

  it('dispara onAddToCart sin navegar', () => {
    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAddToCart={mockAddToCart} />
      </MemoryRouter>
    );

    const btn = screen.getByRole('button', { name: /agregar al carrito/i });
    fireEvent.click(btn);

    expect(mockAddToCart).toHaveBeenCalledWith(producto);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
