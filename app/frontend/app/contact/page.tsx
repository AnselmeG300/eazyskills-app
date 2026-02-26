"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

interface FormState {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    success?: string;
    error?: string;
    loading: boolean;
  }>({ loading: false });

  const validateForm = (): string | null => {
    if (!Object.values(formData).every((v) => v.trim())) {
      return "Tous les champs sont obligatoires";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Adresse email invalide";
    }
    if (!/^\+?[0-9\s-]{6,14}$/.test(formData.telephone)) {
      return "Numéro de téléphone invalide";
    }
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true });

    const validationError = validateForm();
    if (validationError) {
      setStatus({ error: validationError, loading: false });
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setStatus({ success: "Message envoyé avec succès !", loading: false });
      setFormData({ nom: "", prenom: "", email: "", telephone: "", message: "" });
    } catch (error: any) {
      setStatus({ error: error.message, loading: false });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Contactez-nous</h1>

      <div className="flex flex-col gap-3 mb-8 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Phone className="w-4 h-4" /> +33 (0)X XX XX XX XX
        </span>
        <span className="flex items-center gap-2">
          <Mail className="w-4 h-4" /> contact@example.com
        </span>
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Ville, Pays
        </span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Input
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
          <Input
            name="prenom"
            placeholder="Prénom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="telephone"
          placeholder="Téléphone"
          value={formData.telephone}
          onChange={handleChange}
          required
        />
        <Textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
        />

        {status.error && (
          <p className="text-destructive text-sm">{status.error}</p>
        )}
        {status.success && (
          <p className="text-green-600 text-sm">{status.success}</p>
        )}

        <Button type="submit" disabled={status.loading}>
          {status.loading ? "Envoi en cours…" : "Envoyer"}
        </Button>
      </form>
    </div>
  );
}
