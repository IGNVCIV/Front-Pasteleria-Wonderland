import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contacto from '../../pages/Contacto';

afterEach(() => cleanup());

vi.mock('../../components/Navbar', () => ({ default: () => <nav>Navbar</nav> }));
vi.mock('../../components/Footer', () => ({ default: () => <footer>Footer</footer> }));
vi.mock('../../components/AlertaSimple', () => ({
  default: ({ message }) => (message ? <div>{message}</div> : null),
}));

const renderContacto = () =>
  render(
    <MemoryRouter>
      <Contacto />
    </MemoryRouter>
  );

describe('Contacto.jsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Storage.prototype.getItem = vi.fn(() => null);
    Storage.prototype.setItem = vi.fn();
  });

  it('renderiza el formulario y los campos principales', () => {
    renderContacto();
    expect(screen.getByRole('heading', { name: /hablemos/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument();
  });

  it('muestra error si el nombre está vacío', () => {
    renderContacto();
    const btn = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(btn);
    expect(screen.getAllByText(/ingresa tu nombre/i)[0]).toBeInTheDocument();
  });

  it('muestra error si el nombre contiene números', () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Pedro123' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@correo.cl' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Hola mundo' } });
    const btn = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(btn);
    expect(screen.getByText(/el nombre no puede contener números/i)).toBeInTheDocument();
  });

  it('muestra error si el correo es inválido', () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Pedro' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'correo_invalido' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Hola mundo' } });
    const btn = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(btn);
    expect(screen.getByText(/correo inválido/i)).toBeInTheDocument();
  });

  it('muestra error si el mensaje es demasiado corto', () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Pedro' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test@correo.cl' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Hi' } });
    const btn = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(btn);
    expect(screen.getByText(/escribe un mensaje más largo/i)).toBeInTheDocument();
  });

  it('muestra mensaje de éxito al enviar formulario válido', () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Pedro' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'pedro@correo.cl' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Hola, quiero hacer un pedido grande' } });
    const btn = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(btn);
    expect(screen.getByText(/mensaje enviado/i)).toBeInTheDocument();
  });

  it('muestra alerta si se intenta enviar nuevamente antes de 1 minuto', () => {
    const mockData = [{ fecha: new Date().toISOString() }];
    Storage.prototype.getItem = vi.fn(() => JSON.stringify(mockData));
    renderContacto();
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Pedro' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'pedro@correo.cl' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Hola, quiero hacer un pedido grande' } });
    const btn = screen.getByRole('button', { name: /enviar/i });
    fireEvent.click(btn);
    expect(
      screen.getByText(/ya enviaste un mensaje hace poco/i)
    ).toBeInTheDocument();
  });

  it('limpia los campos al presionar "Limpiar"', () => {
    renderContacto();
    fireEvent.change(screen.getByLabelText(/nombre completo/i), { target: { value: 'Pedro' } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'pedro@correo.cl' } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: 'Mensaje de prueba' } });
    const resetBtn = screen.getByRole('button', { name: /limpiar/i });
    fireEvent.click(resetBtn);
    expect(screen.getByLabelText(/nombre completo/i)).toHaveValue('');
    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue('');
    expect(screen.getByLabelText(/mensaje/i)).toHaveValue('');
  });
});
