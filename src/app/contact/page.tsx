import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageSquare, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center pt-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-12">
          Have questions about Tholai? We'd love to hear from you.
        </p>
        
        <div className="grid gap-6 md:grid-cols-3 w-full max-w-4xl mb-20">
          <div className="p-8 border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Email Us</h3>
            <p className="text-gray-400 text-sm">tilak@tholai.xyz</p>
          </div>
          
          <div className="p-8 border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Support</h3>
            <p className="text-gray-400 text-sm">contact@tholai.xyz</p>
          </div>
          
          <div className="p-8 border border-white/10 rounded-2xl bg-white/5 flex flex-col items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg">Visit Us</h3>
            <p className="text-gray-400 text-sm">San Francisco, CA</p>
          </div>
        </div>

        {/* Visual Contact Form */}
        <div className="w-full max-w-2xl p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 text-left">Send us a message</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <label className="text-xs text-gray-500 uppercase font-mono">Name</label>
                <div className="h-12 w-full bg-black/50 border border-white/10 rounded-xl" />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs text-gray-500 uppercase font-mono">Email</label>
                <div className="h-12 w-full bg-black/50 border border-white/10 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-xs text-gray-500 uppercase font-mono">Message</label>
              <div className="h-32 w-full bg-black/50 border border-white/10 rounded-xl" />
            </div>
            <div className="pt-4 flex justify-end">
              <div className="px-6 py-3 bg-blue-600 rounded-full text-sm font-semibold opacity-50 cursor-not-allowed">
                Send Message
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
