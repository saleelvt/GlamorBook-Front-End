
import axios from "axios";

const ImageUpload = async (image: File) => {
  const preset_key = "ml_default"; // Use the default preset key
  const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;

  // Check if environment variables are defined
  if (!cloud_name) {
    console.error("Cloudinary cloud name is missing");
    return null;
  }

  
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", preset_key);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );

    const { format, secure_url } = res.data;

    // console.log(secure_url, "image url");

    if (["png", "jpeg", "jpg"].includes(format)) {
      return secure_url;
    } else {
      console.error("Unsupported file format:", format);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error uploading image:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export default ImageUpload;
