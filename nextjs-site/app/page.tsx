import ContentSection from "@/components/ContentSection";
import BioLink from "@/components/BioLink";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto w-full lg:w-1/2">
        {/* Profile Image */}
        <div className="mb-8 w-[30%]">
          <div className="cursor-pointer overflow-hidden bg-background">
            {/* Terminal Window Titlebar */}
            <div className="bg-muted/40 px-2 py-1 flex items-center gap-2 border-b border-accent/20">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-secondary/60"></div>
                <div className="w-2 h-2 rounded-full bg-warning/60"></div>
                <div className="w-2 h-2 rounded-full bg-tertiary/60"></div>
              </div>
              <span className="text-[8px] text-foreground/60 font-mono">
                jason@swim:~$
              </span>
            </div>
            {/* Image Content */}
            <div className="p-1 relative group">
              <div className="relative overflow-hidden">
                <Image
                  src="/jason-swim-photo-trimmed.png"
                  alt="Jason swimming"
                  width={300}
                  height={300}
                  className="w-full transition-all duration-300"
                  style={{
                    filter: "grayscale(0.7) brightness(0.9) contrast(1.1)",
                  }}
                  priority
                />
                <Image
                  src="/jason-swim-photo-trimmed.png"
                  alt="Jason swimming"
                  width={300}
                  height={300}
                  className="w-full absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-background opacity-30 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Intro Section */}
        <div className="mb-12">
          <h1 className="text-2xl font-mono font-bold mb-6 text-foreground">
            Hi, I'm Jason.
          </h1>
          <div className="space-y-4 text-foreground">
            <p>
              I'm currently Founding Engineer at{" "}
              <BioLink href="https://abbycare.com">AbbyCare</BioLink>, building
              a tech-enabled healthcare agency for low-income families.
              Previously, I cofounded{" "}
              <BioLink href="https://cohere.com">Cohere</BioLink> (YC S20),
              which was recently{" "}
              <BioLink href="https://ramp.com">acquired by Ramp</BioLink>.
            </p>
            <p>
              You can find me on{" "}
              <BioLink href="https://github.com/kamesstory">Github</BioLink>,{" "}
              <BioLink href="https://linkedin.com/in/jasonwang0">
                LinkedIn
              </BioLink>
              , or through my{" "}
              <BioLink href="mailto:jason@jasonwa.ng" external={false}>
                email
              </BioLink>
              .
            </p>
          </div>
        </div>

        {/* Dynamic Content Sections */}
        <div className="space-y-8 mt-16">
          <ContentSection
            title="A Thing I've Built"
            sectionType="projects"
            href="/projects"
          />
          <ContentSection
            title="A Thing I Do"
            sectionType="activities"
            href="/activities"
          />
          <ContentSection
            title="A Thought I've Had"
            sectionType="thoughts"
            href="/thoughts"
          />
        </div>
      </div>
    </main>
  );
}
