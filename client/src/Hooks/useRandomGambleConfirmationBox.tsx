import { confirmAlert } from "react-confirm-alert";

export const useRandomGambleConfirmationBox = (addRandom: any) => {
  const handleRandomGamble = (index: number) => {
    confirmAlert({
      title: `Add random Gamble`,
      message: "Are you sure to do this?",

      buttons: [
        {
          label: "Yes",
          onClick: () => {
            addRandom(index);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return handleRandomGamble;
};
