import React from "react";
import { useDropzone } from "react-dropzone";
import { cloudinaryFetchUrl } from "../../helpers";
import { DropImage } from "../../elements/DropImage";

export const DropzoneImage = ({
  onDrop,
  image,
}: {
  onDrop: (acceptedFiles: File[]) => Promise<void>;
  image: string;
}) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ display: "flex", cursor: "pointer" }} {...getRootProps()}>
      <input {...getInputProps()} />
      {image && (
        <DropImage src={`${cloudinaryFetchUrl}/${image}`} alt="profile" />
      )}
    </div>
  );
};
