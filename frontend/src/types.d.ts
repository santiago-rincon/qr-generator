export interface QrType {
  label: QrVariants;
  selected?: boolean;
}

export interface QrForm {
  body_email: string;
  body_sms: string;
  cypher: string;
  email: string;
  ext: string;
  password: string;
  phone_sms: string;
  phone: string;
  qrType: QrVariants;
  ssid: string;
  subject: string;
  text: string;
  url: string;
}

type QrVariants =
  | "Texto"
  | "Url"
  | "WiFi"
  | "Teléfono"
  | "Email"
  | "Mensaje (SMS)";
