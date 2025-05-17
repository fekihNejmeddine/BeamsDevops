import express from "express";
import proxy from "express-http-proxy";
import dotenv from "dotenv";
import { PROXY_ROUTES } from "./utils/proxyRoutes";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

PROXY_ROUTES.forEach((route) => {
  app.use(
    route.path,
    createProxyMiddleware({
      target: route.target,
      changeOrigin: true,
      pathRewrite: {
        [`^${route.path}`]: "", 
      },
    })
  );
});
// Proxy WebSocket connections
app.use(
  "/socket.io",
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true,
    ws: true,
  })
);
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
