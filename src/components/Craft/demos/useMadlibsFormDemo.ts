import { useState, type ChangeEvent, type FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export const useMadlibsFormDemo = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });

  const update = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) =>
    setFormData((current) => ({ ...current, [field]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return { formData, update, onSubmit };
};
