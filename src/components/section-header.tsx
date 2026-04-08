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
    <div className="mb-12 max-w-3xl">
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-white/65 md:text-lg">
        {description}
      </p>
    </div>
  );
}