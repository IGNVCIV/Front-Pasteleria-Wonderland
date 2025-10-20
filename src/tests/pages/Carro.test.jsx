import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carro from '../../pages/Carro';

afterEach(() => cleanup());

vi.mock('../../components/Navbar', () => ({ default: () => <nav>Navbar</nav> }));
vi.mock('../../components/Footer', () => ({ default: () => <footer>Footer</footer> }));
vi.mock('../../components/AlertaSimple', () => ({
  default: ({ message }) => (message ? <div>{message}</div> : null),
}));
vi.mock('../../components/CartItem', () => ({
  default: ({ item, onIncrease, onDecrease, onRemove }) => (
    <tr>
      <td>{item.nombre}</td>
      <td>{item.precio}</td>
      <td>
        <button onClick={() => onDecrease(item.id)}>-</button>
        <span>{item.cantidad}</span>
        <button onClick={() => onIncrease(item.id)}>+</button>
      </td>
      <td>{item.precio * item.cantidad}</td>
      <td>
        <button onClick={() => onRemove(item.id)}>Eliminar</button>
      </td>
    </tr>
  ),
}));


const MOCK_CART = [
  {
    id: 'PI001',
    nombre: 'Mousse de Chocolate',
    precio: 5000,
    cantidad: 2,
    categoria: 'Postres Individuales',
    imagen: '/img1.jpg',
  },
];

const renderCarro = () =>
  render(
    <MemoryRouter>
      <Carro />
    </MemoryRouter>
  );

describe('Carro.jsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Storage.prototype.getItem = vi.fn(() => JSON.stringify(MOCK_CART));
    Storage.prototype.setItem = vi.fn();
    Storage.prototype.removeItem = vi.fn();
  });

  it('renderiza correctamente con productos en el carrito', () => {
    renderCarro();
    expect(screen.getByText(/carro de compras/i)).toBeInTheDocument();
    expect(screen.getByText(/mousse de chocolate/i)).toBeInTheDocument();
    expect(screen.getByText(/total: \$\s*10\.000/i)).toBeInTheDocument();
  });

  it('muestra mensaje cuando el carrito está vacío', () => {
    Storage.prototype.getItem = vi.fn(() => null);
    renderCarro();
    expect(screen.getByText(/tu carro de compras está vacío/i)).toBeInTheDocument();
  });

  it('aumenta la cantidad al hacer clic en +', () => {
    renderCarro();
    const plusBtn = screen.getByText('+');
    fireEvent.click(plusBtn);
    expect(Storage.prototype.setItem).toHaveBeenCalled();
  });

  it('disminuye la cantidad al hacer clic en -', () => {
    renderCarro();
    const minusBtn = screen.getByText('-');
    fireEvent.click(minusBtn);
    expect(Storage.prototype.setItem).toHaveBeenCalled();
  });

  it('elimina un producto del carrito', () => {
    renderCarro();
    const eliminarBtn = screen.getAllByText(/eliminar/i)[0];
    fireEvent.click(eliminarBtn);
    expect(screen.getByText(/producto eliminado del carrito/i)).toBeInTheDocument();
  });

  it('vacía el carrito correctamente', () => {
    renderCarro();
    const btn = screen.getByRole('button', { name: /eliminar carrito/i });
    fireEvent.click(btn);
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('cart');
    expect(screen.getByText(/carrito eliminado con éxito/i)).toBeInTheDocument();
  });

  it('muestra alerta si el carrito ya está vacío', () => {
    Storage.prototype.getItem = vi.fn(() => null);
    renderCarro();
    const btn = screen.getByRole('button', { name: /eliminar carrito/i });
    fireEvent.click(btn);
    expect(screen.getByText(/tu carrito ya está vacío/i)).toBeInTheDocument();
  });

  it('muestra advertencia si se intenta comprar sin productos', () => {
    Storage.prototype.getItem = vi.fn(() => JSON.stringify([]));
    renderCarro();
    const finalizarBtn = screen.getByRole('button', { name: /finalizar compra/i });
    fireEvent.click(finalizarBtn);
    expect(screen.getByText(/tu carrito está vacío/i)).toBeInTheDocument();
  });
});
