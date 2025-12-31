"use client";

import { useState } from "react";
import Image from "next/image";

interface FormFields {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormFields>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");

  // Validate a single field
  const validateField = (field: keyof FormFields, value: string) => {
    switch (field) {
      case "name":
        return value.trim().length < 2
          ? "Name must be at least 2 characters"
          : "";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email address";
      case "phone":
        return /^\d{8,15}$/.test(value.replace(/\s+/g, ""))
          ? ""
          : "Invalid phone number";
      case "subject":
        return value.trim().length < 2 ? "Subject is too short" : "";
      case "message":
        return value.trim().length < 10
          ? "Message must be at least 10 characters"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const isFormValid = () =>
    Object.values(errors).every((e) => e === "") &&
    Object.values(form).every((v) => v.trim() !== "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    const newErrors: FormErrors = {} as FormErrors;
    (Object.keys(form) as (keyof FormFields)[]).forEach((field) => {
      newErrors[field] = validateField(field, form[field]);
    });
    setErrors(newErrors);

    if (!Object.values(newErrors).every((e) => e === "")) {
      setStatus("Please fix the errors before submitting.");
      return;
    }

    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message.");
    }
  };

  const renderInput = (field: keyof FormFields, type = "text") => {
    const isTextarea = field === "message" || field === "subject";
    const value = form[field];
    const error = errors[field];
    const borderClass = error
      ? "border-red-500 shadow-[0_0_10px_#f87171,0_0_20px_#f87171]"
      : value
        ? "border-green-400 shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80]"
        : "border-white";

    return (
      <div key={field}>
        <label className="block text-green-400 mb-1 capitalize">{field}</label>
        {isTextarea ? (
          <textarea
            rows={field === "message" ? 5 : 1}
            placeholder={`Enter ${field}`}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${borderClass}`}
          />
        ) : (
          <input
            type={type}
            placeholder={`Enter ${field}`}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${borderClass}`}
          />
        )}
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  };

  return (
    <div className="min-h-screen dark:bg-black text-green-400 flex flex-col items-center pt-16 px-4">
      {/* Logo */}
      <div className="mb-6 w-full flex justify-center">
        <div
          className="
    h-48 
    px-6 
    flex items-center justify-center
    bg-black dark:bg-black
    rounded-xl
    shadow-sm dark:shadow-none
    transition-colors
  "
        >
          <Image
            unoptimized
            src="/images/logo1.png"
            alt="MVMNT Logo"
            width={300}
            height={200}
            className="object-contain rotate-90"
            priority
          />
        </div>
      </div>

      
      <h1 className="text-4xl text-gray-900 dark:text-gray-100  md:text-5xl font-bold mb-4">
        Contact Us
      </h1>
      <p className=" text-center max-w-xl mb-12 text-gray-900 dark:text-gray-100">
        Whether you&apos;re planning an event, want to collaborate, or just want
        to say hi, we’re here for it. Fill out the form below or reach out
        directly via email or phone.
      </p>

      {/* Contact Card */}
      <div className="bg-black border rounded-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["name", "phone", "email", "subject", "message"].map((field) =>
            renderInput(
              field as keyof FormFields,
              field === "email" ? "email" : "text"
            )
          )}

          <button
            type="submit"
            disabled={!isFormValid()}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Message
          </button>

          {status && <p className="mt-2 text-green-300">{status}</p>}
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-white">
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">Email</h2>
            <a
              href="mailto:Enquiries@mvmntentertainment.com"
              className="hover:underline"
            >
              Enquiries@mvmntentertainment.com
            </a>
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">Phone</h2>
            <a href="tel:+0431383674" className="hover:underline">
              0431383674
            </a>
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">Location</h2>
            <p>Naarm / Melbourne, Australia</p>
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">
              Complaints
            </h2>
            <p>complaints@mvmntentertainment.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
