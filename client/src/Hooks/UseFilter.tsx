import { Group } from "../interfaces";

export const UseFilter = (dataArray: Group[], name: string) => {
  return dataArray.filter((data: Group) =>
    data.name.toLowerCase().trim().includes(name.toLocaleLowerCase().trim())
  );
};
