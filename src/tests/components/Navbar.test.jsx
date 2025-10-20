import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

afterEach(() => cleanup());

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar.jsx', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza los enlaces principales correctamente', () => {
    renderNavbar();

    expect(screen.getByText(/inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/productos/i)).toBeInTheDocument();
    expect(screen.getByText(/contáctanos/i)).toBeInTheDocument();
    expect(screen.getByText(/mi cuenta/i)).toBeInTheDocument();
    expect(screen.getByText(/carro de compras/i)).toBeInTheDocument();
  });

  it('muestra el contador del carrito cuando hay productos', () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 'A1', cantidad: 2 }, { id: 'B2', cantidad: 3 }])
    );
    renderNavbar();
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge');
  });

  it('no muestra contador del carrito si está vacío', () => {
    localStorage.setItem('cart', JSON.stringify([]));

    renderNavbar();

    expect(screen.queryByText(/^\d+$/)).toBeNull();
  });

  it('contiene los enlaces del submenú de productos', () => {
    renderNavbar();

    expect(screen.getByText(/tortas cuadradas/i)).toBeInTheDocument();
    expect(screen.getByText(/tortas circulares/i)).toBeInTheDocument();
    expect(screen.getByText(/postres/i)).toBeInTheDocument();
    expect(screen.getByText(/vegano/i)).toBeInTheDocument();
  });

  it('el botón del carrito contiene el ícono correcto', () => {
    renderNavbar();

    const icon = screen.getByRole('link', { name: /carro de compras/i }).querySelector('i');
    expect(icon).toHaveClass('bi-cart3');
  });
});
