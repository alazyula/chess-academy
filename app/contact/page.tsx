"use client"
import NavBar from "../ui/NavBar";
import Link from "next/link"
import { useState } from "react";

export default function Contact() {

  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const [message,setMessage] = useState('')

    return (
        <main className="flex min-h-screen flex-col items-center" >
          <NavBar/>
            <div className="relative flex place-items-center p-5 bg-white text-black">
                <Link href="/">Home</Link>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col w-500">

                    <label htmlFor="form-name">Name </label>
                    <input id="form-name" autoComplete="name" maxLength={50}  name="name" onChange={(e) => setName(e.target.value)} className="text-black"/>

                    <label htmlFor="form-email"> Email:</label>
                    <input id="form-email" required autoComplete="email" maxLength={80} name="email" type="email" onChange={(e) => setEmail(e.target.value)} className="text-black"/>

                    <label htmlFor="form-message"> Message: </label>
                    <textarea id="form-message" required name="message" rows={5} onChange={(e) => setMessage(e.target.value)} className="text-black"/>

                </div>
                <button className=" rounded bg-sky-400" type="submit">Send</button>
            </form>
        </main>
    )
}