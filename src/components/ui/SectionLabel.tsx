interface SectionLabelProps {
  label: string;
  index?: string;
  theme?: "dark" | "light";
  className?: string;
}

export default function SectionLabel({
  label,
  index,
  theme = "dark",
  className = "",
}: SectionLabelProps) {
  const isLight = theme === "light";

  return (
    <div
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] uppercase select-none ${
        isLight ? "text-black/70" : "text-[#F5F5F5]/60"
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#E05D29]" />
      {index && (
        <span className={isLight ? "text-black/40" : "text-[#F5F5F5]/40"}>
          {index} //
        </span>
      )}
      <span className="font-semibold">{label}</span>
    </div>
  );
}
