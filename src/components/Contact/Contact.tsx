"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useContact } from "./useContact";
import { Button } from "@/components/ui/button";
import { FaCheckCircle, FaPaperPlane, FaTimes } from "react-icons/fa";

export const Contact = () => {
  const {
    contact,
    showForm,
    setShowForm,
    formData,
    setFormData,
    isSubmitting,
    submitStatus,
    handleSubmit,
    closeForm,
  } = useContact();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20% 0px", once: false });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="snap-start min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl mix-blend-screen" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto max-w-3xl text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Let's Connect</span>
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mx-auto" />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed"
          variants={itemVariants}
        >
          {contact.description}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          variants={containerVariants}
        >
          {contact.methods.map((method, index) => {
            const Icon = method.Icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <a
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 border border-primary/50 rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{method.label}</span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="text-base px-8 py-6 group mb-8"
            onClick={() => setShowForm(true)}
          >
            {contact.ctaText}
            <FaPaperPlane className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Button>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-background border border-border rounded-lg p-8 max-w-md w-full mx-4 shadow-xl"
          >
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaTimes className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="text-muted-foreground mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              {submitStatus === "success" && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 text-sm">
                  Something went wrong. Please try again or use one of the contact methods above.
                </div>
              )}

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={closeForm} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};
