import { getTranslations } from "next-intl/server";
import { Home, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section
      aria-labelledby="not-found-title"
      style={{
        minHeight: "calc(100vh - 64px - 28rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "44rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          aria-hidden="true"
          style={{
            margin: 0,
            color: "var(--color-accent)",
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(8rem, 24vw, 16rem)",
            fontWeight: 700,
            lineHeight: 0.8,
            letterSpacing: "-0.08em",
          }}
        >
          Oups, 404
        </p>
        <h1
          id="not-found-title"
          style={{
            margin: "2rem 0 0",
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          {t("title")}
        </h1>
        <p
          style={{
            maxWidth: "34rem",
            margin: "1rem 0 0",
            color: "var(--color-text-muted)",
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
          }}
        >
          {t("description")}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0.75rem",
            marginTop: "2rem",
          }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.8rem 1.25rem",
              color: "#ffffff",
              background: "linear-gradient(135deg, #0CACE8 0%, #1C71AA 100%)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(12, 172, 232, 0.25)",
            }}
          >
            <Home size={18} aria-hidden="true" />
            {t("home")}
          </Link>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.8rem 1.25rem",
              color: "var(--color-accent)",
              backgroundColor: "transparent",
              border: "1px solid var(--color-accent)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <Mail size={18} aria-hidden="true" />
            {t("contact")}
          </Link>
        </div>
      </div>
    </section>
  );
}
