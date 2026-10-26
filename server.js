import cors from "cors";
import express from "express";
import { sendContactEmail, validateContactPayload } from "./lib/contact.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: clientOrigin }));
app.use(express.json({ limit: "10kb" }));

app.post("/api/contact", async (req, res) => {
  const contact = validateContactPayload(req.body);

  if (!contact) {
    return res.status(400).json({ error: "Revisá los datos del formulario." });
  }

  try {
    await sendContactEmail(contact);
    return res.status(200).json({ message: "Mensaje enviado." });
  } catch (error) {
    console.error("No se pudo enviar el mensaje de contacto:", error);
    return res.status(500).json({
      error: "No se pudo enviar el mensaje. Intentá nuevamente más tarde.",
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
