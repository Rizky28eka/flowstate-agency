import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base sm:text-lg">A</span>
              </div>
              <span className="text-lg sm:text-xl font-bold">AgencyFlow</span>
            </div>
            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6">
              The all-in-one platform for creative agencies to manage projects, clients, and teams.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h4>
            <ul className="space-y-2 text-sm sm:text-base text-white/80">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 text-sm sm:text-base text-white/80">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
            <ul className="space-y-2 text-sm sm:text-base text-white/80">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Status</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-xs sm:text-sm text-center md:text-left">
            © 2024 AgencyFlow. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;