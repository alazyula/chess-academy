function Footer() {
    return (
      <footer className="mt-36 pb-10">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Adres</h3>
              <p>Limon caddesi Zeytin sokak no:1</p>
              <p>Çiğli, İzmir,  35000</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Telefon</h3>
              <p>+90 543 210 98 76</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Eposta</h3>
              <p>chesslover115@gmail.com</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-4 text-center">
            <p>&copy; {new Date().getFullYear()} Chess Academy. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  