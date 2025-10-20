import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/Login";

// === TESTS ===
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
  });

  it("muestra error al ingresar credenciales incorrectas", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const inputCorreo = screen.getByLabelText(/CORREO/i);
    const inputContrasena = screen.getByLabelText(/CONTRASEÑA/i);
    const botonAcceder = screen.getByRole("button", { name: /Acceder/i });

    fireEvent.change(inputCorreo, { target: { value: "mal@correo.com" } });
    fireEvent.change(inputContrasena, { target: { value: "incorrecta" } });
    fireEvent.click(botonAcceder);

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

  it("coincide con el snapshot actual", () => {
    const { container } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});


