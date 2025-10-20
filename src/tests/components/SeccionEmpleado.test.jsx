import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SeccionEmpleados from "../../components/SeccionEmpleados";


vi.mock("../../components/FormularioEmpleado", () => ({
  default: () => <div data-testid="formulario-empleado">FormularioEmpleado</div>,
}));

describe("SeccionEmpleados Component", () => {
  const empleadosMock = [
    {
      rut: "12345678",
      nombres: "Felipe",
      apellidos: "González Pérez",
      cargo: "Desarrollador",
      correo: "felipe@example.com",
    },
  ];

  it("muestra mensaje cuando no hay empleados", () => {
    render(<SeccionEmpleados empleados={[]} setEmpleados={vi.fn()} />);
    expect(screen.getByText("No hay empleados")).toBeInTheDocument();
  });

  it("renderiza la tabla con empleados", () => {
    render(<SeccionEmpleados empleados={empleadosMock} setEmpleados={vi.fn()} />);
    expect(screen.getByText("Felipe")).toBeInTheDocument();
    expect(screen.getByText("Desarrollador")).toBeInTheDocument();
  });

  it("muestra el formulario al hacer clic en 'Agregar'", () => {
    render(<SeccionEmpleados empleados={[]} setEmpleados={vi.fn()} />);
    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.getByTestId("formulario-empleado")).toBeInTheDocument();
  });

  it("muestra el formulario al hacer clic en 'Modificar' si hay empleado seleccionado", () => {
    render(<SeccionEmpleados empleados={empleadosMock} setEmpleados={vi.fn()} />);
    fireEvent.click(screen.getByText("Felipe")); 
    fireEvent.click(screen.getByText("Modificar")); 
    expect(screen.getByTestId("formulario-empleado")).toBeInTheDocument();
  });
});


