import React from "react";

function Header() {
  return (
    <div
      className="d-flex align-items-center justify-content-between px-4 py-3"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Left: Logo */}
      <img
        src="/logo.png"
        alt="Sanjeevani Drops Logo"
        style={{ height: "80px" }}
      />

      {/* Center: Brand name + tagline */}
      <div className="text-center flex-grow-1">
        <h1 style={{ fontWeight: "bold", fontSize: "32px" }}>
          <span style={{ color: "green" }}>SANJEEVANI</span>{" "}
          <span style={{ color: "red" }}>DROPS</span>
        </h1>
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          Blood, Life, Healing and Donations
        </p>
      </div>

      {/* Right: (Optional) Empty for balance */}
      <div style={{ width: "70px" }}></div>
    </div>
  );
}

export default Header;
