import { QrForm } from "@types";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { WifiIcon } from "@icons/Wifi";
import { LockIcon } from "@icons/Lock";
import { ErrorSpan } from "@components/ErrorSpan";

export const WifiForm = ({
  registry,
  errors,
  watch,
}: {
  registry: UseFormRegister<QrForm>;
  errors: FieldErrors<QrForm>;
  watch: UseFormWatch<QrForm>;
}) => {
  return (
    <div className="relative w-full">
      <div className="relative first:m-0 mt-3">
        <label
          className="block text-start ms-2 py-1 font-semibold"
          htmlFor="ssid"
        >
          Ssid:
        </label>
        <div className="h-[42px] absolute bottom-0 start-0 flex items-center ps-3 pointer-events-none [&>*]:size-4 text-gray-500 dark:text-gray-400">
          <WifiIcon />
        </div>
        <input
          type="text"
          id="ssid"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Wifi casa"
          {...registry("ssid", { required: true })}
        />
      </div>
      {errors.ssid?.type === "required" && (
        <ErrorSpan>El campo es requerido</ErrorSpan>
      )}
      {watch("ssid")?.includes(" ") && (
        <ErrorSpan className="text-yellow-400">
          Los ssid con "espacios" pueden no funcionar correctamente
        </ErrorSpan>
      )}
      <div className="relative first:m-0 mt-3">
        <label
          className="block text-start ms-2 py-1 font-semibold"
          htmlFor="password"
        >
          Contraseña:
        </label>
        <div className="h-[42px] absolute bottom-0 start-0 flex items-center ps-3 pointer-events-none [&>*]:size-4 text-gray-500 dark:text-gray-400">
          <LockIcon />
        </div>
        <input
          type="text"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Contraseña123"
          {...registry("password", { required: true })}
        />
      </div>
      {errors.password?.type === "required" && (
        <ErrorSpan>El campo es requerido</ErrorSpan>
      )}
      <div className="relative first:m-0 mt-3">
        <label
          htmlFor="cyphers"
          className="block text-start ms-2 py-1 font-semibold"
        >
          Selecciona un cifrado
        </label>
        <select
          id="cyphers"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          {...registry("cypher", {
            required: true,
            pattern: /\b(WEP|WPA|nopass)/,
          })}
        >
          <option value="nopass">Sin encriptación</option>
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
        </select>
      </div>
      {errors.cypher?.type === "required" && (
        <ErrorSpan>El campo es requerido</ErrorSpan>
      )}
      {errors.cypher?.type === "pattern" && (
        <ErrorSpan>El cifrado seleccionado no es válido</ErrorSpan>
      )}
    </div>
  );
};
