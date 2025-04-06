import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // 0.0.0.0 にバインド
    port: 3001, // ここでポートを指定
  },
  resolve: {
    alias: {
      // シンボリックリンクの問題を解決するためのエイリアス設定
      src: resolve(__dirname, "src")
    }
  }
});