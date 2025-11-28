"use client";

import { motion } from "framer-motion";

export function CodePreview() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Watch them work in <br />
              <span className="text-accent">real-time.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Tholai provides full visibility into the agent's thought process. Watch as they plan, write code, run tests, and fix bugs right before your eyes.
            </p>
            <ul className="space-y-4">
              {[
                "Live terminal streaming",
                "File system explorer",
                "Diff view for changes",
                "One-click rollback",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden border border-white/10 bg-[#0D0D0D] shadow-2xl shadow-primary/10"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="ml-4 text-xs text-gray-500 font-mono">agent-terminal — zsh</div>
              </div>
              <div className="p-6 font-mono text-sm h-[300px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]/90 z-10" />
                <div className="space-y-2">
                  <div className="text-gray-400">$ tholai plan "Implement user authentication"</div>
                  <div className="text-blue-400">➜ Planning phase started...</div>
                  <div className="text-gray-500">  • Analyzing requirements...</div>
                  <div className="text-gray-500">  • Checking database schema...</div>
                  <div className="text-green-400">✔ Plan approved. Starting execution.</div>
                  <div className="text-gray-400">$ tholai generate src/auth/service.ts</div>
                  <div className="text-gray-300">  Writing code to src/auth/service.ts...</div>
                  <div className="text-gray-400">$ npm test</div>
                  <div className="text-red-400">✖ Tests failed: 1 error found</div>
                  <div className="text-yellow-400">➜ Attempting self-repair...</div>
                  <div className="text-gray-300">  Reading error logs...</div>
                  <div className="text-gray-300">  Applying patch...</div>
                  <div className="text-green-400">✔ Tests passed!</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
