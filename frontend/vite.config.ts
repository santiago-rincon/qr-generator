import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@icons": path.resolve(__dirname, "./src/icons"),
      "@types": path.resolve(__dirname, "./src/types.d.ts"),
      "@const": path.resolve(__dirname, "./src/const.ts"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
