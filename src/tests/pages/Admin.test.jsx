import React, { useEffect } from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Admin from "../../pages/Admin";


vi.mock("../../components/HeaderAdmin", () => ({
  default: () => <header data-testid="header-admin">HeaderAdmin</header>,
}));
vi.mock("../../components/BandejaContacto", () => ({
  default: () => <section data-testid="bandeja-contacto">BandejaContacto</section>,
}));
vi.mock("../../components/ProductoForm", () => ({
  default: () => <form data-testid="producto-form">ProductoForm</form>,
}));
vi.mock("../../components/SeccionEmpleados", () => ({
  default: () => <section data-testid="seccion-empleados">SeccionEmpleados</section>,
}));
vi.mock("../../components/PerfilAdmin", () => ({
  default: () => <section data-testid="perfil-admin">PerfilAdmin</section>,
}));
vi.mock("../../components/TopProductos", () => ({
  default: () => <section data-testid="top-productos">TopProductos</section>,
}));


global.fetch = vi.fn((url) => {
  if (url.includes("mensajes.json")) {
    return Promise.resolve({
      json: () => Promise.resolve([{ id: 1, nombre: "Felipe", mensaje: "Hola" }]),
    });
  }
  if (url.includes("personal.json")) {
    return Promise.resolve({
      json: () => Promise.resolve([{ id: 1, nombre: "Empleado 1" }]),
    });
  }
  return Promise.reject(new Error("URL no reconocida"));
});


const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value.toString()),
    removeItem: (key) => delete store[key],
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// === TESTS GENERALES ===
describe("Admin Component", () => {
  // Sidebar neutral
  vi.mock("../../components/SidebarAdmin", () => ({
    default: ({ visible }) => (
      <aside data-testid="sidebar-admin">
        SidebarAdmin {visible ? "visible" : "oculto"}
      </aside>
    ),
  }));

  it("renderiza correctamente los componentes principales", async () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header-admin")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-admin")).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    expect(screen.getByTestId("bandeja-contacto")).toBeInTheDocument();
  });

  it("usa correctamente el almacenamiento local", () => {
    localStorage.setItem("catalogoProductos", JSON.stringify([{ id: 1, nombre: "Torta" }]));
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    expect(localStorage.getItem("catalogoProductos")).toContain("Torta");
  });

  it("coincide con el snapshot actual", () => {
    const { container } = render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});

