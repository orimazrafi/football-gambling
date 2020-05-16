import { cloudinaryUrl } from "../helpers";

export const UseCloudinaryUpload = async (formData: FormData) => {
  const rawResponse = await fetch(cloudinaryUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const content = await rawResponse.json();
  return content;
};
