import { sendContactEmail, validateContactPayload } from "../lib/contact.js";

export default async function handler(req, res) {
  const locale = req.body?.locale === "en" ? "en" : "es";

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: locale === "en" ? "Method not allowed." : "Método no permitido." });
  }

  const contact = validateContactPayload(req.body);

  if (!contact) {
    return res.status(400).json({ error: locale === "en" ? "Please review the form data." : "Revisá los datos del formulario." });
  }

  try {
    await sendContactEmail(contact);
    return res.status(200).json({ message: locale === "en" ? "Message sent." : "Mensaje enviado." });
  } catch (error) {
    console.error("Could not send the contact message:", error);
    const detail = error instanceof Error ? error.message : (locale === "en" ? "Unknown error." : "Error desconocido.");
    return res.status(500).json({ error: detail });
  }
}
