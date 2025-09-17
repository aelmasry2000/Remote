import express from "express";
import fetch from "node-fetch";

const app = express();

app.use("/", async (req, res) => {
  try {
    const targetUrl = "https://chatgpt.com/g/g-V5Bhi0ZRn-ayman";

    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
    });

    // Pass response back
    const body = await response.text();
    res.status(response.status).send(body);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
