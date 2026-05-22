import { useState, useRef, useMemo, useEffect, startTransition, type ComponentType } from "react";
import { useInView } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

type ContactData = {
  description: string;
  descriptionMobile: string;
};

type FormData = {
  name: string;
  email: string;
  message: string;
};

type Social = {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
};

export const useContact = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [state, handleSubmit] = useForm("mblvrwdy");

  useEffect(() => {
    if (state.succeeded) {
      startTransition(() => {
      setFormData({ name: "", email: "", message: "" });
      });
    }
  }, [state.succeeded]);

  const contact: ContactData = useMemo(
    () => ({
      description:
        "Have a project in mind or just want to explore ideas?\nShare a few details below and I'll get back to you shortly.",
      descriptionMobile:
        "Have a project in mind? Share a few details and I'll get back to you shortly.",
    }),
    []
  );

  const socials: Social[] = useMemo(
    () => [
      { label: "WhatsApp", href: "https://wa.me/5491157567049", Icon: FaWhatsapp },
      { label: "LinkedIn", href: "https://linkedin.com/in/matiaszanan", Icon: FaLinkedin },
      { label: "matiaszanan@gmail.com", href: "mailto:matiaszanan@gmail.com", Icon: HiMail },
    ],
    []
  );

  const isSubmitting = state.submitting;
  const submitStatus = state.succeeded ? "success" : state.errors ? "error" : "idle";

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
    socials,
    formData,
    setFormData,
    isSubmitting,
    submitStatus,
    handleSubmit,
    state,
    ValidationError,
    ref,
    isInView,
    containerVariants,
    itemVariants,
  };
};
