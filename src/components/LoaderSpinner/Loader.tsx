import React from "react";
import { ClipLoader } from "react-spinners"; // Optional, only if using react-spinners

  const Loader: React.FC = () => {
  return (
    <div style={styles.loaderContainer}>
      {/* Spinner from react-spinners, customize size and color */}
      <ClipLoader size={50} color={"#123abc"} loading={true} />
      <p style={styles.loadingText}>Loading, please wait...</p>
    </div>
  );
};

// Use the correct flexDirection value for TypeScript
const styles: { [key: string]: React.CSSProperties } = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column", // Valid FlexDirection type in TypeScript
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  loadingText: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#333",
  },
};


export default Loader;