import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Carro from '../../pages/Carro';

afterEach(() => cleanup());

const producto = {
  id: "PI001", 
  nombre: "Mousse de Chocolate",         
  precio: 5000,  
  categoria: "Postres Individuales", 
  ventas: 180, 
  imagen: "/assets/img/Catalogo/postres-individuales/mousse-chocolate.jpg"
}

const renderCarro = () =>
  render(
    <MemoryRouter>
      <Carro />
    </MemoryRouter>
);