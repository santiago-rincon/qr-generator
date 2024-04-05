import { FormatsImage, QrVariants } from "@types";
import { Bounce, ToastOptions } from "react-toastify";

export const types: QrVariants[] = [
  "Url",
  "Texto",
  "WiFi",
  "Teléfono",
  "Email",
  "Mensaje (SMS)",
];

export const formats: FormatsImage[] = ["png", "jpeg", "svg", "webp"];

export const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};
