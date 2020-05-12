import { useState, useEffect } from "react";
const NUMBER_OF_ERROR_THAT_OK = 3;

export const useSetUserPasswordAndNumberOfWrongPasswords = (
  resetModal: any
) => {
  const [error, setError] = useState({ message: "", num: 0 });
  const [password, setPassword] = useState("");
  useEffect(() => {
    setError({ message: "", num: 0 });
    setPassword("");
  }, [resetModal]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleError = () => {
    if (!error.message) return "";
    if (error.message && error.num < NUMBER_OF_ERROR_THAT_OK)
      return "Incorrect password.";
    return `your account would be blocked if you will continue to supply false password!`;
  };
  return { handleChange, handleError, password, resetModal, error, setError };
};
