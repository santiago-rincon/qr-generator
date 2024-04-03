import "react-toastify/dist/ReactToastify.css";
import "./Form.css";
import { EmailForm } from "@components/forms/EmailForm";
import { generateText } from "@utils/generateText";
import { PhoneForm } from "@components/forms/PhoneForm";
import { Qr } from "@components/Qr";
import { QrForm, QrType } from "@types";
import { SmsForm } from "@components/forms/SmsForm";
import { Sppiner } from "@components/Sppiner";
import { TextForm } from "@components/forms/TextForm";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { UrlForm } from "@components/forms/UrlForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { WifiForm } from "@components/forms/WifiForm";

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QrForm>({
    defaultValues: { qrType: "Url", ext: ".png" },
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
  const [loading, setLoading] = useState(false);
  const [base64Qr, setBase64Qr] = useState("");
  const qrType = watch("qrType");
  const onSubmit: SubmitHandler<QrForm> = async (data) => {
    const text = generateText(data);
    const ext = data.ext;
    const mimeType = data.ext === ".png" ? "image/png" : "image/svg+xml";
    try {
      setLoading(true);
      const res = await fetch(import.meta.env.VITE_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          ext,
        }),
      });
      if (!res.ok) {
        throw new Error("Error al generar el QR");
      }
      const { base64 } = await res.json();
      setBase64Qr(`data:${mimeType};base64,${base64}`);
    } catch (error) {
      console.log(error);
      toast.error("Ha ocurrido un error, inténtalo más tarde", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {loading ? (
        <Sppiner />
      ) : base64Qr.length === 0 ? (
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
          <strong className="self-start text-xl">Formato de la imagen</strong>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <label className="flex items-center gap-x-2 font-semibold text-lg">
              <input
                type="radio"
                value=".png"
                className="size-4 accent-neutral-500 dark:accent-neutral-600"
                {...register("ext")}
              />
              PNG
            </label>
            <label className="flex items-center gap-x-2 font-semibold text-lg">
              <input
                type="radio"
                value=".svg"
                className="size-4 accent-neutral-500 dark:accent-neutral-600"
                {...register("ext")}
              />
              SVG
            </label>
          </div>
          {qrType === "Url" && <UrlForm registry={register} errors={errors} />}
          {qrType === "Texto" && (
            <TextForm registry={register} errors={errors} />
          )}
          {qrType === "WiFi" && (
            <WifiForm registry={register} errors={errors} watch={watch} />
          )}
          {qrType === "Teléfono" && (
            <PhoneForm registry={register} errors={errors} />
          )}
          {qrType === "Email" && (
            <EmailForm registry={register} errors={errors} />
          )}
          {qrType === "Mensaje (SMS)" && (
            <SmsForm registry={register} errors={errors} />
          )}
          <button className="btn self-center">Generar código QR</button>
        </form>
      ) : (
        <Qr src={base64Qr} setSrc={setBase64Qr} />
      )}
    </>
  );
};
