"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only for now - can be connected to an API later
    console.log("Form submitted:", formData);
    alert("Thank you for your message! (This is a placeholder - form submission not yet configured)");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center"
        >
          Let&apos;s build something
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-foreground/60 text-center mb-12"
        >
          Have a project in mind? Want to collaborate? Get in touch.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-6 mb-12"
        >
          <div>
            <Input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div>
            <Textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full"
            />
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto">
            PRESS START
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>

          <a
            href="mailto:lautaro@example.com"
            className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors"
          >
            <Mail size={20} />
            <span>Email</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

