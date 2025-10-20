import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => cleanup());

import DetalleProducto from '../../pages/DetalleProducto';

const renderDetalleProducto = () =>
  render(
    <MemoryRouter>
      <DetalleProducto />
    </MemoryRouter>
);

describe('DetalleProducto.jsx', () => {
  beforeEach(() => vi.clearAllMocks());

  
})