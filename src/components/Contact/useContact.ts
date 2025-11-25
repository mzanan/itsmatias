import { useState, useRef, useMemo } from "react";
import { useInView } from "framer-motion";

type ContactData = {
  description: string;
  reassurances: string[];
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

export const useContact = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const contact: ContactData = useMemo(
    () => ({
      description:
        "Have a project in mind or want to discuss opportunities? I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.",
      reassurances: [
        "Fast replies",
        "100% tailored solutions",
        "Secure payment integration available",
      ],
    }),
    []
  );


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
          setSubmitStatus("idle");
        }, 3000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }),
    []
  );

  return {
    contact,
    formData,
    setFormData,
    isSubmitting,
    submitStatus,
    handleSubmit,
    ref,
    isInView,
    containerVariants,
    itemVariants,
  };
};
