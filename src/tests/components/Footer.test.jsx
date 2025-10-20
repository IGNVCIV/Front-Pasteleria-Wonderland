import '@testing-library/jest-dom/vitest';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../components/Footer';

afterEach(() => cleanup());

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

describe('Footer.jsx', () => {
  it('renderiza correctamente el footer con enlaces principales', () => {
    renderFooter();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/nosotros/i)).toBeInTheDocument();
    expect(screen.getByText(/tiendas/i)).toBeInTheDocument();
    expect(screen.getByText(/preguntas frecuentes/i)).toBeInTheDocument();
    expect(screen.getByText(/política de privacidad/i)).toBeInTheDocument();
  });

  it('muestra los enlaces de redes sociales', () => {
    renderFooter();

    const instagram = screen.getByLabelText(/instagram/i);
    const facebook = screen.getByLabelText(/facebook/i);
    const tiktok = screen.getByLabelText(/tiktok/i);

    expect(instagram).toHaveAttribute('href', expect.stringContaining('instagram'));
    expect(facebook).toHaveAttribute('href', expect.stringContaining('facebook'));
    expect(tiktok).toHaveAttribute('href', expect.stringContaining('tiktok'));
  });

  it('permite escribir en el campo de correo del formulario', () => {
    renderFooter();

    const input = screen.getByPlaceholderText(/ejemplo@correo\.cl/i);
    fireEvent.change(input, { target: { value: 'usuario@correo.cl' } });
    expect(input.value).toBe('usuario@correo.cl');
  });

  it('renderiza el logo y el copyright', () => {
    renderFooter();

    const logo = screen.getByAltText(/pastelería wonderland/i);
    expect(logo).toHaveAttribute('src', '/assets/img/Logos/Footer.png');

    expect(screen.getByText(/© pastelería wonderland/i)).toBeInTheDocument();
  });
});
