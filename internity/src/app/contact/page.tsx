"use client"

import type React from "react"
import { useState } from "react"
import MainLayout from "@/components/layout/MainLayout"
import { toast } from "sonner"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ExpandableFAQ from "@/components/ui/ExpandableCard"

export default function ContactPage() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  })

  // Handle form input changes
  interface FormData {
    name: string
    email: string
    message: string
    phone: string
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    try {
      const response = await fetch('http://127.0.0.1:5000/user/contactus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({ name: '', email: '', message: '', phone: '' });
        console.log("Form submitted:", formData);
        toast.success("Thanks for your message! This form is not yet connected to a backend.");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong. Please try again later.");
    }
  }

  return (
    <MainLayout>
      {/* Contact Form Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="text-gray-400 mb-2 block">Reach Out for Support</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you need help with your InternGeanie account, want to inquire about our features, or have
              feedback, our team is ready to assist. Drop us a message and we'll get back to you promptly.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="What's on your mind?"
                  rows={4}
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number (optional)"
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md">
                  Submit
                </Button>
              </div>
            </form>

            <div className="flex justify-center mt-12 space-x-6">
              <Link
                href="https://discord.gg/interngeanie"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8.59 15.3c-.9 0-1.62-.73-1.62-1.62 0-.9.73-1.62 1.62-1.62.9 0 1.62.73 1.62 1.62 0 .9-.73 1.62-1.62 1.62Z"></path>
                    <path d="M15.41 15.3c-.9 0-1.62-.73-1.62-1.62 0-.9.73-1.62 1.62-1.62.9 0 1.62.73 1.62 1.62 0 .9-.72 1.62-1.62 1.62Z"></path>
                    <path d="M19.18 5.53C18.24 5.05 17.22 4.72 16.17 4.56c-.18.31-.39.75-.53 1.09-1.15-.17-2.29-.17-3.43 0-.14-.34-.35-.78-.54-1.09-1.05.16-2.07.49-3.01.97-1.91 2.85-2.44 5.65-2.17 8.4.94.67 1.86 1.09 2.75 1.35.22-.3.42-.61.59-.95-.33-.12-.64-.28-.93-.47.08-.06.15-.13.22-.2 1.71.77 3.58.77 5.29 0 .08.07.15.14.22.2-.29.19-.6.35-.93.47.18.34.37.65.59.95.9-.26 1.81-.68 2.75-1.35.31-3.13-.53-5.9-2.36-8.4Z"></path>
                  </svg>
                </div>
              </Link>
              <Link
                href="https://www.instagram.com/interngeanie/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/interngeanie"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
              </Link>
              <Link href="mailto:info@interngeanie.com" className="hover:opacity-80">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section - Now using the ExpandableFAQ component */}
      <ExpandableFAQ />

    </MainLayout>
  )
}

