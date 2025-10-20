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
vi.mock("../../components/PerfilAdmin", () => ({
  default: () => <section data-testid="perfil-admin">PerfilAdmin</section>,
}));

import Admin from "../../pages/Admin";

describe("Admin Component (perfil activo)", () => {
  it("renderiza correctamente los componentes esperados", async () => {
    render(
      <MemoryRouter>
        <Admin />
      </MemoryRouter>
    );

    expect(screen.getByTestId("header-admin")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-admin")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("perfil-admin")).toBeInTheDocument();
    });
  });
});
