const validSubjects = {
  "desarrollo-web": "Desarrollo Web & Frontend a Medida",
  "fullstack-app": "Aplicación Full-Stack",
  consultoria: "Consultoría de Accesibilidad & Performance",
  otro: "Otro requerimiento",
};

export function validateContactPayload(body) {
  const { name, email, subject, message } = body ?? {};

  if (
    typeof name !== "string" ||
    name.trim().length < 2 ||
    name.trim().length > 200 ||
    typeof email !== "string" ||
    email.trim().length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof subject !== "string" ||
    !Object.hasOwn(validSubjects, subject) ||
    typeof message !== "string" ||
    message.trim().length < 6 ||
    message.trim().length > 5000
  ) {
    return null;
  }

  return {
    name: name.trim(),
    email: email.trim(),
    subject: validSubjects[subject],
    message: message.trim(),
  };
}

export async function sendContactEmail({ name, email, subject, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("Faltan RESEND_API_KEY o RESEND_FROM_EMAIL.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: ["eolavaca@gmail.com"],
      reply_to: email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend respondió con ${response.status}: ${details}`);
  }
}
