import type { ReactNode } from "react";
import "./LegalDocument.css";

export interface LegalDocumentSection {
  title: string;
  paragraphs: ReactNode[];
}

export default function LegalDocument({
  title,
  sections,
}: {
  title: string;
  sections: LegalDocumentSection[];
}) {
  return (
    <article className="legal-document">
      <header className="legal-document__header">
        <h1>{title}</h1>
      </header>
      <div className="legal-document__content">
        {sections.map((section, index) => (
          <section
            key={`${index}-${section.title}`}
            aria-labelledby={`legal-section-${index}`}
          >
            <h2 id={`legal-section-${index}`}>{section.title}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              typeof paragraph === "string" ? (
                <p key={paragraphIndex}>{paragraph}</p>
              ) : (
                <div key={paragraphIndex}>{paragraph}</div>
              )
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
