import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CartItem from '../../components/CartItem';

afterEach(() => cleanup());

describe('CartItem.jsx', () => {
  const mockItem = {
    id: 'TC001',
    nombre: 'Torta Cuadrada de Chocolate',
    precio: 45000,
    cantidad: 2,
    imagen: '/assets/img/Catalogo/tortas-cuadradas/cuadrada-chocolate.jpg',
  };

  const mockOnIncrease = vi.fn();
  const mockOnDecrease = vi.fn();
  const mockOnRemove = vi.fn();

  const renderItem = () =>
    render(
      <MemoryRouter>
        <CartItem
          item={mockItem}
          onIncrease={mockOnIncrease}
          onDecrease={mockOnDecrease}
          onRemove={mockOnRemove}
        />
      </MemoryRouter>
    );

  it('renderiza correctamente los datos del producto', () => {
    renderItem();

    expect(screen.getByText(/torta cuadrada de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/\$ *45\.000/)).toBeInTheDocument();
    expect(screen.getByText(/\$ *90\.000/)).toBeInTheDocument(); // subtotal = 45000 * 2
    const img = screen.getByRole('img', { name: /torta cuadrada de chocolate/i });
    expect(img).toHaveAttribute('src', mockItem.imagen);
  });

  it('llama a onIncrease al hacer click en "+"', () => {
    renderItem();
    const btnPlus = screen.getByTitle('Aumentar cantidad');
    fireEvent.click(btnPlus);
    expect(mockOnIncrease).toHaveBeenCalledWith(mockItem.id);
  });

  it('llama a onDecrease al hacer click en "−"', () => {
    renderItem();
    const btnMinus = screen.getByTitle('Disminuir cantidad');
    fireEvent.click(btnMinus);
    expect(mockOnDecrease).toHaveBeenCalledWith(mockItem.id);
  });

  it('llama a onRemove al hacer click en "Eliminar"', () => {
    renderItem();
    const btnRemove = screen.getByRole('button', { name: /eliminar/i });
    fireEvent.click(btnRemove);
    expect(mockOnRemove).toHaveBeenCalledWith(mockItem.id);
  });
});
