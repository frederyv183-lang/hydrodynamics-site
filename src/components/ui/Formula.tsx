import katex from "katex";

type FormulaProps = {
  latex: string;
  display?: boolean;
  className?: string;
};

export default function Formula({
  latex,
  display = false,
  className
}: FormulaProps) {
  const html = katex.renderToString(latex, {
    throwOnError: false,
    displayMode: display,
    strict: false,
    trust: false
  });

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
