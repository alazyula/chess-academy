import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';

const Sidebar = () => {
  return (
    <div className="h-full bg-slate-200 dark:bg-slate-700 text-black dark:text-white w-64 flex flex-col">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold">Yönetim Konsolu</h1>
        <ThemeSwitch/>

      </div>
      <nav className="flex-grow px-4 mt-4">
        <ul>
          <li className="mb-2">
            <Link href="/dashboard">
              Panel
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/dashboard/homepage">
              Anasayfayı Düzenle
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/dashboard/blog">
              Blog Yaz
            </Link>
          </li>
        </ul>
      </nav>
      <div className="px-4 py-6">
        <Link href="/logout">
          <button className="block px-4 py-2 rounded bg-red-600 hover:bg-red-700">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
