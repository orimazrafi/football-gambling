import React, { useState } from "react";
import { Input } from "../../elements/Input";

export const Groups = () => {
  const [name, setName] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  return (
    <div>
      Groups
      <Input
        name="name"
        type="text"
        placeholder="Search Group..."
        value={name}
        onChange={handleChange}
      />
    </div>
  );
};
