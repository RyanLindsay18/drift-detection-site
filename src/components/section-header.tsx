type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="mb-12 max-w-2xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl" style={{letterSpacing: '-0.04em'}}>
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-white/50 md:text-lg">
        {description}
      </p>
    </div>
  );
}