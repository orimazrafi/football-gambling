import React from "react";
interface Props1 {
  loadingData: boolean;
  typingData: any;
}
export const IsTypingWrapper = (props: Props1) => {
  const { loadingData, typingData } = props;
  return (
    <>
      {!loadingData && typingData?.userTyping?.isTyping && (
        <div>{typingData?.userTyping?.name} is typing...</div>
      )}
    </>
  );
};
