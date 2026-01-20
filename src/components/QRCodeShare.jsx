
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeShare() {
  return (
    <div style={{ marginTop: "30px", textAlign: "center" }}>
      <h3>📱 Scan & Share</h3>
      <QRCodeCanvas
        value={window.location.href}
        size={180}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />
      <p style={{ fontSize: "14px", marginTop: "10px" }}>
        Scan to open this birthday surprise ❤️
      </p>
    </div>
  );
}
