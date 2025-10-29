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
      className="inline relative whitespace-nowrap"
    >
      {children}
      <span className="text-xs ml-1">↗</span>
    </a>
  );
}
