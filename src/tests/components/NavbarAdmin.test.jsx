import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NavbarAdmin from "../../components/NavbarAdmin";

describe("NavbarAdmin Component", () => {
  it("renderiza el título correctamente", () => {
    render(<NavbarAdmin toggleOffcanvas={() => {}} />);

    expect(
      screen.getByText(/Pastelería Wonderland • Administración/i)
    ).toBeInTheDocument();
  });

  it("muestra el botón del menú (ícono de lista)", () => {
    render(<NavbarAdmin toggleOffcanvas={() => {}} />);

    const boton = screen.getByRole("button");
    expect(boton).toBeInTheDocument();
    expect(boton.querySelector("i.bi.bi-list")).toBeTruthy(); 
  });

  it("llama a toggleOffcanvas cuando se hace clic en el botón", () => {
    const mockToggle = vi.fn();
    render(<NavbarAdmin toggleOffcanvas={mockToggle} />);

    const boton = screen.getByRole("button");
    fireEvent.click(boton);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});


