import { sendContactEmail, validateContactPayload } from "../lib/contact.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

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
}
