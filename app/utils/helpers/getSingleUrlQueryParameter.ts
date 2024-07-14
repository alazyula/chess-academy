import { usePathname } from "next/navigation"

export default function getSingleUrlQueryParameter(){
    const pathname = usePathname();
    const id = pathname?.substring(pathname.lastIndexOf('/')+1);
    return id;
}