
import * as Yup from "yup";
export const validationSchema = Yup.object({
    serviceName: Yup.string().required("Service name is required"),
    price: Yup.number().required("Price is required").min(1, "Price must be at least 1 INR"),
    duration: Yup.number().required("Duration is required").min(1, "Duration must be at least 1 minute"),
  });