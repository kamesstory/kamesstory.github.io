import ContentSection from "@/components/ContentSection";
import BioLink from "@/components/BioLink";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto w-full lg:w-1/2">
        {/* Profile Image */}
        <div className="mb-8 w-[30%] relative">
          <div
            className="overflow-hidden shadow-lg relative"
            style={{
              animation: "breathe 8s ease-in-out infinite",
            }}
          >
            <Image
              src="/jason-swim-photo-trimmed.png"
              alt="Jason swimming"
              width={300}
              height={300}
              className="w-full"
              priority
            />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/40"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/40"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/40"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/40"></div>
          </div>
        </div>

        {/* Intro Section */}
        <div className="mb-12">
          <h1 className="text-3xl font-display font-bold mb-6 text-foreground tracking-tight">
            Hi, I'm Jason.
          </h1>
          <div className="space-y-4 text-foreground text-base">
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
            title="A Thing I've Worked On"
            sectionType="projects"
          />
          <ContentSection
            title="A Thing I Love Doing"
            sectionType="specialities"
          />
          <ContentSection title="A Thought I've Had" sectionType="thoughts" />
        </div>
      </div>
    </main>
  );
}
