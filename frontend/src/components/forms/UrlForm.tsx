import { ErrorSpan } from "@components/ErrorSpan";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { QrForm } from "@types";
import { UrlIcon } from "@icons/Url";

export const UrlForm = ({
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
          htmlFor="url"
        >
          Dirección web:
        </label>
        <div className="h-[42px] absolute bottom-0 start-0 flex items-center ps-3 pointer-events-none [&>*]:size-4 text-gray-500 dark:text-gray-400">
          <UrlIcon />
        </div>
        <input
          type="text"
          id="url"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="https://facebook.com"
          {...registry("url", {
            required: true,
            pattern:
              /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
          })}
        />
      </div>
      {errors.url?.type === "required" && (
        <ErrorSpan>El campo es requerido</ErrorSpan>
      )}
      {errors.url?.type === "pattern" && (
        <ErrorSpan>La dirección url no es válida</ErrorSpan>
      )}
    </div>
  );
};
