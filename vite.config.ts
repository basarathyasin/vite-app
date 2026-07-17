import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
		tailwindcss(),
	],
	server: {
		port: 5175,
		proxy: {
			"/api": {
				target: "http://localhost:1337",
				changeOrigin: true,
			},
			"/graphql": {
				target: "http://localhost:1337",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
