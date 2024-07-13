"use client"
import NavBar from "../ui/NavBar";
import Link from "next/link"
import { useState } from "react";
import ContactForm from "../ui/ContactForm";

export default function Contact() {

  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [message,setMessage] = useState('')

    return (
      <div className="bg-slate-300 dark:bg-slate-700">

    <NavBar />
   <main className="flex min-h-screen flex-col items-center justify-between bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
      
      <ContactForm/>
      
</main>

</div>
    )
}