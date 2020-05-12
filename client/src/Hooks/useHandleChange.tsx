import { useState } from "react";

export const useHandleChange = () => {
  const [name, setName] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  return { name, handleChange };
};
