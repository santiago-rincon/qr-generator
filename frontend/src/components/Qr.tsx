import "./Form.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Bounce } from "react-toastify";

export const Qr = ({
  src,
  setSrc,
}: {
  src: string;
  setSrc: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const downloadFile = () => {
    const mimeType = src.split(";")[0].split(":")[1];
    const link = document.createElement("a");
    link.href = src;
    link.download = mimeType === "image/png" ? "qr.png" : "qr.svg";
    link.click();
    link.remove();
    toast.success("Descarga completa", {
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
    return;
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
      <div className="max-w-3xl mx-auto flex flex-col px-4 md:px-0 py-10 justify-center items-center gap-y-5 w-full min-h-[76vh]">
        <h2 className="text-balance text-3xl font-bold uppercase">
          Aquí tienes tu código QR
        </h2>
        <img
          className="bg-white w-80 h-auto aspect-square border border-black/90 dark:border-none rounded-2xl"
          src={src}
          alt="Código QR"
        />
        <div className="flex flex-row gap-x-10">
          <button className="btn" onClick={downloadFile}>
            Descargar
          </button>
          <button className="btn" onClick={() => setSrc("")}>
            Nuevo QR
          </button>
        </div>
      </div>
    </>
  );
};
