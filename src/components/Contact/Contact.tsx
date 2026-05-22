"use client";

import { motion } from "framer-motion";
import { useContact } from "./useContact";
import { Title } from "@/components/Styles/Texts/Title/Title";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";

export const Contact = () => {
  const {
    contact,
    socials,
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

  const inputBase =
    "bg-transparent border-b border-white/40 focus:border-white outline-none placeholder:text-white/30 text-white pb-1 transition-colors";
  const growable = "[field-sizing:content] max-w-full";

  return (
    <section
      ref={ref}
      id="contact"
      className="snap-start min-h-dvh flex items-center px-6 md:px-12 lg:px-20 pt-20 md:pt-24 pb-10 md:pb-16 relative overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto max-w-6xl relative z-10 w-full"
      >
        {/* ====================== MOBILE ====================== */}
        <div className="md:hidden flex flex-col gap-8">
          <motion.div variants={itemVariants}>
            <Title>Let&apos;s talk.</Title>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {contact.descriptionMobile}
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name-m" className="block text-sm text-muted-foreground mb-1">
                  My name is
                </label>
                <input
                  type="text"
                  id="name-m"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="your name"
                  className={`${inputBase} block w-full text-xl`}
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="message-m" className="block text-sm text-muted-foreground mb-1">
                  I&apos;d like help with
                </label>
                <input
                  type="text"
                  id="message-m"
                  name="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="a landing, an ecommerce, an app…"
                  className={`${inputBase} block w-full text-xl`}
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="email-m" className="block text-sm text-muted-foreground mb-1">
                  You can reach me at
                </label>
                <input
                  type="email"
                  id="email-m"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@email.com"
                  className={`${inputBase} block w-full text-xl`}
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-sm mt-1" />
              </div>
            </div>

            {submitStatus === "success" && (
              <div className="text-sm text-green-400">Message sent. I&apos;ll get back to you soon.</div>
            )}
            {submitStatus === "error" && (
              <div className="text-sm text-red-400">Something went wrong. Please try again.</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-3 rounded-full bg-white text-black px-6 py-3 text-sm font-medium shadow-lg transition-all active:scale-95 disabled:opacity-60 self-start"
            >
              {isSubmitting ? "Sending…" : "Send Message"}
              <FaArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.form>

          <motion.ul variants={itemVariants} className="flex flex-row gap-5 flex-wrap pt-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                  <FaArrowUpRightFromSquare className="h-2.5 w-2.5 opacity-60" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ====================== DESKTOP ====================== */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-end">
          <div className="flex flex-col gap-10 lg:gap-12">
            {/* Top: heading */}
            <motion.div variants={itemVariants}>
              <Title>Let&apos;s talk.</Title>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line max-w-2xl">
                {contact.description}
              </p>
            </motion.div>

            {/* Middle: form (mad-libs single sentence) */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
            >
              <p className="text-2xl lg:text-3xl leading-[2.2] text-white">
                <span>My name is </span>
                <label htmlFor="name-d" className="sr-only">Name</label>
                <input
                  type="text"
                  id="name-d"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="your name"
                  className={`${inputBase} ${growable} inline-block align-baseline min-w-[12rem] mx-2 text-2xl lg:text-3xl`}
                />
                <span> and I&apos;d like help with </span>
                <label htmlFor="message-d" className="sr-only">What I need help with</label>
                <input
                  type="text"
                  id="message-d"
                  name="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="a landing, an ecommerce…"
                  className={`${inputBase} ${growable} inline-block align-baseline min-w-[18rem] mx-2 text-2xl lg:text-3xl`}
                />
                <span>. You can reach me at </span>
                <label htmlFor="email-d" className="sr-only">Your email</label>
                <input
                  type="email"
                  id="email-d"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@email.com"
                  className={`${inputBase} ${growable} inline-block align-baseline min-w-[14rem] mx-2 text-2xl lg:text-3xl`}
                />
                <span> to get things started.</span>
              </p>

              <div className="flex flex-wrap gap-4 text-sm mt-4">
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400" />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400" />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400" />
              </div>

              {submitStatus === "success" && (
                <div className="text-sm text-green-400 mt-3">Message sent. I&apos;ll get back to you soon.</div>
              )}
              {submitStatus === "error" && (
                <div className="text-sm text-red-400 mt-3">Something went wrong. Please try again.</div>
              )}

              {/* Hidden submit so Enter key still submits when focus is in an input */}
              <button type="submit" className="hidden" tabIndex={-1} aria-hidden="true">submit</button>
            </motion.form>

            {/* Bottom: Send button */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  const form = document.getElementById("name-d")?.closest("form");
                  form?.requestSubmit();
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-7 py-3.5 text-base font-medium shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
                <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          </div>

          {/* RIGHT: socials anchored to bottom-right (aligned with Send button row) */}
          <motion.ul
            variants={itemVariants}
            className="flex flex-col gap-2.5 items-end"
          >
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Icon className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>{label}</span>
                  <FaArrowUpRightFromSquare className="h-3 w-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
};
