import NavBar from "../ui/Navbar/NavBar"
import { AboutComponent } from "../ui/AboutComponent"
import Footer from "../ui/Footer"
export default function aboutPage() {

    return(
        <div className="flex flex-col">
            <NavBar/>
            <AboutComponent/>
            <Footer/>

        </div>
    )

}