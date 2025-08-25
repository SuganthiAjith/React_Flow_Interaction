import React from "react";
import blocks from "../data/blocks.json";
import "./BlockPanel.css";
function BlockPanel() {
  return (
    <div
      style={{
        width: "180px",
        padding: "10px",
        backgroundColor: " #f5f5f5",
        borderLeft: "1px solid #ccc",
      }}
    >
      <h3>Block Panel</h3>
      {blocks.map((block) => (
        <div
          key={block.id}
          className={`block ${block.type}`}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("blockType", block.type)}
        >
          {block.label}
        </div>
      ))}
    </div>
  );
}
export default BlockPanel;
