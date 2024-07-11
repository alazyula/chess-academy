
import ThemeSwitch from "./ThemeSwitch"
export default function NavBar() {

    return (
        <nav>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-slate-200 dark:bg-slate-600 dark:text-slate-300">

                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center justify-start">

                        <p>Logo</p>

                    </div>

                    <div className="flex items-start justify-between space-x-10">

                        <p>Hakkımızda</p>
                        <p>Eğitimler</p>
                        <p>Blog</p>
                        <p>iletişim</p>

                    </div>

                    <div className="flex items-end mr-4 ">

                    <ThemeSwitch/>

                    </div>



                </div>


             </div>
        </nav>



    )


}