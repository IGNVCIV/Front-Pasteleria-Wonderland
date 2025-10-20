import React from "react"; 
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("bootstrap", () => ({
  Carousel: vi.fn(),
}));

vi.mock("../../style/style.css", () => ({}), { virtual: true });

vi.stubGlobal("alert", vi.fn());

import PerfilAdmin from "../../components/PerfilAdmin";

describe("PerfilAdmin Component", () => {
  it("se renderiza correctamente con los datos iniciales", () => {
    render(
      <MemoryRouter>
        <PerfilAdmin />
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue("Taylor Swift")).toBeInTheDocument();
    expect(screen.getByDisplayValue("admin@wonderland.cl")).toBeInTheDocument();
    expect(screen.getByDisplayValue("+56998765432")).toBeInTheDocument();
  });

  it("activa el modo edición al presionar 'Editar Perfil'", () => {
    render(
      <MemoryRouter>
        <PerfilAdmin />
      </MemoryRouter>
    );

    const botonEditar = screen.getByRole("button", { name: /editar perfil/i });
    fireEvent.click(botonEditar);

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach(input => expect(input).not.toBeDisabled());
  });

  it("guarda los cambios y muestra alerta al presionar 'Guardar'", () => {
    render(
      <MemoryRouter>
        <PerfilAdmin />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /editar perfil/i }));

    const nombreInput = screen.getByDisplayValue("Taylor Swift");
    fireEvent.change(nombreInput, { target: { value: "Taylor Alison Swift" } });

    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));

    expect(window.alert).toHaveBeenCalledWith("Perfil actualizado correctamente ✅");
    expect(nombreInput.value).toBe("Taylor Alison Swift");
  });

  it("desactiva edición al presionar 'Cancelar'", () => {
    render(
      <MemoryRouter>
        <PerfilAdmin />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /editar perfil/i }));

    const nombreInput = screen.getByDisplayValue("Taylor Swift");
    fireEvent.change(nombreInput, { target: { value: "Nombre Nuevo" } });

    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(nombreInput).toBeDisabled();
    expect(nombreInput.value).toBe("Nombre Nuevo");
  });
});
