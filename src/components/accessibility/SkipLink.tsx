import React from 'react';

interface SkipLinkProps {
  targetId: string;
  children?: React.ReactNode;
}

export function SkipLink({ targetId, children = 'Skip to main content' }: SkipLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
