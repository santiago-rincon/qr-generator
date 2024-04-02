import "./Form.css";
import { EmailForm } from "@components/forms/EmailForm";
import { generateText } from "@utils/generateText";
import { PhoneForm } from "@components/forms/PhoneForm";
import { QrForm, QrType } from "@types";
import { SmsForm } from "@components/forms/SmsForm";
import { TextForm } from "@components/forms/TextForm";
import { UrlForm } from "@components/forms/UrlForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { WifiForm } from "@components/forms/WifiForm";

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QrForm>({
    defaultValues: { qrType: "Url" },
  });
  const types: QrType[] = [
    {
      label: "Url",
    },
    {
      label: "Texto",
    },
    {
      label: "WiFi",
    },
    {
      label: "Teléfono",
    },
    {
      label: "Email",
    },
    {
      label: "Mensaje (SMS)",
    },
  ];
  const qrType = watch("qrType");
  const onSubmit: SubmitHandler<QrForm> = (data) => {
    console.log(generateText(data));
  };
  return (
    <form
      className="max-w-3xl mx-auto flex flex-col px-4 md:px-0 py-10 justify-evenly gap-y-3 w-full min-h-[76vh]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <strong className="self-start text-xl">Tipo de QR a generar</strong>
      <div className="flex justify-start min-[600px]:justify-between flex-wrap gap-x-6 gap-y-3">
        {types.map((type, index) => (
          <label
            className="flex items-center gap-x-2 font-semibold text-lg"
            key={index}
          >
            <input
              type="radio"
              value={type.label}
              className="size-4 accent-neutral-500 dark:accent-neutral-600"
              {...register("qrType")}
            />
            {type.label}
          </label>
        ))}
      </div>
      {qrType === "Url" && <UrlForm registry={register} errors={errors} />}
      {qrType === "Texto" && <TextForm registry={register} errors={errors} />}
      {qrType === "WiFi" && (
        <WifiForm registry={register} errors={errors} watch={watch} />
      )}
      {qrType === "Teléfono" && (
        <PhoneForm registry={register} errors={errors} />
      )}
      {qrType === "Email" && <EmailForm registry={register} errors={errors} />}
      {qrType === "Mensaje (SMS)" && (
        <SmsForm registry={register} errors={errors} />
      )}
      <button className="btn self-center">Generar código QR</button>
    </form>
  );
};
