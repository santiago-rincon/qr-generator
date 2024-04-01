export interface QrType {
  label: QrVariants;
  selected?: boolean;
}

export interface QrForm {
  qrType: QrVariants;
  url: string;
  text: string;
  ssid: string;
  password: string;
  cypher: string;
  phone: string;
  email: string;
  subject: string;
  body_email: string;
  phone_sms: string;
  body_sms: string;
}

type QrVariants =
  | "Texto"
  | "Url"
  | "WiFi"
  | "Teléfono"
  | "Email"
  | "Mensaje (SMS)";
