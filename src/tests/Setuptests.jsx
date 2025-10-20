import { vi } from "vitest";

const mockMensaje = [
  {
    fecha: "17/10/2025",
    nombre: "Cliente de prueba",
    correo: "cliente@test.com",
    orden: "ORD123",
    mensaje: "Mensaje de prueba para verificar renderizado.",
  },
];

// Mock global de fetch para todos los tests
vi.stubGlobal("fetch", vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockMensaje),
  })
));


