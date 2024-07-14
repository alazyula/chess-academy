import { usePathname } from "next/navigation"

export default function useSingleUrlQueryParameter(){
    const pathname = usePathname();
    const id = pathname?.substring(pathname.lastIndexOf('/')+1);
    return id;
}