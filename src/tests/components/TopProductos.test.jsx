import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import TopProductos from "../../components/TopProductos";

describe("TopProductos Component", () => {
  const catalogoMock = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    nombre: `Producto ${i + 1}`,
    imagen: `https://example.com/prod${i + 1}.jpg`,
  }));

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("muestra mensaje cuando no hay productos", () => {
    render(<TopProductos />);
    expect(screen.getByText(/No hay productos disponibles/i)).toBeInTheDocument();
  });

  it("renderiza correctamente los productos del localStorage", () => {
    localStorage.setItem("catalogoProductos", JSON.stringify(catalogoMock));
    render(<TopProductos />);

    for (let i = 0; i < 10; i++) {
      expect(screen.getByText(`Producto ${i + 1}`)).toBeInTheDocument();
      expect(screen.getByText(`#${i + 1}`)).toBeInTheDocument();
    }

    expect(screen.queryByText("Producto 11")).not.toBeInTheDocument();
    expect(screen.queryByText("Producto 12")).not.toBeInTheDocument();
  });
});
