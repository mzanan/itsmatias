import { useState } from "react";
import { FaTelegram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons";

type ContactMethod = {
  type: string;
  label: string;
  url: string;
  Icon: IconType;
};

type ContactData = {
  description: string;
  methods: ContactMethod[];
  ctaText: string;
  reassurances: string[];
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

export const useContact = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const contact: ContactData = {
    description:
      "Have a project in mind or want to discuss opportunities? I'd love to hear from you. Reach out through any of these channels.",
    methods: [
      {
        type: "whatsapp",
        label: "WhatsApp",
        url: "https://wa.me/+5491157567049",
        Icon: FaWhatsapp,
      },
      {
        type: "telegram",
        label: "Telegram",
        url: "https://t.me/mzanan",
        Icon: FaTelegram,
      },
      {
        type: "twitter",
        label: "X",
        url: "https://twitter.com/mzanan",
        Icon: FaTwitter,
      },
    ],
    ctaText: "Send me an email",
    reassurances: [
      "Fast replies",
      "100% tailored solutions",
      "Secure payment integration available",
    ],
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/xpwnqjdk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "Project Inquiry from Portfolio",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setShowForm(false);
          setSubmitStatus("idle");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSubmitStatus("idle");
    setFormData({ name: "", email: "", message: "" });
  };

  return {
    contact,
    showForm,
    setShowForm,
    formData,
    setFormData,
    isSubmitting,
    submitStatus,
    handleSubmit,
    closeForm,
  };
};
