import { API_PATH } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATH.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // set header for file upload
        },
      }
    );

    return response.data; // Return response data
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow error for landing
  }
};

export default uploadImage;
