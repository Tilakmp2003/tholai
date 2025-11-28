import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Logo className="mb-6" />
            <p className="text-gray-400 max-w-sm">
              The first autonomous software factory. We turn requirements into production-ready code using a fleet of specialized AI agents.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-400 hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/docs" className="text-gray-400 hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href="/changelog" className="text-gray-400 hover:text-primary transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Tholai Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
