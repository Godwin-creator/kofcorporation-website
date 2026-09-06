import "./Partners.css";

interface Partner {
  id: string;
  name: string;
  logo: string;
}

const PARTNERS: Partner[] = [
  {
    id: "aiesec",
    name: "AIESEC",
    logo: "/images/partners/aiesec.png",
  },
  {
    id: "jhpiego",
    name: "Jhpiego",
    logo: "/images/partners/jhpiego.png",
  },
  {
    id: "undp",
    name: "UNDP",
    logo: "/images/partners/undp.png",
  },
  {
    id: "samanvoyage",
    name: "SamanVoyage",
    logo: "/images/partners/samanvoyage.png",
  },
  {
    id: "golden-group",
    name: "Golden Group Technologies",
    logo: "/images/partners/goldengroup.png",
  },
  {
    id: "giz",
    name: "GIZ",
    logo: "/images/partners/giz.png",
  },
];

export default function Partners() {
  const marqueeItems = [...PARTNERS, ...PARTNERS];

  return (
    <section className="partners" aria-label="Nos partenaires et clients">
      <div className="partners__inner">
        <h2 className="partners__title">Ils nous font confiance</h2>

        <div className="partners__marquee-wrapper">
          <div className="partners__marquee-track">
            {marqueeItems.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="partner-logo-frame"
                aria-hidden={index >= PARTNERS.length}
              >
                <img
                  className="partner-logo"
                  src={partner.logo}
                  alt={index < PARTNERS.length ? partner.name : ""}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
