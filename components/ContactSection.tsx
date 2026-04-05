"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { owner } from "@/data/portfolio";

const BehanceIcon = (props: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size ?? 22}
    height={props.size ?? 22}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    aria-hidden
  >
    <path d="M8.5 12.5h4a2.5 2.5 0 0 0 0-5h-4v5Z" />
    <path d="M8.5 7.5H12" />
    <path d="M8.5 17.5H12a2.5 2.5 0 0 0 0-5H8.5v5Z" />
    <path d="M15.5 8.5h3" />
    <path d="M15.5 12.5a3.5 3.5 0 1 0 0 7h3.5v-7h-3.5Z" />
  </svg>
);

const socialItems = [
  { key: "behance" as const, href: owner.socials.behance, Icon: BehanceIcon },
  {
    key: "instagram" as const,
    href: owner.socials.instagram,
    Icon: Instagram,
  },
  { key: "twitter" as const, href: owner.socials.twitter, Icon: Twitter },
  { key: "linkedin" as const, href: owner.socials.linkedin, Icon: Linkedin },
  { key: "facebook" as const, href: owner.socials.facebook, Icon: Facebook },
];

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "Name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(false);
    if (!validate()) return;
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="border-t border-neutral-100 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-neutral-900 sm:text-4xl">
Let's work together
          </h2>
          <p className="mt-4 max-w-md text-neutral-600">
            Have a project in mind? Send a message or reach out via socials.
            I typically reply within one business day.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {socialItems.map(({ key, href, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-card text-neutral-700 transition-transform hover:scale-105 hover:border-neutral-300"
                  aria-label={key}
                >
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <div className="flex flex-col justify-center h-full">
  <p className="text-sm text-gray-400 mb-4 uppercase tracking-widest">By the numbers</p>
  <div className="grid grid-cols-3 gap-4">
    {[
      { num: "12+", label: "Projects" },
      { num: "3+",  label: "Years exp." },
      { num: "100%", label: "On-time" },
    ].map((stat) => (
      <div
        key={stat.label}
        className="bg-gray-50 rounded-xl p-5 text-center border border-gray-100 hover:border-gray-300 transition-all"
      >
        <p className="text-3xl font-semibold text-gray-900">{stat.num}</p>
        <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
      </div>
    ))}
  </div>
</div>

        {/* <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          onSubmit={onSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-neutral-200/80 bg-card p-6 sm:p-8"
          noValidate
        >
          <div>
            <label
              htmlFor="contact-name"
              className="mb-1.5 block text-sm font-medium text-neutral-800"
            >
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 outline-none ring-neutral-900/10 transition focus:ring-2"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="mb-1.5 block text-sm font-medium text-neutral-800"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 outline-none ring-neutral-900/10 transition focus:ring-2"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-neutral-900 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Submit
          </button>
          {submitted && (
            <p className="text-center text-sm text-sage" role="status">
              Thanks — your message is ready to send. Connect this form to your
              backend or email service.
            </p>
          )}
        </motion.form> */}
      </div>
    </section>
  );
}
