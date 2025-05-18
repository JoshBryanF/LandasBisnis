const Footer = () => (
  <footer className="bg-[#B82132] text-white py-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-bold text-xl mb-4">Landas Bisnis</h3>
        <p className="text-sm">
          Membantu menghubungkan ide bisnis dengan peluang nyata untuk masa depan yang lebih baik.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/explore" className="hover:underline">Explore</a></li>
          <li><a href="/about" className="hover:underline">About Us</a></li>
          <li><a href="/contact" className="hover:underline">Contact Us</a></li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-4">Contact</h3>
        <p className="text-sm">Email: support@landasbisnis.com</p>
        <p className="text-sm">Phone: 0812-3456-7890</p>
        <p className="text-sm">Jl. Mawar No. 1, Jakarta</p>
      </div>
    </div>

    <div className="mt-10 text-center text-sm text-gray-300">
      &copy; {new Date().getFullYear()} Landas Bisnis. All rights reserved.
    </div>
  </footer>
);

export default Footer;
