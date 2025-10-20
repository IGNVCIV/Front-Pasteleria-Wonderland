import React, { useEffect } from "react";

export default function AlertaSimple({ message, type = "info", onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className={`custom-alert ${type}`}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 2000,
        maxWidth: "300px",
      }}
      role="alert"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ flex: 1, marginRight: "10px" }}>{message}</span>
        <button
          onClick={() => setTimeout(onClose, 300)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            cursor: "pointer",
            lineHeight: "1",
          }}
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: 0,
          height: "3px",
          width: "100%",
          background:
            type === "success"
              ? "rgba(255,255,255,0.6)"
              : "rgba(0,0,0,0.3)",
          animation: "progressBar 2.5s linear forwards",
        }}
      />
      <style>
        {`
          @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
}
