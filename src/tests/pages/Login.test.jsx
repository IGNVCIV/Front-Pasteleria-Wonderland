import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/Login";

describe("Componente Login", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renderiza correctamente el título del formulario", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText(/Inicio de Sesión/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CORREO/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CONTRASEÑA/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Acceder/i })).toBeInTheDocument();
  });

  it("muestra error al ingresar credenciales incorrectas", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/CORREO/i), { target: { value: "mal@correo.com" } });
    fireEvent.change(screen.getByLabelText(/CONTRASEÑA/i), { target: { value: "incorrecta" } });
    fireEvent.click(screen.getByRole("button", { name: /Acceder/i }));

    expect(screen.getByText("Usuario o contraseña incorrectos")).toBeInTheDocument();
  });

  it("guarda datos en localStorage al iniciar sesión correctamente", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/CORREO/i), { target: { value: "admin@wonderland.cl" } });
    fireEvent.change(screen.getByLabelText(/CONTRASEÑA/i), { target: { value: "clave123" } });
    fireEvent.click(screen.getByRole("button", { name: /Acceder/i }));

    expect(localStorage.getItem("usuarioActivo")).toBe("admin@wonderland.cl");
    expect(localStorage.getItem("rol")).toBe("admin");
  });

  it("renderiza correctamente los elementos clave del formulario", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/CORREO/i)).toBeEnabled();
    expect(screen.getByLabelText(/CONTRASEÑA/i)).toBeEnabled();
    expect(screen.getByRole("button", { name: /Acceder/i })).toBeEnabled();
  });
});
