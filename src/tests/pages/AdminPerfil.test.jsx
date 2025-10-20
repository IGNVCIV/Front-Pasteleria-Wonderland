import React, { useEffect } from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";


vi.mock("../../components/SidebarAdmin", () => ({
  default: ({ setTabActivo }) => {
    useEffect(() => {
      setTabActivo("perfil");
    }, []);
    return <aside data-testid="sidebar-admin">SidebarAdmin</aside>;
  },
}));


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


import Admin from "../../pages/Admin";

describe("Admin Component (perfil activo)", () => {
  it("muestra el perfil del administrador cuando tabActivo = 'perfil'", async () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("perfil-admin")).toBeInTheDocument();
    });
  });
});


