import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MensajesSection from "../../components/MensajesAdmin";

describe("Componente MensajesAdmin", () => {
  it("se renderiza correctamente con el título y mensaje vacío", () => {
    render(<MensajesSection />);

    expect(screen.getByText("Bandeja de Mensajes")).toBeInTheDocument();

 
    const mensaje = screen.getByText("No hay mensajes nuevos");
    expect(mensaje).toBeInTheDocument();
    expect(mensaje).toHaveClass("mensaje-vacio");
  });

  it("coincide con el snapshot actual", () => {
    const { container } = render(<MensajesSection />);
    expect(container).toMatchSnapshot();
  });
});


