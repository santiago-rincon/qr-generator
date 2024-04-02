import { QrForm } from "@types";

export function generateText(data: QrForm): string {
  const {
    qrType,
    url,
    text,
    ssid,
    password,
    cypher,
    phone,
    email,
    body_email,
    subject,
    body_sms,
    phone_sms,
  } = data;
  if (qrType === "Url") {
    return url;
  }
  if (qrType === "Texto") {
    return text;
  }
  if (qrType === "WiFi") {
    return `WIFI:S:${ssid};T:${cypher};P:${password};;`;
  }
  if (qrType === "Teléfono") {
    return `tel:${phone}`;
  }
  if (qrType === "Email") {
    return `mailto:${email}?subject=${subject}&body=${body_email}`;
  }
  return `SMSTO:${phone_sms}:${body_sms}`;
}
