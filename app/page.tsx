import Image from "next/image";
import NavBar from "./ui/Navbar/NavBar";
import { FirstHomepageComponent } from "./ui/FirstHomepageComponent";
import Carousel from "./ui/Homepage/Carousel";
import Footer from "./ui/Footer";
import Hero from "./ui/Homepage/Hero";
export default function Home() {
  return (

    <div className="bg-slate-300 dark:bg-slate-700">

        <NavBar />
       <main className="flex min-h-screen flex-col items-center justify-between bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
       <Carousel/>
       <Hero/>
    </main>
    
    <Footer/>

    </div>

   
  );
}
