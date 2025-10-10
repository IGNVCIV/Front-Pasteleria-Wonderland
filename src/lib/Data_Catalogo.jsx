import { useState, useEffect } from "react";

export const CATALOGO_INICIAL = [
  { id: "TC001", nombre: "Torta Cuadrada de Chocolate", precio: 45000, categoria: "Tortas Cuadradas", ventas: 120, imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-chocolate.jpg" },
  { id: "TC002", nombre: "Torta Cuadrada de Frutas", precio: 50000, categoria: "Tortas Cuadradas", ventas: 80, imagen: "/assets/img/Catalogo/tortas-cuadradas/cuadrada-frutas.jpg" },
  { id: "TT001", nombre: "Torta Circular de Vainilla", precio: 40000, categoria: "Tortas Circulares", ventas: 450, imagen: "/assets/img/Catalogo/tortas-circulares/circular-vainilla.jpg" },
  { id: "TT002", nombre: "Torta Circular de Manjar", precio: 42000, categoria: "Tortas Circulares", ventas: 95, imagen: "/assets/img/Catalogo/tortas-circulares/circular-manjar.jpeg" },
  { id: "PI001", nombre: "Mousse de Chocolate", precio: 5000, categoria: "Postres Individuales", ventas: 180, imagen: "/assets/img/Catalogo/postres-individuales/mousse-chocolate.jpg" },
  { id: "PI002", nombre: "Tiramisú Clásico", precio: 5500, categoria: "Postres Individuales", ventas: 210, imagen: "/assets/img/Catalogo/postres-individuales/tiramisu.jpg" },
  { id: "PSA001", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, categoria: "Productos Sin Azúcar", ventas: 60, imagen: "/assets/img/Catalogo/sin-azúcar/torta-naranja.jpg" },
  { id: "PSA002", nombre: "Cheesecake Sin Azúcar", precio: 47000, categoria: "Productos Sin Azúcar", ventas: 85, imagen: "/assets/img/Catalogo/sin-azúcar/cheesecake.jpg" },
  { id: "PT001", nombre: "Empanada de Manzana", precio: 3000, categoria: "Pastelería Tradicional", ventas: 160, imagen: "/assets/img/Catalogo/tradicional/empanada-manzana.jpg" },
  { id: "PT002", nombre: "Tarta de Santiago", precio: 6000, categoria: "Pastelería Tradicional", ventas: 70, imagen: "/assets/img/Catalogo/tradicional/tarta-santiago.jpg" },
  { id: "PG001", nombre: "Brownie Sin Gluten", precio: 4000, categoria: "Productos Sin Gluten", ventas: 130, imagen: "/assets/img/Catalogo/sin-gluten/brownie.webp" },
  { id: "PG002", nombre: "Pan Sin Gluten", precio: 3500, categoria: "Productos Sin Gluten", ventas: 100, imagen: "/assets/img/Catalogo/sin-gluten/pan.webp" },
  { id: "PV001", nombre: "Torta Vegana de Chocolate", precio: 50000, categoria: "Productos Veganos", ventas: 300, imagen: "/assets/img/Catalogo/vegano/torta-chocolate.jpg" },
  { id: "PV002", nombre: "Galletas Veganas de Avena", precio: 4500, categoria: "Productos Veganos", ventas: 140, imagen: "/assets/img/Catalogo/vegano/galletas-avena.jpg" },
  { id: "TE001", nombre: "Torta Especial de Cumpleaños", precio: 55000, categoria: "Tortas Especiales", ventas: 200, imagen: "/assets/img/Catalogo/tortas-especiales/torta-cumpleanos.jpg" },
  { id: "TE002", nombre: "Torta Especial de Boda", precio: 60000, categoria: "Tortas Especiales", ventas: 110, imagen: "/assets/img/Catalogo/tortas-especiales/torta-boda.webp" },
];


export default function Catalogo() {
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    const guardado = localStorage.getItem("catalogoProductos");
    if (guardado) {
      setCatalogo(JSON.parse(guardado));
    } else {
      localStorage.setItem("catalogoProductos", JSON.stringify(CATALOGO_INICIAL));
      setCatalogo(CATALOGO_INICIAL);
    }
  }, []);

  useEffect(() => {
    if (catalogo.length > 0) {
      localStorage.setItem("catalogoProductos", JSON.stringify(catalogo));
    }
  }, [catalogo]);

  return { catalogo, setCatalogo };
}
