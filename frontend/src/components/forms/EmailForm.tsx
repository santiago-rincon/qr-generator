import { ErrorSpan } from "@components/ErrorSpan";
import "./TextArea.css";
import { EmailIcon } from "@icons/Email";
import { UserIcon } from "@icons/User";
import { QrForm } from "@types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export const EmailForm = ({
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
          htmlFor="email"
        >
          Correo electrónico:
        </label>
        <div className="h-[42px] absolute bottom-0 start-0 flex items-center ps-3 pointer-events-none [&>*]:size-4 text-gray-500 dark:text-gray-400">
          <UserIcon />
        </div>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="ejemplo@gmail.com"
          {...registry("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
      </div>
      {errors.email?.type === "required" && (
        <ErrorSpan>El campo es requerido</ErrorSpan>
      )}
      {errors.email?.type === "pattern" && (
        <ErrorSpan>El correo no es válido</ErrorSpan>
      )}
      <div className="relative first:m-0 mt-3">
        <label
          className="block text-start ms-2 py-1 font-semibold"
          htmlFor="subject"
        >
          Asunto: <span className="opacity-90">(opcional)</span>
        </label>
        <div className="h-[42px] absolute bottom-0 start-0 flex items-center ps-3 pointer-events-none [&>*]:size-4 text-gray-500 dark:text-gray-400">
          <EmailIcon />
        </div>
        <input
          type="text"
          id="subject"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Asunto: Algún caso"
          {...registry("subject")}
        />
      </div>

      <div>
        <label
          className="block text-start ms-2 py-1 font-semibold mt-3"
          htmlFor="body_email"
        >
          Cuerpo del correo: <span className="opacity-90">(opcional)</span>
        </label>
        <textarea
          {...registry("body_email")}
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam omnis, reiciendis veritatis veniam architecto maiores perspiciatis? Deleniti, illum ex. Reprehenderit."
          id="body_email"
          className="text-area bg-gray-50 border max-h-36 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        ></textarea>
      </div>
    </div>
  );
};
