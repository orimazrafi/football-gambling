export const UseFilter = (dataArray: any, name: string) => {
  return dataArray.filter((data: any) =>
    data.name.toLowerCase().trim().includes(name.toLocaleLowerCase().trim())
  );
};
