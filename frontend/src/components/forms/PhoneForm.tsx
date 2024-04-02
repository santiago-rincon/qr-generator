import { QrForm } from "@types";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { PhoneIcon } from "@icons/Phone";
import { ErrorSpan } from "@components/ErrorSpan";

export const PhoneForm = ({
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
          htmlFor="phone"
        >
          Teléfono:{" "}
          <span className="opacity-90">
            (sin espacios ni caracteres especiales)
          </span>
        </label>
        <div className="h-[42px] absolute bottom-0 start-0 flex items-center ps-3 pointer-events-none [&>*]:size-4 text-gray-500 dark:text-gray-400">
          <PhoneIcon />
        </div>
        <input
          type="tel"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="+573216548574"
          {...registry("phone", {
            required: true,
            pattern: /^\+?\d+$/,
          })}
        />
      </div>
      {errors.phone?.type === "required" && (
        <ErrorSpan>El campo es requerido</ErrorSpan>
      )}
      {errors.phone?.type === "pattern" && (
        <ErrorSpan>El valor ingresado no es un número válido ()</ErrorSpan>
      )}
    </div>
  );
};
