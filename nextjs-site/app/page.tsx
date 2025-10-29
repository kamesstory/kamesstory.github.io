import ContentSection from "@/components/ContentSection";
import BioLink from "@/components/BioLink";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto w-full lg:w-1/2">
        {/* Profile Image */}
        <div className="mb-8 w-[30%]">
          <div
            className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-[0_0_18px_3px_rgba(0,136,255,0.15)]"
            style={{
              animation: "breathe 8.7s ease-in-out infinite",
              animationDelay: "-4.2s",
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
              Besides working on things I love, I am a big fan of{" "}
              <BioLink href="https://abbycare.com">open water swimming</BioLink>
              {", "}
              <BioLink href="https://abbycare.com">dance</BioLink>
              {", and "}
              <BioLink href="https://abbycare.com">web serials</BioLink>
              {". "}I am also a major Google Maps stan, so if you need guides to
              any places, you can see mine{" "}
              <BioLink href="https://abbycare.com">here</BioLink>.
            </p>
            <p>
              You can find me on{" "}
              <BioLink href="https://github.com/kamesstory">Github</BioLink>
              {", "}
              <BioLink href="https://linkedin.com/in/jasonwang0">
                LinkedIn
              </BioLink>
              {", or through my "}
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
