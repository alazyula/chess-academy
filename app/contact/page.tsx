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
        <main className="flex min-h-screen flex-col items-center" >
          <NavBar/>
            <div className="flex container bg-slate-300 dark:bg-slate-700">

                <ContactForm/>

            </div>
        </main>
    )
}