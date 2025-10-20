import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import HeaderAdmin from "../../components/HeaderAdmin";
import { describe, it, expect, vi } from "vitest";

describe("HeaderAdmin", () => {
  it("renderiza el título correctamente", () => {
    render(<HeaderAdmin toggleOffcanvas={() => {}} />);
    const heading = screen.getByText(/Pastelería Wonderland • Administración/i);
    expect(heading).toBeInTheDocument();
  });

  it("dispara toggleOffcanvas al hacer clic en el botón", () => {
    const mockToggle = vi.fn();
    render(<HeaderAdmin toggleOffcanvas={mockToggle} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});

