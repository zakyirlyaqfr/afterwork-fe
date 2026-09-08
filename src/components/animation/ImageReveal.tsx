"use client";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ImageReveal({
  children,
  className = "",
}: ImageRevealProps) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
