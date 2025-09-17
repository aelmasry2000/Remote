import express from "express";
import fetch from "node-fetch";

const app = express();

app.use("/", async (req, res) => {
  try {
    const targetUrl = "https://chatgpt.com/g/g-V5Bhi0ZRn-ayman";

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        "host": "chatgpt.com"
      },
    });

    // Set headers from the target response
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Stream the response body
    response.body.pipe(res);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
