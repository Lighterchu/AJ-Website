"use client";

import { useState } from "react";
import Image from "next/image";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Validate individual fields
  const validateField = (field: string, value: string) => {
    switch (field) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : "";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email address";
      case "phone":
        return /^\d{8,15}$/.test(value.replace(/\s+/g, "")) ? "" : "Invalid phone number";
      case "subject":
        return value.trim().length < 2 ? "Subject is too short" : "";
      case "message":
        return value.trim().length < 10 ? "Message must be at least 10 characters" : "";
      default:
        return "";
    }
  };

  // Check if field has value
  const fieldHasValue = (field: string) => {
    switch (field) {
      case "name": return name.trim() !== "";
      case "email": return email.trim() !== "";
      case "phone": return phone.trim() !== "";
      case "subject": return subject.trim() !== "";
      case "message": return message.trim() !== "";
      default: return false;
    }
  };

  // Get dynamic border class
  const getBorderClass = (field: string) =>
    errors[field]
      ? "border-red-500 shadow-[0_0_10px_#f87171,0_0_20px_#f87171]"
      : fieldHasValue(field)
      ? "border-green-400 shadow-[0_0_10px_#4ade80,0_0_20px_#4ade80]"
      : "border-white";

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    switch (field) {
      case "name": setName(value); break;
      case "email": setEmail(value); break;
      case "phone": setPhone(value); break;
      case "subject": setSubject(value); break;
      case "message": setMessage(value); break;
    }
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const isFormValid = () =>
    Object.values(errors).every((e) => e === "") &&
    name && email && phone && subject && message;

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      phone: validateField("phone", phone),
      subject: validateField("subject", subject),
      message: validateField("message", message),
    };
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
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center pt-16 px-4">
      {/* Logo */}
      <div className="mb-6">
        <Image
          src="/images/logo1.png"
          alt="MVMNT Logo"
          width={300}
          height={200}
          className="object-contain rotate-90"
        />
      </div>

      <h1 className="text-4xl text-white md:text-5xl font-bold mb-4">Contact Us</h1>
      <p className="text-white text-center max-w-xl mb-12">
        Whether you&apos;re planning an event, want to collaborate, or just want to say hi, we’re here for it. Fill out the form below or reach out directly via email or phone.
      </p>

      {/* Contact Card */}
      <div className="bg-black border rounded-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["name", "phone", "email", "subject", "message"].map((field) => (
            <div key={field}>
              <label className="block text-green-400 mb-1 capitalize">{field}</label>
              {(field === "message" || field === "subject") ? (
                <textarea
                  rows={field === "message" ? 5 : 1}
                  placeholder={`Enter ${field}`}
                  value={eval(field)}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(field)}`}
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  placeholder={`Enter ${field}`}
                  value={eval(field)}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className={`w-full px-4 py-2 rounded bg-black text-white border focus:outline-none focus:ring-2 ${getBorderClass(field)}`}
                />
              )}
              {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
            </div>
          ))}

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
            <a href="mailto:info@mvmntentertainment.com" className="hover:underline">
              mvmnt.entertainment.melb@gmail.com
            </a>
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">Phone</h2>
            <a href="tel:+1234567890" className="hover:underline">0431383674</a>
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">Location</h2>
            <p>Naarm / Melbourne, Australia</p>
          </div>
        </div>
      </div>
    </div>
  );
}
  