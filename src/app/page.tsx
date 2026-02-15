import Link from "next/link";
import { SystemVisualization } from "./components/SystemVisualization";
import { HeroAnimation, ParallaxText } from "./components/HeroAnimation";
import { ScrollSection, StaggerSection, FadeInOnScroll } from "./components/ScrollSection";
import { MagneticButton } from "./components/MagneticButton";
import { FloatingOrbs } from "./components/FloatingOrbs";

export default function Home() {
  const experiences = [
    {
      company: "Upwork Inc., Growth Engineering Team",
      role: "Senior Software Engineer",
      period: "2021 – Present",
      description: "Member of Upwork's Growth Engineering team, owning core Login & Registration funnels and improving onboarding conversion for millions of visitors.",
      impact: [
        "Built and optimized high-traffic SEO and paid acquisition landing pages, making it easier for clients to find & hire freelancers (and for freelancers to get discovered), contributing to a 30% increase in new user registrations.",
        "Led performance engineering initiatives (code-splitting, SSR improvements, caching strategies), significantly improving Core Web Vitals (LCP/CLS/TTI) and organic search visibility.",
        "Modernized legacy frontend systems into scalable, theme-driven architectures, adopted across multiple teams.",
        "Acted as DRI for high-visibility releases and strengthened experimentation, feature-flag, and observability infrastructure across growth surfaces impacting 8-figure ARR traffic."
      ]
    },
    {
      company: "Polyfins Technology",
      role: "Senior Software Developer",
      period: "2018 – 2021",
      description: "Architected and launched a national-scale dermatology search engine, leading a team of 5 engineers.",
      impact: [
        "Orchestrated nationwide integration with Robi Axiata, enabling frictionless subscription services for 50M+ users.",
        "Developed full-stack patient management systems, emphasizing data visualization and usability.",
        "Built and scaled React Native mobile apps to 80k+ downloads."
      ]
    },
    {
      company: "Sidera Blockchain",
      role: "Blockchain Developer",
      period: "2018",
      description: "Developed the core cryptocurrency itself using Solidity and architected critical components of the eQUOS platform.",
      impact: [
        "Developed and deployed the core cryptocurrency using Solidity, ensuring secure token logic and distribution.",
        "Launched the eQUOS cryptocurrency portal, processing KYC and platform infrastructure for 50k+ investors.",
        "Implemented secure, high-performance web services for blockchain-integrated financial applications."
      ]
    }
  ];

  const principles = [
    {
      title: "Anti-Fragility",
      description: "Engineering systems that grow stronger under pressure."
    },
    {
      title: "Product Synthesis",
      description: "Where aesthetics, performance, and business outcomes converge."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground bg-grid selection:bg-accent/10 relative overflow-x-hidden">
      <FloatingOrbs />
      <SystemVisualization />
      
      <main className="max-width-container high-padding relative z-10">
        {/* Floating Artifact 1: Neural Schematic (Background) */}
        <div className="fixed top-[20%] right-[-5%] w-96 h-96 opacity-[0.03] pointer-events-none artifact-pulse hidden lg:block">
          <svg viewBox="0 0 200 200" className="w-full h-full text-accent fill-none stroke-current stroke-[0.5]">
            <circle cx="100" cy="100" r="80" strokeDasharray="4 8" />
            <path d="M100 20 V180 M20 100 H180" strokeDasharray="2 4" />
            <circle cx="100" cy="100" r="40" />
            <rect x="60" y="60" width="80" height="80" rx="40" strokeDasharray="1 3" />
          </svg>
        </div>

        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col justify-center max-w-6xl mx-auto">
          <FadeInOnScroll>
            <header className="mb-24 relative group">
              <span className="metadata mb-6 block">Senior Software Engineer</span>
              <div>
                <HeroAnimation 
                  className="text-7xl md:text-9xl mb-8 tracking-tighter font-serif leading-none hover:tracking-[-0.03em] transition-all duration-1000"
                  enableMagnetic={true}
                >
                  Shakil Ahmed
                </HeroAnimation>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-xl md:text-2xl text-accent font-mono uppercase tracking-[0.2em]">
                  Engineering × Product × Systems Thinking
                </p>
              </div>
            </header>
          </FadeInOnScroll>

          <ScrollSection delay={0.3}>
            <ParallaxText speed={0.3}>
              <p className="text-3xl md:text-6xl leading-[1.05] font-serif text-foreground/90 mb-12 tracking-tight max-w-4xl">
                I build software that thrives on <span className="text-accent italic">volatility</span>. I architect platforms that don&apos;t just withstand stress, but improve because of it.
              </p>
            </ParallaxText>
            <div className="flex flex-col md:flex-row gap-12 items-start opacity-70">
              <p className="text-lg md:text-2xl font-mono leading-relaxed italic border-l-2 border-accent/20 pl-8 py-2">
                Senior Software Engineer at Upwork Inc. (NASDAQ: UPWK). <br />
                Launched a cryptocurrency (eQUOS) in 2018.
              </p>
            </div>
          </ScrollSection>
        </section>

        {/* Professional Narrative (Bio Layout) */}
        <section className="py-48 max-w-6xl mx-auto relative">
          <ScrollSection>
            <div className="flex items-center justify-between border-b border-border/50 pb-12 mb-32 group">
              <div className="flex items-center gap-6">
                <span className="text-accent text-sm font-mono opacity-40">[01]</span>
                <h2 className="metadata text-xl tracking-[0.4em]">Professional Bio</h2>
              </div>
            </div>
          </ScrollSection>
          
          <StaggerSection staggerDelay={0.2}>
            {experiences.map((exp, idx) => (
              <ScrollSection 
                key={idx} 
                className="relative group mb-48"
                delay={idx * 0.1}
              >
                {/* Visual Artifact: Data Stream Line */}
                <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/40 via-accent/5 to-transparent hidden md:block" />
                
                <div className="mb-12">
                  <span className="text-sm font-mono text-accent/50 block mb-4 uppercase tracking-widest">{exp.period}</span>
                  <h3 className="text-5xl md:text-8xl font-serif tracking-tight mb-4 group-hover:text-accent transition-colors duration-700">
                    {exp.company}
                  </h3>
                  <p className="text-xl md:text-3xl font-mono text-foreground/60 italic">{exp.role}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                  <div className="md:col-span-5">
                    <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-serif italic border-l border-accent/10 pl-8">
                      {exp.description}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <ul className="space-y-8">
                      {exp.impact.map((point, pIdx) => (
                        <li key={pIdx} className="group/item flex gap-6 items-start">
                          <span className="w-4 h-[1px] bg-accent/30 mt-3 group-hover/item:w-8 group-hover/item:bg-accent transition-all duration-500" />
                          <p className="text-lg text-foreground/60 leading-relaxed group-hover/item:text-foreground/90 transition-colors">
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollSection>
            ))}
          </StaggerSection>
        </section>

        {/* Core Principles */}
        <section className="py-48 max-w-6xl mx-auto relative overflow-hidden">
          {/* Background Artifact: Geometric Grid */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none -z-10 animate-pulse">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-accent stroke-[0.1]">
              <pattern id="principle-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="0.5" />
                <path d="M 10 0 L 0 0 0 10" fill="none" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#principle-grid)" />
            </svg>
          </div>

          <ScrollSection>
            <div className="flex items-center gap-6 mb-32">
              <span className="text-accent text-sm font-mono opacity-40">[02]</span>
              <h2 className="metadata text-xl tracking-[0.4em]">Governance & Logic</h2>
            </div>
          </ScrollSection>

          <ScrollSection delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/20 border border-border/20 rounded-sm overflow-hidden">
              {principles.map((principle, idx) => (
                <div key={idx} className="bg-background/40 backdrop-blur-md p-16 space-y-8 group hover:bg-accent/[0.03] transition-all duration-1000 relative">
                  {/* Interactive Scan Line for Principles */}
                  <div className="absolute top-0 left-0 w-1px h-full bg-accent/20 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
                  
                  <h3 className="text-4xl font-serif tracking-tight group-hover:translate-x-2 transition-transform duration-700">{principle.title}</h3>
                  <p className="text-lg text-foreground/60 leading-relaxed font-mono italic">
                    &quot;{principle.description}&quot;
                  </p>
                </div>
              ))}
            </div>
          </ScrollSection>
        </section>

        {/* Final Footer Artifact */}
        <footer className="py-32 mt-48 border-t border-border/20 text-center relative group overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
          
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
            <div className="flex flex-wrap justify-center gap-12 text-sm uppercase tracking-[0.3em] font-mono">
              <MagneticButton 
                href="mailto:shakilofficial7@gmail.com" 
                className="hover:text-accent transition-colors"
              >
                Email
              </MagneticButton>
              <MagneticButton 
                href="https://linkedin.com/in/theshakilahmed" 
                className="hover:text-accent transition-colors"
              >
                LinkedIn
              </MagneticButton>
              <MagneticButton 
                href="https://github.com/theshakilahmed" 
                className="hover:text-accent transition-colors"
              >
                GitHub
              </MagneticButton>
            </div>
            
            <div className="space-y-4">
              <p className="metadata opacity-40 text-[10px] tracking-[0.4em] uppercase">Built for Volatility // 2026</p>
              <p className="metadata opacity-20 text-[8px] tracking-[0.2em]">SHAKIL AHMED // ARCH_BIO_V1</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
