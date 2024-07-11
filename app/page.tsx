import Image from "next/image";
import NavBar from "./ui/NavBar";
import { FirstHomepageComponent } from "./ui/FirstHomepageComponent";
export default function Home() {
  return (

    <div className="bg-slate-300 dark:bg-slate-700">

        <NavBar />
       <main className="flex min-h-screen flex-col items-center justify-between bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
       <FirstHomepageComponent />
    </main>

    </div>

   
  );
}
