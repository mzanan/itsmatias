"use client";

import { motion } from "framer-motion";
import { useContact } from "./useContact";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";

export const Contact = () => {
  const {
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
  } = useContact();

  return (
    <section
      ref={ref}
      id="contact"
      className="snap-start min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden w-full"
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
            <span className="gradient-text">Send me an email</span>
          </h2>
          <div className="h-1 w-12 bg-linear-to-r from-cyan-400 to-purple-600 rounded-full mx-auto" />
        </motion.div>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed"
          variants={itemVariants}
        >
          {contact.description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="bg-card border-2 border-primary/20 rounded-lg p-8 max-w-md w-full mx-auto shadow-2xl backdrop-blur-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary/20 rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary/20 rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 border-2 border-primary/20 rounded-md bg-input text-foreground focus:outline-none focus:ring focus:ring-primary focus:border-primary resize-none"
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
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mt-8"
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
