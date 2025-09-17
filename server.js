import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// Proxy all requests to ChatGPT's custom GPT page
app.use(
  "/",
  createProxyMiddleware({
    target: "https://chatgpt.com",
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      "^/": "/g/g-V5Bhi0ZRn-ayman",
    },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("Host", "chatgpt.com");
    },
    onError: (err, req, res) => {
      console.error("Proxy error:", err);
      res.status(500).send("Proxy error");
    },
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
