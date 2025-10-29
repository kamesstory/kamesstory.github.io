import ContentSection from "@/components/ContentSection";
import { getRandomContent } from "@/lib/content";

export default function Home() {
  // Get random content for each section
  const project = getRandomContent("projects");
  const activity = getRandomContent("activities");
  const thought = getRandomContent("thoughts");

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
              <a
                href="https://abbycare.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                AbbyCare
              </a>
              , building a tech-enabled healthcare agency for low-income
              families. Previously, I cofounded{" "}
              <a
                href="https://cohere.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cohere
              </a>{" "}
              (YC S20), which was recently{" "}
              <a
                href="https://ramp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                acquired by Ramp
              </a>
              .
            </p>
            <p>
              You can find me on{" "}
              <a
                href="https://github.com/kamesstory"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
              ,{" "}
              <a
                href="https://linkedin.com/in/jasonwang0"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              , or through my <a href="mailto:jason@jasonwa.ng">email</a>.
            </p>
          </div>
        </div>

        {/* Dynamic Content Sections */}
        <div className="space-y-8 mt-16">
          {project && (
            <ContentSection
              title="A Thing I've Built"
              content={`${project.title}. ${project.content}`}
              href="/projects"
            />
          )}

          {activity && (
            <ContentSection
              title="A Thing I Do"
              content={`${activity.title}. ${activity.content}`}
              href="/activities"
            />
          )}

          {thought && (
            <ContentSection
              title="A Thought I've Had"
              content={`${thought.title}. ${thought.content}`}
              href="/thoughts"
            />
          )}
        </div>
      </div>
    </main>
  );
}
