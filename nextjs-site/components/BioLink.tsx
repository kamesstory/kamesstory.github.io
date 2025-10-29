"use client";

import { useState } from "react";

type BioLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
};

export default function BioLink({
  href,
  children,
  external = true,
}: BioLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1"
    >
      <span>{children}</span>
      <span
        className={`text-accent transition-opacity duration-200 text-xs ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        ↗
      </span>
    </a>
  );
}
