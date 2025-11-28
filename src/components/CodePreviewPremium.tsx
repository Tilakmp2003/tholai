"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
  Terminal, Play, Maximize2, Minimize2, X, 
  FileCode, Folder, ChevronRight, ChevronDown,
  MessageSquare, User, Cpu, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const codeSnippet = `// Autonomous Agent Workflow
import { Agent, Task } from "@tholai/core";

export async function deployFeature(req: FeatureRequest) {
  // 1. Initialize Squad
  const architect = new Agent("Architect", { model: "gpt-4" });
  const dev = new Agent("Developer", { model: "claude-3" });
  
  // 2. Plan Architecture
  const plan = await architect.plan(req.description);
  console.log("Architecture plan approved");

  // 3. Generate Code
  const code = await dev.implement(plan);
  
  // 4. Verify & Deploy
  await dev.test(code);
  return await dev.deploy(code);
}`;

const chatMessages = [
  { agent: "Architect", message: "Analyzing requirements for new auth module...", delay: 0 },
  { agent: "Architect", message: "Plan created. Using JWT + OAuth2 strategy.", delay: 1500 },
  { agent: "Dev", message: "Received plan. Starting implementation.", delay: 3000 },
  { agent: "Dev", message: "Generating middleware functions...", delay: 4500 },
  { agent: "QA", message: "Test suite ready. Waiting for build.", delay: 6000 },
];

const terminalLogs = [
  { text: "> tholai init project", color: "text-green-400", delay: 500 },
  { text: "✔ Project structure created", color: "text-gray-400", delay: 1000 },
  { text: "> npm install @tholai/core", color: "text-green-400", delay: 1500 },
  { text: "✔ Dependencies installed", color: "text-gray-400", delay: 2500 },
  { text: "> tholai run agents", color: "text-green-400", delay: 3000 },
  { text: "ℹ Architect Agent connected", color: "text-blue-400", delay: 3500 },
  { text: "ℹ Developer Agent connected", color: "text-purple-400", delay: 3800 },
  { text: "✔ Build successful (420ms)", color: "text-green-400", delay: 6500 },
];

export function CodePreviewPremium() {
  const [code, setCode] = useState("");
  const [logs, setLogs] = useState<typeof terminalLogs>([]);
  const [messages, setMessages] = useState<typeof chatMessages>([]);
  const [activeTab, setActiveTab] = useState("code");

  // Typing effect for code
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= codeSnippet.length) {
        setCode(codeSnippet.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30); // Typing speed

    return () => clearInterval(interval);
  }, []);

  // Chat simulation
  useEffect(() => {
    chatMessages.forEach((msg) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
      }, msg.delay);
    });
  }, []);

  // Terminal simulation
  useEffect(() => {
    terminalLogs.forEach((log) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, log.delay);
    });
  }, []);

  return (
    <section className="py-32 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Watch Them <span className="text-primary">Work</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-time visibility into your autonomous software factory.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* IDE Window */}
          <motion.div 
            initial={{ y: 50, opacity: 0, rotateX: 10 }}
            whileInView={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden border border-white/10 bg-[#0b0c0d]/90 backdrop-blur-xl shadow-2xl shadow-black/50"
          >
            {/* Title Bar */}
            <div className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
              </div>
              <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                <Cpu className="w-3 h-3" />
                Tholai Studio
              </div>
              <div className="flex gap-4 text-gray-600">
                <Minimize2 className="w-3 h-3" />
                <Maximize2 className="w-3 h-3" />
                <X className="w-3 h-3" />
              </div>
            </div>

            <div className="flex h-[600px]">
              {/* Sidebar: Explorer & Chat */}
              <div className="w-64 border-r border-white/5 flex flex-col hidden md:flex">
                {/* Explorer */}
                <div className="flex-1 p-4">
                  <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Explorer</div>
                  <div className="space-y-2 font-mono text-sm text-gray-400">
                    <div className="flex items-center gap-2 text-white">
                      <ChevronDown className="w-3 h-3" />
                      <Folder className="w-3 h-3 text-blue-400" />
                      src
                    </div>
                    <div className="pl-6 flex items-center gap-2 bg-white/5 rounded px-2 py-1 text-primary">
                      <FileCode className="w-3 h-3" />
                      deploy.ts
                    </div>
                    <div className="pl-6 flex items-center gap-2">
                      <FileCode className="w-3 h-3" />
                      auth.ts
                    </div>
                    <div className="pl-6 flex items-center gap-2">
                      <FileCode className="w-3 h-3" />
                      utils.ts
                    </div>
                  </div>
                </div>

                {/* Agent Chat Panel */}
                <div className="h-1/2 border-t border-white/5 flex flex-col">
                  <div className="p-3 border-b border-white/5 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <MessageSquare className="w-3 h-3" />
                    Agent Chat
                  </div>
                  <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                    <AnimatePresence>
                      {messages.map((msg, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-2"
                        >
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                            msg.agent === "Architect" ? "bg-purple-500/20 text-purple-400" :
                            msg.agent === "Dev" ? "bg-green-500/20 text-green-400" :
                            "bg-yellow-500/20 text-yellow-400"
                          )}>
                            {msg.agent[0]}
                          </div>
                          <div className="flex-1">
                            <div className="text-[10px] text-gray-500 mb-0.5">{msg.agent}</div>
                            <div className="text-xs text-gray-300 leading-relaxed bg-white/5 p-2 rounded-lg rounded-tl-none">
                              {msg.message}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Main Editor Area */}
              <div className="flex-1 flex flex-col bg-[#0b0c0d]">
                {/* Tabs */}
                <div className="flex border-b border-white/5">
                  <div className="px-4 py-2 bg-[#0b0c0d] border-r border-white/5 border-t-2 border-t-primary text-sm text-white flex items-center gap-2 font-mono">
                    <FileCode className="w-3 h-3 text-blue-400" />
                    deploy.ts
                    <X className="w-3 h-3 ml-2 text-gray-600 hover:text-white cursor-pointer" />
                  </div>
                </div>

                {/* Code Editor */}
                <div className="flex-1 p-6 font-mono text-sm overflow-auto relative group">
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Dev Agent Typing...
                    </div>
                  </div>
                  <pre className="text-gray-300 leading-relaxed">
                    <code dangerouslySetInnerHTML={{ 
                      __html: code.replace(
                        /import|export|function|async|const|new|return|await/g, 
                        match => `<span class="text-purple-400">${match}</span>`
                      ).replace(
                        /".*?"/g,
                        match => `<span class="text-green-400">${match}</span>`
                      ).replace(
                        /\/\/.*$/gm,
                        match => `<span class="text-gray-500">${match}</span>`
                      )
                    }} />
                    <span className="animate-pulse inline-block w-2 h-4 bg-primary align-middle ml-1" />
                  </pre>
                </div>

                {/* Terminal Panel */}
                <div className="h-48 border-t border-white/5 bg-black/50 flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                      <span className="text-white border-b-2 border-primary pb-2 -mb-2.5">TERMINAL</span>
                      <span>OUTPUT</span>
                      <span>DEBUG CONSOLE</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      Node.js v18.16.0
                    </div>
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1">
                    {logs.map((log, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn("flex items-center gap-2", log.color)}
                      >
                        {log.text.startsWith(">") && <ChevronRight className="w-3 h-3" />}
                        {log.text}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
