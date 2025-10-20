import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BandejaContacto from '../../components/BandejaContacto';


const mockMensajes = [
  {
    fecha: '19/10/2025',
    nombre: 'Cliente de prueba',
    correo: 'cliente@test.com',
    orden: 'ORD123',
    mensaje: 'Mensaje de prueba para verificar renderizado.',
  },
];

describe('Componente BandejaContacto', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockMensajes),
      })
    );
  });

  it('renderiza correctamente el título y descripción', () => {
    render(
      <MemoryRouter>
        <BandejaContacto />
      </MemoryRouter>
    );

    expect(screen.getByText(/Bandeja de contacto/i)).toBeInTheDocument();
    expect(screen.getByText(/Mensajes recibidos desde el formulario/i)).toBeInTheDocument();
  });

  it('muestra los datos del mensaje obtenido del fetch', async () => {
    render(
      <MemoryRouter>
        <BandejaContacto />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Cliente de prueba')).toBeInTheDocument();
      expect(screen.getByText('ORD123')).toBeInTheDocument();
    });
  });

  it('abre el modal al hacer clic en "Ver completo"', async () => {
    render(
      <MemoryRouter>
        <BandejaContacto />
      </MemoryRouter>
    );

    const boton = await screen.findByRole('button', { name: /Ver completo/i });
    fireEvent.click(boton);

    await waitFor(() => {
  const coincidencias = screen.getAllByText(/Mensaje de prueba para verificar renderizado/i);
  expect(coincidencias.length).toBeGreaterThan(1); // o el número exacto si lo sabes
});

  });

  it('cierra el modal al hacer clic en el botón "Cerrar"', async () => {
    render(
      <MemoryRouter>
        <BandejaContacto />
      </MemoryRouter>
    );

    const boton = await screen.findByRole('button', { name: /Ver completo/i });
    fireEvent.click(boton);

    const cerrar = await screen.findByRole('button', { name: /Cerrar/i });
    fireEvent.click(cerrar);

    await waitFor(() => {
      expect(screen.queryByText(/Mensaje de Cliente de prueba/i)).not.toBeInTheDocument();
    });
  });

  it('coincide con el snapshot actual', async () => {
    const { container } = render(
      <MemoryRouter>
        <BandejaContacto />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});


