import React from "react";
/* const variant = "primary" | "secondary" | "outline"; */
export const Button = ({ children, variant }) => {
  const style = {
    width: "100%",
    maxWidth: "180px",
    height: "48px",
    backgroundColor: "#00c89c",
    border: "1px solid #00c89c",
    Color: "#001718",
    borderRadius: "10px",
    fontSize: "20px",
    cursor: "pointer",
  };
  return <button style={style}>{children}</button>;
};
