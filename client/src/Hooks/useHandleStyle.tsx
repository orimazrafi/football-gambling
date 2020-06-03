export const useHandleStyle = (data: any) => {
  const borderStylingBasedOnTheIndex = (index: number) => {
    const FIRST_INDEX = 0;
    const lastIndex = (length: number) => length - 1;
    let className = "0";
    if (index === FIRST_INDEX) className = "10px 10px 0 0";
    if (data?.group?.users && index === lastIndex(data.group.users.length))
      className = "0 0 10px 10px";
    if (
      index === FIRST_INDEX &&
      data?.group?.users &&
      index === lastIndex(data.group.users.length)
    )
      className = "10px";
    return className;
  };
  return { borderStylingBasedOnTheIndex };
};
