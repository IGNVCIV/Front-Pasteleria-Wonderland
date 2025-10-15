import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => cleanup());

vi.mock('../../lib/Data_Catalogo', () => {
  const MOCK_CATALOGO = [
    { id: "TC001", nombre: "Torta Cuadrada de Chocolate", precio: 45000, categoria: "Tortas Cuadradas", ventas: 120, imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-chocolate.jpg" },
    { id: "TC002", nombre: "Torta Cuadrada de Frutas",   precio: 50000, categoria: "Tortas Cuadradas", ventas: 80,  imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-frutas.jpg" },
    { id: "TT001", nombre: "Torta Circular de Vainilla",  precio: 40000, categoria: "Tortas Circulares", ventas: 450, imagen: "/assets/img/Catalogo/tortas-circulares/circular-vainilla.jpg" },
    { id: "TT002", nombre: "Torta Circular de Manjar",    precio: 42000, categoria: "Tortas Circulares", ventas: 95,  imagen: "/assets/img/Catalogo/tortas-circulares/circular-manjar.jpeg" },
    { id: "PI001", nombre: "Mousse de Chocolate",         precio: 5000,  categoria: "Postres Individuales", ventas: 180, imagen: "/assets/img/Catalogo/postres-individuales/mousse-chocolate.jpg" },
  ];
  const fn = () => ({ catalogo: MOCK_CATALOGO });
  return { default: fn, CATALOGO_INICIAL: MOCK_CATALOGO };
});

import Productos from '../../pages/Productos';

const renderProducto = () =>
  render(
    <MemoryRouter>
      <Productos />
    </MemoryRouter>
  );

describe('Productos.jsx', () => {
    beforeEach(() => vi.clearAllMocks());
})