/**
 * Ecran d'accueil, rendu cote serveur et anime uniquement en CSS.
 *
 * La version precedente etait un composant client : le splash n'existait pas
 * dans le HTML initial et n'apparaissait qu'une fois l'hydratation faite. Sur
 * une connexion lente, cela donnait une sequence visible a l'oeil nu, page
 * peinte, puis splash par dessus, puis page de nouveau, et repoussait le
 * Largest Contentful Paint jusqu'a la fin de l'hydratation.
 *
 * Ici le markup part avec le document et l'animation demarre des la premiere
 * peinture, sans attendre le moindre script. La disparition est portee par
 * une animation CSS, de sorte que le splash s'efface meme si le JavaScript
 * n'arrive jamais.
 *
 * Le script en tete de document pose la classe splash-seen quand l'ecran a
 * deja ete joue dans l'onglet, ce qui le masque avant la premiere peinture.
 */
export default function SplashScreen() {
  return (
    <div className="splash" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo.svg"
        alt=""
        width={120}
        height={120}
        className="splash__logo"
        fetchPriority="high"
      />
    </div>
  );
}
