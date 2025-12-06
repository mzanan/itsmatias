"use client";

import { motion } from "framer-motion";
import { useContact } from "./useContact";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { Title } from "@/components/Styles/Texts/Title/Title";

export const Contact = () => {
  const {
    contact,
    formData,
    isSubmitting,
    submitStatus,
    state,
    ref,
    isInView,
    containerVariants,
    itemVariants,
    setFormData,
    handleSubmit,
    ValidationError,
  } = useContact();

  return (
    <section
      ref={ref}
      id="contact"
      className="snap-start min-h-dvh flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 md:pt-0 relative overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto max-w-3xl relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <Title centered>Let&apos;s connect</Title>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-12 leading-relaxed md:text-center"
          variants={itemVariants}
        >
          <span className="hidden md:block">
            {contact.description}
          </span>

          <span className="md:hidden">
            {contact.descriptionMobile}
          </span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="bg-card border-2 border-primary/20 rounded-lg p-4 md:p-8 max-w-md w-full mx-auto shadow-2xl backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary/20 rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary/20 rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary/20 rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-primary focus:border-primary resize-none"
              />
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {submitStatus === "success" && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm">
                Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 text-sm">
                Something went wrong. Please try again.
              </div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>
        </motion.div>

        <motion.div
          className="hidden md:flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mt-12"
          variants={containerVariants}
        >
          {contact.reassurances.map((reassurance, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              variants={itemVariants}
            >
              <FaCheckCircle className="h-4 w-4 text-primary/70" />
              <span>{reassurance}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
