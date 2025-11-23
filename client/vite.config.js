// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import svgr from "vite-plugin-svgr";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     svgr({
//       // svgr options: https://react-svgr.com/docs/options/
//       svgrOptions: {
//         exportType: "default",
//         ref: true,
//         svgo: false,
//         titleProp: true,
//       },
//       include: "**/*.svg",
//     }),
//   ],
//   server: {
//     port: 80,
//     host: "123.231.16.60",
//   },
// });

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import svgr from "vite-plugin-svgr";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     svgr({
//       // svgr options: https://react-svgr.com/docs/options/
//       svgrOptions: {
//         exportType: "default",
//         ref: true,
//         svgo: false,
//         titleProp: true,
//       },
//       include: "**/*.svg",
//     }),
//   ],
//   server: {
//     port: 80, // Convert port to integer
//     host: import.meta.env.VITE_REACT_HOST_ADDRESS || "localhost", // Default to 'localhost' if not defined
//   },
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// export default defineConfig({
//   plugins: [
//     react(),
//     svgr({
//       svgrOptions: {
//         exportType: "default",
//         ref: true,
//         svgo: false,
//         titleProp: true,
//       },
//       include: "**/*.svg",
//     }),
//   ],
//   server: {
//     port: import.meta.env.VITE_REACT_PORT || 3000, // Default port if not defined
//     host: import.meta.env.VITE_REACT_HOST_ADDRESS || "localhost",
//   },
// });

export default ({ mode }) => {
  // const x = process.env.VITE_REACT_PORT;
  // console.log(x);

  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: "default",
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: "**/*.svg",
      }),
    ],
    server: {
      port: process.env.VITE_REACT_PORT || 7000, // Default port if not defined
      host: process.env.VITE_REACT_HOST_ADDRESS || "localhost",
    },
  });
};
