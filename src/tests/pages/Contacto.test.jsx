import '@testing-library/jest-dom/vitest';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contacto from '../../pages/Contacto';

afterEach(() => cleanup());

const renderContacto = () =>
  render(
    <MemoryRouter>
      <Contacto />
    </MemoryRouter>
);