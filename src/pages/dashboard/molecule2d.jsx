import React from "react";

export function Molecule2D() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#f5f5f5" }}>
      <iframe
        src="/ketcher/index.html"
        title="Ketcher 2D Chemical Editor"
        style={{ width: "100%", height: "100vh", border: "2px solid #ccc", borderRadius: 8, background: "white" }}
        allowFullScreen
      />
    </div>
  );
}

export default Molecule2D;
