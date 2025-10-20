import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";

describe("SidebarAdmin Component", () => {
  const mockHandlers = {
    toggleOffcanvas: vi.fn(),
    handleAgregarEmpleado: vi.fn(),
    handleEditarEmpleado: vi.fn(),
    handleAgregarProducto: vi.fn(),
    logout: vi.fn(),
    setTabActivo: vi.fn(),
    abrirPerfil: vi.fn(),
    empleadoSeleccionado: { id: 1, nombre: "Empleado 1" },
  };

  it("se renderiza correctamente con la visibilidad", () => {
    render(
      <MemoryRouter>
        <SidebarAdmin {...mockHandlers} visible={true} />
      </MemoryRouter>
    );

    const sidebar = screen.getByTestId("sidebar-admin");
    expect(sidebar).toHaveClass("show");
    expect(sidebar).toHaveStyle({ visibility: "visible" });
  });

  it("llama toggleOffcanvas al cerrar la barra", () => {
    render(
      <MemoryRouter>
        <SidebarAdmin {...mockHandlers} visible={true} />
      </MemoryRouter>
    );

    const closeBtn = screen.getByRole("button", { name: "Cerrar barra" });
    fireEvent.click(closeBtn);

    expect(mockHandlers.toggleOffcanvas).toHaveBeenCalled();
  });

  it("ejecuta correctamente los botones de productos", () => {
    render(
      <MemoryRouter>
        <SidebarAdmin {...mockHandlers} visible={true} />
      </MemoryRouter>
    );

    
    fireEvent.click(screen.getAllByText(/^Agregar$/i)[0]);
    expect(mockHandlers.handleAgregarProducto).toHaveBeenCalled();
    expect(mockHandlers.toggleOffcanvas).toHaveBeenCalled();


    fireEvent.click(screen.getAllByText(/^Modificar$/i)[0]);
    expect(mockHandlers.setTabActivo).toHaveBeenCalledWith("editarProducto");
    expect(mockHandlers.toggleOffcanvas).toHaveBeenCalled();
  });

  it("ejecuta correctamente los botones de empleados", () => {
    render(
      <MemoryRouter>
        <SidebarAdmin {...mockHandlers} visible={true} />
      </MemoryRouter>
    );

    
    fireEvent.click(screen.getAllByText(/^Agregar$/i)[1]);
    expect(mockHandlers.handleAgregarEmpleado).toHaveBeenCalled();
    expect(mockHandlers.setTabActivo).toHaveBeenCalledWith("empleados");

    fireEvent.click(screen.getAllByText(/^Modificar$/i)[1]);
    expect(mockHandlers.handleEditarEmpleado).toHaveBeenCalledWith(mockHandlers.empleadoSeleccionado);
    expect(mockHandlers.setTabActivo).toHaveBeenCalledWith("empleados");

 
    fireEvent.click(screen.getAllByText(/Mostrar/i)[1]);
    expect(mockHandlers.setTabActivo).toHaveBeenCalledWith("empleados");
  });

  it("abre perfil y cierra sesión correctamente", () => {
    render(
      <MemoryRouter>
        <SidebarAdmin {...mockHandlers} visible={true} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Perfil Administrador/i));
    expect(mockHandlers.abrirPerfil).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/Cerrar sesión/i));
    expect(mockHandlers.logout).toHaveBeenCalled();
  });

  it("coincide con el snapshot actual", () => {
    const { container } = render(
      <MemoryRouter>
        <SidebarAdmin {...mockHandlers} visible={true} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});


