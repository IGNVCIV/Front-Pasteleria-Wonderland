import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductoForm from "../../components/ProductoForm";

describe("ProductoForm Component", () => {
  const mockHandlers = {
    handleGuardarProducto: vi.fn((e) => e.preventDefault()),
    setFormVisibleProducto: vi.fn(),
  };

  const productoMock = {
    nombre: "Torta Chocolate",
    precio: 12000,
    categoria: "Tortas Cuadradas",
    imagen: "https://example.com/torta.jpg",
  };

  it("se renderiza correctamente en modo agregar", () => {
    render(<ProductoForm {...mockHandlers} productoEdit={null} />);

    expect(screen.getByText(/Agregar Producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre").value).toBe("");
    expect(screen.getByLabelText("Precio").value).toBe("");
    expect(screen.getByLabelText("Categoría").value).toBe("Tortas Cuadradas");
  });

  it("se renderiza correctamente en modo editar", () => {
    render(<ProductoForm {...mockHandlers} productoEdit={productoMock} />);

    expect(screen.getByText(/Editar Producto/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre").value).toBe(productoMock.nombre);
    expect(screen.getByLabelText("Precio").value).toBe(String(productoMock.precio));
    expect(screen.getByLabelText("Categoría").value).toBe(productoMock.categoria);
    expect(screen.getByLabelText("Imagen (URL)").value).toBe(productoMock.imagen);
  });

  it("llama setFormVisibleProducto al presionar Cancelar", () => {
    render(<ProductoForm {...mockHandlers} productoEdit={null} />);
    fireEvent.click(screen.getByTestId("btn-cancelar"));
    expect(mockHandlers.setFormVisibleProducto).toHaveBeenCalledWith(false);
  });

  it("llama handleGuardarProducto al enviar el formulario", () => {
    render(<ProductoForm {...mockHandlers} productoEdit={null} />);
    fireEvent.submit(screen.getByTestId("form-producto"));
    expect(mockHandlers.handleGuardarProducto).toHaveBeenCalled();
  });

  it("permite editar nombre, precio y categoría", () => {
    render(<ProductoForm {...mockHandlers} productoEdit={null} />);

    const nombreInput = screen.getByLabelText("Nombre");
    fireEvent.change(nombreInput, { target: { value: "Nueva Torta" } });
    expect(nombreInput.value).toBe("Nueva Torta");

    const precioInput = screen.getByLabelText("Precio");
    fireEvent.change(precioInput, { target: { value: "15000" } });
    expect(precioInput.value).toBe("15000");

    const categoriaSelect = screen.getByLabelText("Categoría");
    fireEvent.change(categoriaSelect, { target: { value: "Postres Individuales" } });
    expect(categoriaSelect.value).toBe("Postres Individuales");
  });

  it("permite seleccionar un archivo de imagen", () => {
    render(<ProductoForm {...mockHandlers} />);
    const fileInput = screen.getByLabelText("Imagen (Archivo)");
    const file = new File(["dummy content"], "torta.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput.files[0]).toBe(file);
  });

  it("coincide con el snapshot", () => {
    const { container } = render(<ProductoForm {...mockHandlers} productoEdit={productoMock} />);
    expect(container).toMatchSnapshot();
  });
});
