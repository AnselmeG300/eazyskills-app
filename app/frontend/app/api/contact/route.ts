"use server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validation des champs obligatoires
    if (
      !data.nom?.trim() ||
      !data.prenom?.trim() ||
      !data.email?.trim() ||
      !data.telephone?.trim() ||
      !data.message?.trim()
    ) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires" },
        { status: 400 }
      );
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    // Envoi via Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `Nouveau message de ${data.prenom} ${data.nom}`,
      text: `Message reçu :\n\n${JSON.stringify(data, null, 2)}`,
      html: `
        <h1>Nouveau contact</h1>
        <ul>
          <li>Nom: ${data.nom}</li>
          <li>Prénom: ${data.prenom}</li>
          <li>Email: ${data.email}</li>
          <li>Téléphone: ${data.telephone}</li>
        </ul>
        <h2>Message :</h2>
        <p>${data.message}</p>
      `,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erreur API contact:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
