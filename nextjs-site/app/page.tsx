import ContentSection from "@/components/ContentSection";
import BioLink from "@/components/BioLink";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-6">
      <div className="max-w-2xl mx-auto w-full lg:w-1/2">
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
