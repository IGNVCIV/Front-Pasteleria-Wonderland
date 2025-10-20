import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import AlertaSimple from "../../components/AlertaSimple";

afterEach(() => cleanup());

describe("AlertaSimple.jsx", () => {
    it("no renderiza nada si no hay mensaje", () => {
        const { container } = render(<AlertaSimple message="" />);
        expect(container.firstChild).toBeNull();
    });

    it("renderiza el mensaje y tipo correctamente", () => {
        render(<AlertaSimple message="Operación exitosa" type="success" onClose={() => {}} />);
        expect(screen.getByText("Operación exitosa")).toBeInTheDocument();

        const alertDiv = screen.getByRole("alert");
        expect(alertDiv).toHaveClass("custom-alert", "success");
    });

    it("llama a onClose automáticamente después de 2.5 segundos", () => {
        vi.useFakeTimers();
        const mockClose = vi.fn();

        render(<AlertaSimple message="Cerrando..." onClose={mockClose} />);
        act(() => {
        vi.advanceTimersByTime(2500);
        });

        expect(mockClose).toHaveBeenCalled();
        vi.useRealTimers();
    });

    it("llama a onClose al hacer clic en ✕", () => {
    vi.useFakeTimers();
    const mockClose = vi.fn();

    render(<AlertaSimple message="Error" onClose={mockClose} />);
    const closeButton = screen.getByRole("button", { name: /cerrar/i });

    fireEvent.click(closeButton);

    act(() => {
        vi.advanceTimersByTime(300);
    });

    expect(mockClose).toHaveBeenCalled();
    vi.useRealTimers();
    });
});
