import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// Mock de Bootstrap (evita que intente manipular el DOM real)
vi.mock("bootstrap", () => ({
  Carousel: vi.fn(),
}));

// Mock del CSS (para que no lo intente procesar)
vi.mock("../../style/style.css", () => ({}), { virtual: true });

// Mock de componentes secundarios (Navbar, Footer, NoticiaHome)
vi.mock("../../components/Navbar", () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));
vi.mock("../../components/Footer.jsx", () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));
vi.mock("../../components/NoticiaHome.jsx", () => ({
  default: () => <section data-testid="noticia-home">Noticia Home</section>,
}));

// Mock del catálogo (datos controlados)
vi.mock("../../lib/Data_Catalogo", () => ({
  default: () => ({
    catalogo: [
      { id: "TC001", nombre: "Torta Cuadrada de Chocolate", precio: 45000, categoria: "Tortas Cuadradas", ventas: 120, imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-chocolate.jpg" },
      { id: "TC002", nombre: "Torta Cuadrada de Frutas", precio: 50000, categoria: "Tortas Cuadradas", ventas: 80, imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-frutas.jpg" },
      { id: "TT001", nombre: "Torta Circular de Vainilla", precio: 40000, categoria: "Tortas Circulares", ventas: 450, imagen: "/assets/img/Catalogo/tortas-circulares/circular-vainilla.jpg" },
      { id: "TT002", nombre: "Torta Circular de Manjar", precio: 42000, categoria: "Tortas Circulares", ventas: 95, imagen: "/assets/img/Catalogo/tortas-circulares/circular-manjar.jpeg" },
      { id: "PI001", nombre: "Mousse de Chocolate", precio: 5000, categoria: "Postres Individuales", ventas: 180, imagen: "/assets/img/Catalogo/postres-individuales/mousse-chocolate.jpg" },
    ],
  }),
  CATALOGO_INICIAL: [],
}));

// ✅ Import correcto del componente Home
import Home from "../../pages/Home";

// === TESTS ===
describe("Home Component", () => {
  it("renderiza correctamente el título principal", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText("Productos de la semana")).toBeInTheDocument();
  });

  it("muestra los productos del catálogo mockeado", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText("Torta Cuadrada de Chocolate")).toBeInTheDocument();
    expect(screen.getByText("Torta Cuadrada de Frutas")).toBeInTheDocument();
  });

  it("muestra el enlace del banner al catálogo de productos", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /revisa nuestra carta/i });
    expect(link).toHaveAttribute("href", "/productos");
  });

  it("muestra los botones 'Ver producto' para los productos", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const botones = await screen.findAllByText("Ver producto");
    expect(botones.length).toBeGreaterThan(0);
  });

  it("renderiza los componentes secundarios (Navbar, Footer, NoticiaHome)", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
    expect(screen.getByTestId("noticia-home")).toBeInTheDocument();
  });

  it("coincide con el snapshot actual", () => {
    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
