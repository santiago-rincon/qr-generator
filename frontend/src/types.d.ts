export interface QrForm {
  body_email: string;
  body_sms: string;
  cypher: string;
  email: string;
  ext: FormatsImage;
  password: string;
  phone_sms: string;
  phone: string;
  qrType: QrVariants;
  ssid: string;
  subject: string;
  text: string;
  url: string;
  size: number;
  foreground: `#${string}`;
  background: `#${string}`;
}

export type QrVariants =
  | "Texto"
  | "Url"
  | "WiFi"
  | "Teléfono"
  | "Email"
  | "Mensaje (SMS)";

export type FormatsImage = "png" | "jpeg" | "svg" | "webp";
