import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  message: string;
  handleChange: (e: any) => Promise<any[] | undefined>;
}
export const MessageWrapper = (props: Props) => {
  const { handleSubmit, message, handleChange } = props;
  return (
    <div className="chat--page__type__message__wrapper">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Message"
          id="standard-size-small"
          fullWidth
          size="small"
          value={message}
          autoFocus
          onChange={handleChange}
        />
      </form>
    </div>
  );
};
