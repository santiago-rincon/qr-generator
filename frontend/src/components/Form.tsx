import "./Form.css";
import "react-toastify/dist/ReactToastify.css";
import { EmailForm } from "@components/forms/EmailForm";
import { ErrorSpan } from "@components/ErrorSpan";
import { generateText } from "@utils/generateText";
import { PhoneForm } from "@components/forms/PhoneForm";
import { Qr } from "@components/Qr";
import { QrForm } from "@types";
import { SmsForm } from "@components/forms/SmsForm";
import { Sppiner } from "@components/Sppiner";
import { TextForm } from "@components/forms/TextForm";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { types, formats, toastOptions } from "@const";
import { UrlForm } from "@components/forms/UrlForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { WifiForm } from "@components/forms/WifiForm";
import QRCode from "qrcode";

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QrForm>({
    defaultValues: {
      qrType: "Url",
      ext: "png",
      size: 500,
      foreground: "#000000",
      background: "#ffffff",
    },
  });
  const [loading, setLoading] = useState(false);
  const [base64Qr, setBase64Qr] = useState("");
  const qrType = watch("qrType");
  const onSubmit: SubmitHandler<QrForm> = async (data) => {
    setLoading(true);
    const text = generateText(data);
    const { ext, background, foreground, size } = data;
    try {
      if (ext === "svg") {
        const qr = await QRCode.toString(text, {
          type: "utf8",
          width: size,
          color: {
            dark: foreground,
            light: background,
          },
        });
        setBase64Qr(`data:image/svg+xml;base64,${btoa(qr)}`);
      } else {
        let type: "image/png" | "image/jpeg" | "image/webp" = "image/png";
        if (ext === "png") type = "image/png";
        if (ext === "jpeg") type = "image/jpeg";
        if (ext === "webp") type = "image/webp";
        const qr = await QRCode.toDataURL(text, {
          type: type,
          width: size,
          color: {
            dark: foreground,
            light: background,
          },
        });
        setBase64Qr(qr);
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message ===
          "The amount of data is too big to be stored in a QR Code"
      ) {
        toast.error(
          "La cantidad de datos es demasiado grande para almacenarla en un código QR",
          toastOptions
        );
      } else {
        toast.error("Ha ocurrido un error, inténtalo más tarde", toastOptions);
      }
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
          className="max-w-3xl mx-auto flex flex-col px-5 md:px-0 py-10 justify-evenly gap-y-3 w-full min-h-[76vh]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 gap-y-5 gap-x-8 md:grid-cols-2">
            <div className="flex flex-col gap-y-3">
              <strong className="self-start text-xl">
                Tipo de QR a generar
              </strong>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                {...register("qrType", {
                  required: true,
                })}
              >
                {types.map((type, index) => {
                  return (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-y-3">
              <strong className="self-start text-xl">
                Formato de la imágen
              </strong>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                {...register("ext", {
                  required: true,
                })}
              >
                {formats.map((format, index) => {
                  return (
                    <option key={index} value={format}>
                      {format.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-y-3">
              <strong className="self-start text-xl">
                Tamaño de la imágen
              </strong>
              <label className="flex items-center gap-x-2 font-semibold">
                <input
                  type="number"
                  placeholder="500"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  {...register("size", {
                    required: true,
                    min: 100,
                    max: 2000,
                  })}
                />
                px
              </label>
              {errors.size?.type === "required" && (
                <ErrorSpan className="-mt-3 ms-0">
                  Debes ingresar un tamaño
                </ErrorSpan>
              )}
              {errors.size?.type === "min" && (
                <ErrorSpan className="-mt-3 ms-0">
                  El tamaño debe ser superior a 100px
                </ErrorSpan>
              )}
              {errors.size?.type === "max" && (
                <ErrorSpan className="-mt-3 ms-0">
                  El tamaño debe ser inferior a 2000px
                </ErrorSpan>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-5 [&>label]:text-start [&>label]:font-bold [&>label]:flex [&>label]:flex-col [&>label]:justify-between [&>label]:text-xl [&>label]:gap-y-3 md:[&>label]:gap-y-0">
              <label>
                Color de fondo
                <input
                  type="color"
                  className="bg-gray-50 h-10 px-2 py-1 dark:bg-gray-700 w-full border border-gray-300 dark:border-gray-600 rounded-lg"
                  {...register("background", {
                    required: true,
                  })}
                />
              </label>
              <label>
                Color del Qr
                <input
                  type="color"
                  className="bg-gray-50 h-10 px-2 py-1 dark:bg-gray-700 w-full border border-gray-300 dark:border-gray-600 rounded-lg"
                  {...register("foreground", {
                    required: true,
                  })}
                />
              </label>
            </div>
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
        <Qr src={base64Qr} setSrc={setBase64Qr} ext={watch("ext")} />
      )}
    </>
  );
};
