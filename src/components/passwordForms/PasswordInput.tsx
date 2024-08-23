import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";

interface PasswordInputProps {
  name: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  touched: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder,
  errors,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <Field
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        className={`form-control ${errors && touched ? "is-invalid" : ""}`}
        style={{ paddingRight: "2rem" }} // Add padding to the right for the eye icon
      />
      <ErrorMessage name={name} component="div" className="text-danger text-smaller" />
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
          position: "absolute",
          right: "0.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {showPassword ? "🙈" : "👁️"}
      </span>
    </div>
  );
};

export default PasswordInput;
