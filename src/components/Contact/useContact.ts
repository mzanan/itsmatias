import { useState, useRef, useMemo, useEffect } from "react";
import { useInView } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";

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
  const [state, handleSubmit] = useForm("mblvrwdy");

  useEffect(() => {
    if (state.succeeded) {
      setFormData({ name: "", email: "", message: "" });
    }
  }, [state.succeeded]);

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

  const isSubmitting = state.submitting;
  const submitStatus = state.succeeded ? "success" : (state.errors?.length ?? 0) > 0 ? "error" : "idle";

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
    state,
    ValidationError,
    ref,
    isInView,
    containerVariants,
    itemVariants,
  };
};
