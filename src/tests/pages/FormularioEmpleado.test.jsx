import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import FormularioEmpleado from "../../components/FormularioEmpleado";

describe("FormularioEmpleado Component", () => {
  const mockGuardar = vi.fn();
  const mockCancelar = vi.fn();

  it("renderiza el formulario de agregar correctamente", () => {
    render(
      <FormularioEmpleado
        empleadoEdit={null}
        handleGuardar={mockGuardar}
        cancelar={mockCancelar}
      />
    );

    expect(screen.getByText("Agregar Empleado")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "RUT" })).toBeEnabled();
    expect(screen.getByRole("textbox", { name: "DV" })).toBeEnabled();
    expect(screen.getByRole("textbox", { name: "Nombres" })).toBeEnabled();
  });

  it("renderiza el formulario de edición con campos bloqueados", () => {
    const empleado = {
      rut: "12345678",
      dv: "9",
      nombres: "Felipe",
      apellido1: "González",
      apellido2: "Pérez",
      correo: "felipe@example.com",
      telefono: "123456789",
      cargo: "Desarrollador",
      direccion: "Calle Falsa 123",
      fecha_nacimiento: "1990-01-01",
    };

    render(
      <FormularioEmpleado
        empleadoEdit={empleado}
        handleGuardar={mockGuardar}
        cancelar={mockCancelar}
      />
    );

    expect(screen.getByText("Editar Empleado")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "RUT" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "DV" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Nombres" })).toHaveValue("Felipe");
  });

  it("llama a handleGuardar al enviar el formulario", () => {
    render(
      <FormularioEmpleado
        empleadoEdit={null}
        handleGuardar={mockGuardar}
        cancelar={mockCancelar}
      />
    );

    fireEvent.change(screen.getByRole("textbox", { name: "RUT" }), { target: { value: "12345678" } });
    fireEvent.change(screen.getByRole("textbox", { name: "DV" }), { target: { value: "9" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Nombres" }), { target: { value: "Felipe" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Apellido 1" }), { target: { value: "González" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Apellido 2" }), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Correo" }), { target: { value: "felipe@example.com" } });

    fireEvent.click(screen.getByText("Guardar"));
    expect(mockGuardar).toHaveBeenCalled();
  });

  it("llama a cancelar al hacer clic en el botón Cancelar", () => {
    render(
      <FormularioEmpleado
        empleadoEdit={null}
        handleGuardar={mockGuardar}
        cancelar={mockCancelar}
      />
    );

    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockCancelar).toHaveBeenCalled();
  });
});
