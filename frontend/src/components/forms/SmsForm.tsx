import { QrForm } from "@types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { SmsIcon } from "@icons/Sms";
import { ErrorSpan } from "@components/ErrorSpan";

export const SmsForm = ({
  registry,
  errors,
}: {
  registry: UseFormRegister<QrForm>;
  errors: FieldErrors<QrForm>;
}) => {
  return (
    <div className="relative w-full">
      <div className="relative first:m-0 mt-3">
        <label
          className="block text-start ms-2 py-1 font-semibold"
          htmlFor="phone_sms"
        >
          Teléfono:{" "}
          <span className="opacity-90">
            (sin espacios ni caracteres especiales)
          </span>
        </label>
        <div className="h-[42px] absolute bottom-0 start-0 flex items-center ps-3 pointer-events-none [&>*]:size-4 text-gray-500 dark:text-gray-400">
          <SmsIcon />
        </div>
        <input
          type="tel"
          id="phone_sms"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="+573216548596"
          {...registry("phone_sms", {
            required: true,
            pattern: /^\+?\d+$/,
          })}
        />
      </div>
      {errors.phone_sms?.type === "required" && (
        <ErrorSpan>El campo es requerido</ErrorSpan>
      )}
      {errors.phone_sms?.type === "pattern" && (
        <ErrorSpan>El valor ingresado no es un número válido</ErrorSpan>
      )}
      <div>
        <label
          className="block text-start ms-2 py-1 font-semibold mt-3"
          htmlFor="body_email"
        >
          Cuerpo del mensaje:
        </label>
        <textarea
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam omnis, reiciendis veritatis veniam architecto maiores perspiciatis? Deleniti, illum ex. Reprehenderit."
          id="body_email"
          {...registry("body_sms", { required: true })}
          className="text-area bg-gray-50 border max-h-36 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        ></textarea>
      </div>
      {errors.body_sms?.type === "required" && (
        <ErrorSpan>El cuerpo del mensaje no puede estar vacío</ErrorSpan>
      )}
    </div>
  );
};
