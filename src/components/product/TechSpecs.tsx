"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import "./ProductPage.css";

const specs = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Go", "Rust", "Java", "C++", "PHP", "Ruby"]
  },
  {
    category: "Frameworks",
    items: ["Next.js", "React", "Vue", "Django", "FastAPI", "Spring Boot", "Laravel", "Rails"]
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Supabase", "Firebase"]
  },
  {
    category: "Deployment",
    items: ["Vercel", "AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Netlify"]
  }
];

export function TechSpecs() {
  return (
    <section className="product-section">
      <div className="product-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="product-label">Specifications</span>
            <h2 className="product-heading">Universal Compatibility</h2>
            <p className="product-subheading mb-8">
              Tholai integrates seamlessly with your existing stack. No proprietary lock-in. 
              Just pure, standard code.
            </p>
            
            <div className="industrial-card bg-blue-500/5 border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Enterprise Grade Security</h3>
              <ul className="space-y-3">
                {["SOC2 Type II Compliant", "End-to-End Encryption", "Private VPC Deployment", "Role-Based Access Control"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {specs.map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="industrial-card"
              >
                <h4 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">
                  {spec.category}
                </h4>
                <ul className="space-y-2">
                  {spec.items.map((item, i) => (
                    <li key={i} className="text-gray-400 text-sm font-mono flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
