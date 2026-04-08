import Link from "next/link";
import { HeroAnimation, ParallaxText } from "./components/HeroAnimation";
import { ScrollSection, StaggerSection, FadeInOnScroll } from "./components/ScrollSection";
import { MagneticButton } from "./components/MagneticButton";

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
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/10 relative overflow-x-hidden">
      <main className="max-width-container px-6 md:px-12 lg:px-24 xl:px-32 relative z-10">
        {/* Hero Section */}
        <section className="min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center max-w-5xl mx-auto pt-20">
          <FadeInOnScroll>
            <header className="mb-24 relative group">
              <span className="metadata mb-4 md:mb-6 block font-sans tracking-widest text-[10px] md:text-xs">Senior Software Engineer</span>
              <div>
                <HeroAnimation 
                  className="text-5xl sm:text-7xl md:text-9xl mb-6 md:mb-8 tracking-tighter font-sans font-semibold leading-none"
                  enableMagnetic={false}
                >
                  Shakil Ahmed
                </HeroAnimation>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-4 md:mt-0">
                <p className="text-sm sm:text-base md:text-xl text-accent font-sans font-medium uppercase tracking-[0.15em] md:tracking-[0.2em]">
                  Engineering × Product × Systems Thinking
                </p>
              </div>
            </header>
          </FadeInOnScroll>

          <ScrollSection delay={0.3}>
            <ParallaxText speed={0.1}>
              <p className="text-2xl sm:text-3xl md:text-5xl leading-[1.15] font-sans font-medium text-foreground/90 mb-8 md:mb-12 tracking-tight max-w-4xl">
                I build software that thrives on <span className="text-accent">volatility</span>. I architect platforms that don&apos;t just withstand stress, but improve because of it.
              </p>
            </ParallaxText>
            <div className="flex flex-col gap-6 items-start opacity-70">
              <p className="text-base sm:text-lg md:text-xl font-sans font-light leading-relaxed border-l-2 border-accent/20 pl-6 py-1">
                Senior Software Engineer at Upwork Inc. (NASDAQ: UPWK). <br />
                Launched a cryptocurrency (eQUOS) in 2018.
              </p>
            </div>
          </ScrollSection>
        </section>

        {/* Professional Narrative (Bio Layout) */}
        <section className="py-24 md:py-48 max-w-5xl mx-auto relative">
          <ScrollSection>
            <div className="flex items-center justify-between border-b border-border/30 pb-8 md:pb-12 mb-16 md:mb-32 group">
              <div className="flex items-center gap-4 md:gap-6">
                <span className="text-accent text-xs md:text-sm font-sans font-medium opacity-40">[01]</span>
                <h2 className="metadata text-base md:text-xl font-sans tracking-[0.15em] md:tracking-[0.2em] uppercase">Professional Bio</h2>
              </div>
            </div>
          </ScrollSection>
          
          <StaggerSection staggerDelay={0.2}>
            {experiences.map((exp, idx) => (
              <ScrollSection 
                key={idx} 
                className="relative group mb-32 md:mb-48"
                delay={idx * 0.1}
              >
                <div className="mb-8 md:mb-12">
                  <span className="text-[10px] md:text-xs font-sans font-medium text-accent/60 block mb-3 md:mb-4 uppercase tracking-widest">{exp.period}</span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-sans font-semibold tracking-tight mb-3 md:mb-4 text-foreground/90 transition-colors duration-200">
                    {exp.company}
                  </h3>
                  <p className="text-lg sm:text-xl md:text-2xl font-sans font-light text-foreground/60">{exp.role}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                  <div className="md:col-span-5">
                    <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 leading-relaxed font-sans font-light md:border-l md:border-accent/10 md:pl-8">
                      {exp.description}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <ul className="space-y-6 md:space-y-8">
                      {exp.impact.map((point, pIdx) => (
                        <li key={pIdx} className="group/item flex gap-4 md:gap-6 items-start">
                          <span className="w-2 md:w-4 h-[1px] bg-accent/30 mt-2.5 md:mt-3 shrink-0" />
                          <p className="text-base sm:text-lg font-sans font-light text-foreground/70 leading-relaxed group-hover/item:text-foreground/90 transition-colors">
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
        <section className="py-24 md:py-48 max-w-5xl mx-auto relative overflow-hidden">
          <ScrollSection>
            <div className="flex items-center gap-4 md:gap-6 mb-16 md:mb-32">
              <span className="text-accent text-xs md:text-sm font-sans font-medium opacity-40">[02]</span>
              <h2 className="metadata text-base md:text-xl font-sans tracking-[0.15em] md:tracking-[0.2em] uppercase">Governance & Logic</h2>
            </div>
          </ScrollSection>

          <ScrollSection delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-px md:bg-border/20 md:border md:border-border/20 md:rounded-sm overflow-hidden">
              {principles.map((principle, idx) => (
                <div key={idx} className="bg-background/50 md:bg-background p-8 md:p-16 space-y-4 md:space-y-8 group hover:bg-black/[0.02] transition-all duration-300 border border-border/20 md:border-none rounded-lg md:rounded-none">
                  <h3 className="text-2xl md:text-3xl font-sans font-medium tracking-tight text-foreground/90">{principle.title}</h3>
                  <p className="text-base md:text-lg text-foreground/60 leading-relaxed font-sans font-light">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollSection>
        </section>

        {/* Final Footer Artifact */}
        <footer className="py-24 md:py-32 mt-24 md:mt-48 border-t border-border/20 text-center relative group overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 md:gap-12">
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-12 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-sans font-medium">
              <MagneticButton 
                href="mailto:shakilofficial7@gmail.com" 
                className="hover:text-accent transition-colors"
              >
                Email
              </MagneticButton>
              <MagneticButton 
                href="https://www.linkedin.com/in/iamshakilahmed/" 
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
              <p className="metadata opacity-40 text-[10px] tracking-[0.2em] font-sans uppercase">Software Engineering & Product</p>
              <p className="metadata opacity-20 text-[8px] tracking-[0.1em] font-sans">&copy; {new Date().getFullYear()} Shakil Ahmed</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
