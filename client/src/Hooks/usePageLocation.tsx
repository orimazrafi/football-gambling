export const usePageLocation = (pathname: string) => {
  let pageLoaction = pathname.slice(1) ? pathname.slice(1) : "Home";
  return { pageLoaction };
};
