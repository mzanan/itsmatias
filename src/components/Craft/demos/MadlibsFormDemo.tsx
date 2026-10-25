"use client";

import { useMadlibsFormDemo } from "./useMadlibsFormDemo";

const inputBase =
  "bg-transparent border-b border-white/40 focus:border-white outline-none placeholder:text-white/30 text-white pb-1 transition-colors";
const growable = "[field-sizing:content] max-w-full";

export const MadlibsFormDemo = () => {
  const { formData, update, onSubmit } = useMadlibsFormDemo();

  return (
    <div className="@container relative flex h-full w-full items-center overflow-hidden px-5 @min-[400px]:px-7">
      <form onSubmit={onSubmit} className="w-full">
        <p className="text-sm leading-[2.2] text-white @min-[400px]:text-lg">
          <span>My name is </span>
          <label htmlFor="craft-name" className="sr-only">
            Name
          </label>
          <input
            type="text"
            id="craft-name"
            name="name"
            value={formData.name}
            onChange={update("name")}
            placeholder="your name"
            className={`${inputBase} ${growable} inline-block align-baseline min-w-[6.4em] mx-1.5`}
          />
          <span> and I&apos;d like help with </span>
          <label htmlFor="craft-message" className="sr-only">
            What I need help with
          </label>
          <span className="inline-grid align-baseline mx-1.5 max-w-full">
            <span aria-hidden className="col-start-1 row-start-1 invisible whitespace-pre px-1">
              {formData.message || "a landing, an ecommerce…"}
            </span>
            <input
              type="text"
              id="craft-message"
              name="message"
              value={formData.message}
              onChange={update("message")}
              placeholder="a landing, an ecommerce…"
              className={`${inputBase} col-start-1 row-start-1 w-full px-1`}
            />
          </span>
          <span>. You can reach me at </span>
          <label htmlFor="craft-email" className="sr-only">
            Your email
          </label>
          <input
            type="email"
            id="craft-email"
            name="email"
            value={formData.email}
            onChange={update("email")}
            placeholder="you@email.com"
            className={`${inputBase} ${growable} inline-block align-baseline min-w-[7.5em] mx-1.5`}
          />
          <span> to get things started.</span>
        </p>
        <button type="submit" className="hidden" tabIndex={-1} aria-hidden="true">
          submit
        </button>
      </form>
    </div>
  );
};
