import cors from "cors";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_request, response) => {
  response.send("Hello from Inventory API!");
});

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Inventory API is running on http://localhost:${PORT}`);
});
