"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from "framer-motion";
import { 
  Book, Terminal, Shield, Database, Cpu, 
  GitBranch, Activity, Lock, DollarSign, Eye,
  ChevronRight, FileText, Layout, Users, Scan, ChevronDown, 
  Binary, Network, Server, Code, Zap, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "purpose", title: "00_PURPOSE", icon: <Book className="w-4 h-4" /> },
  { id: "overview", title: "01_SYSTEM_OVERVIEW", icon: <Layout className="w-4 h-4" /> },
  { id: "hierarchy", title: "02_ORG_HIERARCHY", icon: <Users className="w-4 h-4" /> },
  { id: "components", title: "03_CORE_COMPONENTS", icon: <Cpu className="w-4 h-4" /> },
  { id: "data-model", title: "04_DATA_MODEL", icon: <Database className="w-4 h-4" /> },
  { id: "workflow", title: "05_E2E_WORKFLOW", icon: <GitBranch className="w-4 h-4" /> },
  { id: "governance", title: "06_GOVERNANCE", icon: <Shield className="w-4 h-4" /> },
];

function ScrambleText({ text, className }: { text: string, className?: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}

function ObsidianCard({ children, className, color = "blue" }: { children: React.ReactNode, className?: string, color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const mouseXPct = useTransform(x, (val) => `${val * 100}%`);
  const mouseYPct = useTransform(y, (val) => `${val * 100}%`);

  const colorMap: Record<string, string> = {
    blue: '59,130,246',
    purple: '168,85,247',
    cyan: '6,182,212',
    yellow: '234,179,8',
    red: '239,68,68',
    green: '34,197,94'
  };
  const colorRGB = colorMap[color] || '59,130,246';

  const spotlightBg = useMotionTemplate`radial-gradient(600px circle at ${mouseXPct} ${mouseYPct}, rgba(255,255,255,0.06), transparent 40%)`;
  const borderBg = useMotionTemplate`radial-gradient(400px circle at ${mouseXPct} ${mouseYPct}, rgba(${colorRGB}, 0.3), transparent 40%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    x.set(xPct);
    y.set(yPct);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0.5);
        y.set(0.5);
      }}
      className={cn(
        "relative rounded-3xl bg-[#0a0a0a] border border-white/5 p-8 group transition-all duration-500 ease-out overflow-hidden",
        className
      )}
    >
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: spotlightBg }}
      />
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: borderBg,
          maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

function CodeBlock({ code, language = "json", title }: { code: string, language?: string, title?: string }) {
  return (
    <div className="my-8 rounded-lg overflow-hidden border border-white/10 bg-[#050505] relative group">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />
      
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 group-hover:bg-red-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 group-hover:bg-yellow-500 transition-colors" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 group-hover:bg-green-500 transition-colors" />
          </div>
          <span className="text-xs font-mono text-blue-400/80">{title || "TERMINAL_OUTPUT"}</span>
        </div>
        <div className="text-xs font-mono text-gray-600 flex items-center gap-2">
          <Binary className="w-3 h-3" />
          {language.toUpperCase()}
        </div>
      </div>
      
      <div className="p-6 overflow-x-auto relative">
        <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        <pre className="font-mono text-xs md:text-sm leading-relaxed text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function SectionHeading({ title, id }: { title: string, id: string }) {
  return (
    <div id={id} className="scroll-mt-40 md:scroll-mt-32 mb-12 pt-12 border-t border-white/5 first:border-0 first:pt-0">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight uppercase font-mono">
          <ScrambleText text={title} />
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent" />
      </div>
    </div>
  );
}

export function DocsViewer() {
  const [activeSection, setActiveSection] = useState("purpose");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 300;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-blue-500/30 relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_100%)] pointer-events-none z-0" />
      
      {/* Moving Data Streams */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-marquee" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-marquee animation-delay-2000" />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4 pt-48 lg:pt-32 flex items-start gap-16 relative z-10">
        
        {/* Mobile Navigation Bar */}
        <div className="lg:hidden fixed top-20 left-0 right-0 z-50 px-4 py-2 bg-black/80 backdrop-blur-xl border-b border-white/10">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between p-3 rounded bg-white/5 border border-white/10 text-xs font-mono text-blue-400"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3 h-3" />
              <span>SYSTEM_INDEX // {SECTIONS.find(s => s.id === activeSection)?.title}</span>
            </div>
            <ChevronDown className={cn("w-3 h-3 transition-transform", isMobileMenuOpen ? "rotate-180" : "")} />
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden bg-[#050505] border-x border-b border-white/10 rounded-b-lg absolute left-4 right-4 shadow-2xl shadow-black/90"
              >
                <div className="p-2 space-y-1">
                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setTimeout(() => scrollToSection(section.id), 100);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded flex items-center gap-3 text-xs font-mono transition-colors",
                        activeSection === section.id 
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                          : "text-gray-500 hover:bg-white/5 hover:text-gray-300"
                      )}
                    >
                      <span className={cn("opacity-50", activeSection === section.id && "opacity-100")}>
                        {section.icon}
                      </span>
                      {section.title}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Navigation (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto pr-4 border-r border-white/5 no-scrollbar">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-blue-500/50">
              <Terminal className="w-3 h-3" />
              <span>SYSTEM_INDEX</span>
            </div>
            <nav className="space-y-1">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-sm text-xs font-mono transition-all flex items-center gap-3 border-l-2 group relative overflow-hidden",
                    activeSection === section.id
                      ? "bg-blue-500/5 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                      : "border-transparent text-gray-600 hover:text-gray-300 hover:bg-white/5"
                  )}
                >
                  <span className={cn("opacity-50 transition-opacity", activeSection === section.id && "opacity-100")}>
                    {section.icon}
                  </span>
                  <span className="relative z-10">{section.title}</span>
                  
                  {/* Hover Scan Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-4 rounded bg-white/5 border border-white/10 font-mono text-[10px] text-gray-500 space-y-2">
            <div className="flex justify-between">
              <span>STATUS</span>
              <span className="text-green-500 animate-pulse">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span>ENCRYPTION</span>
              <span className="text-blue-500">AES-256</span>
            </div>
            <div className="flex justify-between">
              <span>LATENCY</span>
              <span className="text-yellow-500">12ms</span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="text-center opacity-50">
              // RESTRICTED ACCESS //
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl w-full min-w-0">
          {/* Hero Header */}
          <div className="mb-24 relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6 animate-pulse">
              <Scan className="w-3 h-3" />
              CLASSIFIED_DOCUMENT_V1.0
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-none">
              <div className="mb-2">Virtual Software</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                <ScrambleText text="COMPANY" />
              </div>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl border-l-2 border-blue-500/30 pl-6">
              System Architecture & End-to-End Workflow for an autonomous, hierarchical multi-agent platform.
            </p>
          </div>

          {/* 0. Purpose */}
          <SectionHeading id="purpose" title="00_PURPOSE" />
          <div className="prose prose-invert max-w-none text-gray-400">
            <p className="text-lg leading-relaxed">
              This document describes, in <strong>industrial-standard detail</strong>, the complete architecture and working flow of the <strong>Virtual Software Company</strong> — an AI-driven, hierarchical multi-agent platform that behaves like a real IT services firm.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              {[
                "System goals & positioning",
                "Organizational hierarchy (roles & responsibilities)",
                "Core system components (Orchestrator, DB, Agent runtime)",
                "Data model (ContextPackets, Tasks, Metrics, Traces)",
                "Step-by-step workflows (Request → Delivery)",
                "Safety, cost control, and optimization mechanisms"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <span className="text-sm font-mono text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-lg bg-blue-950/20 border border-blue-500/20 flex gap-4 items-start">
              <Terminal className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
              <div>
                <strong className="text-blue-400 block mb-1 font-mono text-sm">TARGET AUDIENCE: CTO / SENIOR ENGINEER</strong>
                <p className="text-sm text-blue-200/70">This specification is written for immediate implementation readiness.</p>
              </div>
            </div>
          </div>

          {/* 1. System Overview */}
          <SectionHeading id="overview" title="01_SYSTEM_OVERVIEW" />
          <div className="space-y-8">
            <ObsidianCard color="purple">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Network className="w-5 h-5 text-purple-400" />
                What Is the Virtual Software Company?
              </h3>
              <p className="text-gray-400 mb-6">
                A <strong>Multi-Agent System (MAS)</strong> that simulates a real-world software engineering organization. It uses LLM agents as "employees" and is governed by strict hierarchy, policies, and metrics.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-black/40 rounded border border-white/10 text-center group-hover:border-purple-500/30 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">95%</div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Automation</div>
                </div>
                <div className="p-3 bg-black/40 rounded border border-white/10 text-center group-hover:border-purple-500/30 transition-colors">
                  <div className="text-2xl font-bold text-white mb-1">5%</div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase">Human Oversight</div>
                </div>
              </div>
            </ObsidianCard>

            <div>
              <h3 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-widest">Core Design Principles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Hierarchy over Chaos", desc: "Clear chain of command; no free-for-all chats.", icon: <GitBranch /> },
                  { title: "Context via Packets", desc: "Structured JSON ContextPackets, not unstructured prompts.", icon: <FileText /> },
                  { title: "Governance", desc: "Agents monitored, scored, and terminated based on performance.", icon: <Shield /> },
                  { title: "Economic Efficiency", desc: "Serverless runtimes and elastic hierarchy routing.", icon: <DollarSign /> },
                  { title: "Traceability", desc: "Every decision recorded for full auditability.", icon: <Eye /> },
                  { title: "Human in the Loop", desc: "AI automates bulk; humans handle research.", icon: <Users /> }
                ].map((principle, i) => (
                  <div key={i} className="p-4 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-blue-400 group-hover:scale-110 transition-transform">{principle.icon}</div>
                      <div className="font-bold text-white text-sm">{principle.title}</div>
                    </div>
                    <div className="text-xs text-gray-500 pl-9">{principle.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Org Hierarchy */}
          <SectionHeading id="hierarchy" title="02_ORG_HIERARCHY" />
          <div className="space-y-8">
            <div className="relative border-l border-white/10 pl-4 md:pl-8 space-y-12">
              {[
                { level: "L4", title: "EXECUTIVE", roles: ["CEO Agent", "CTO Agent"], color: "purple", desc: "Strategic goals, Architecture standards" },
                { level: "L3", title: "MANAGEMENT", roles: ["Product Manager", "Team Lead"], color: "blue", desc: "PRDs, Task decomposition, Quality ownership" },
                { level: "L2", title: "SENIOR ENG", roles: ["Architect", "Senior Dev"], color: "cyan", desc: "System design, Complex features" },
                { level: "L1", title: "EXECUTION", roles: ["Mid-Level Dev", "Junior Dev"], color: "green", desc: "Feature implementation, Bug fixes" },
                { level: "L0", title: "SUPPORT", roles: ["QA Engineer", "Security Analyst", "DevOps"], color: "yellow", desc: "Validation, Vulnerability scanning, CI/CD" }
              ].map((tier, i) => (
                <div key={i} className="relative group">
                  <div className={`absolute -left-[37px] top-0 w-4 h-4 rounded-full border-2 border-[#020202] bg-${tier.color}-500 shadow-[0_0_10px_var(--tw-shadow-color)] shadow-${tier.color}-500/50`} />
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className={`text-${tier.color}-400 font-mono font-bold text-sm tracking-widest`}>{tier.level} // {tier.title}</div>
                    <div className="h-px flex-1 bg-white/10 group-hover:bg-white/20 transition-colors" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tier.roles.map((role, j) => (
                      <div key={j} className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-300">{role}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-gray-500 font-mono pl-1">// {tier.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Core Components */}
          <SectionHeading id="components" title="03_CORE_COMPONENTS" />
          <div className="grid grid-cols-1 gap-4">
            {[
              { 
                title: "Orchestrator Service", 
                icon: <Activity />,
                id: "ORCH-01",
                desc: "The brain that reads from DB, assigns work, runs Dispatch/Governance loops, and manages agent lifecycle." 
              },
              { 
                title: "Agent Runtime (Serverless)", 
                icon: <Server />,
                id: "RUN-02",
                desc: "Ephemeral runtimes (Firecracker/Lambda). Agents are definitions in DB, hydrated only when needed." 
              },
              { 
                title: "Data Layer", 
                icon: <Database />,
                id: "DATA-03",
                desc: "PostgreSQL for relational data (Tasks, Metrics) + Vector Store for knowledge base (PRDs, Docs)." 
              },
              { 
                title: "AgentOps & Observability", 
                icon: <Eye />,
                id: "OBS-04",
                desc: "Trace IDs track reasoning chains. Used for debugging, blame analysis, and Traceability Insurance." 
              }
            ].map((comp, i) => (
              <ObsidianCard key={i} className="flex gap-6 p-6 hover:bg-white/5 transition-colors group">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 rounded bg-black border border-white/10 text-blue-400 group-hover:text-blue-300 transition-colors">
                    {comp.icon}
                  </div>
                  <div className="text-[10px] font-mono text-gray-600">{comp.id}</div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{comp.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{comp.desc}</p>
                </div>
              </ObsidianCard>
            ))}
          </div>

          {/* 4. Data Model */}
          <SectionHeading id="data-model" title="04_DATA_MODEL" />
          <p className="text-gray-400 mb-6">
            Work is assigned through structured <strong>ContextPackets</strong>, not unstructured prompts. This ensures clarity and reduces hallucinations.
          </p>
          
          <CodeBlock 
            title="CONTEXT_PACKET_SCHEMA.JSON"
            code={`{
  "schema_version": "1.0",
  "packet_id": "ctx_849201",
  "trace_id": "trace_7b12f9",
  "timestamp": "2025-11-23T14:00:00Z",
  "hierarchy": {
    "project_id": "PROJ-001",
    "module_id": "AUTH-001",
    "assigned_agent_id": "MidDev-Agent-12",
    "assigned_agent_role": "MidDev"
  },
  "task_definition": {
    "task_id": "TASK-LOGIN-API-03",
    "summary": "Implement POST /login endpoint with Redis-backed session",
    "priority": "HIGH",
    "task_type": "FEATURE",
    "acceptance_criteria": [
      "POST /login with email+password",
      "401 on invalid credentials",
      "Session stored in Redis",
      "Latency < 200ms under normal load"
    ],
    "requirements_links": [
      "vector://prds/PRD_AUTH#REQ-102"
    ]
  },
  "technical_context": {
    "tech_stack": ["Node.js", "Express", "Redis", "PostgreSQL"],
    "constraints": [
      "Use 'app_users' table from schema v2",
      "Passwords hashed using bcrypt",
      "Do not modify auth middleware"
    ]
  }
}`} />

          {/* 5. Workflow */}
          <SectionHeading id="workflow" title="05_E2E_WORKFLOW" />
          <div className="space-y-4">
            {[
              {
                phase: "PHASE 00",
                title: "Client Intake",
                desc: "Human submits request. Socratic Interrogator forces clarity via Q&A loop until ambiguity score < threshold."
              },
              {
                phase: "PHASE 01",
                title: "PRD & Setup",
                desc: "PM Agent generates PRD with REQ-IDs. CTO defines tech stack. Orchestrator initializes DB."
              },
              {
                phase: "PHASE 02",
                title: "Architecture",
                desc: "Architect designs API/Schema. Team Lead decomposes into modules and tasks."
              },
              {
                phase: "PHASE 03",
                title: "Fast-Track Routing",
                desc: "Complexity score determines path. Simple tasks -> Junior Dev. Critical -> Senior."
              },
              {
                phase: "PHASE 04",
                title: "Canary Validation",
                desc: "Canary Agent probes external APIs (Stripe, Twilio) to update context with ground truth."
              },
              {
                phase: "PHASE 05",
                title: "Execution",
                desc: "Dispatch loop assigns tasks. Dev Agent writes code. QA/Security Agents review."
              },
              {
                phase: "PHASE 06",
                title: "War Room",
                desc: "If retry_count > threshold, Orchestrator spawns sync session for Dev+QA+Lead to resolve deadlocks."
              },
              {
                phase: "PHASE 07",
                title: "Delivery",
                desc: "Final approval. Traceability Certificate generated. Deployment to production."
              }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 p-4 rounded border border-white/5 hover:bg-white/5 transition-colors group">
                <div className="flex flex-col items-center gap-2 pt-1">
                  <div className="text-[10px] font-mono text-blue-500 font-bold">{step.phase}</div>
                  <div className="w-px h-full bg-white/10 group-hover:bg-blue-500/50 transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 6. Governance */}
          <SectionHeading id="governance" title="06_GOVERNANCE" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ObsidianCard color="green">
              <DollarSign className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Cost Control</h3>
              <p className="text-sm text-gray-400">Elastic hierarchy and serverless runtimes prevent waste. Budget caps enforce limits.</p>
            </ObsidianCard>
            
            <ObsidianCard color="blue">
              <Lock className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Reliability</h3>
              <p className="text-sm text-gray-400">Double reviews (Lead + QA), War Room for deadlocks, and Canary probing.</p>
            </ObsidianCard>
            
            <ObsidianCard color="purple">
              <Shield className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Compliance</h3>
              <p className="text-sm text-gray-400">Full audit trail via AgentOps. Traceability Certificates for every delivery.</p>
            </ObsidianCard>
          </div>

        </main>
      </div>
    </div>
  );
}
