function ContextMenu({ x, y, nodeId }) {
  if (!nodeId) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "#fff",
        border: "1px solid #ccc",
        padding: "8px 16px",
        zIndex: 1000,
        borderRadius: 4,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        color: "#222",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Hello World
    </div>
  );
}

export default ContextMenu;
