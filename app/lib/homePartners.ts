/**
 * Public-facing partner logos for the home marquee.
 * Mirrors the partner portal directory (partners with logos + public websites),
 * excluding internal hubs (big-five-group, general) and entries without a logo.
 */

export type HomePartner = {
  name: string;
  logo: string;
  href: string;
  /** Wider wordmarks vs square crests */
  wide?: boolean;
};

/**
 * Order follows the partner portal registry (visible directory partners with logos).
 */
export const HOME_PARTNERS: HomePartner[] = [
  {
    name: "Department of Basic Education",
    logo: "/partners/department-of-basic-education-logo.webp",
    href: "https://www.education.gov.za/",
  },
  {
    name: "Department of Health",
    logo: "/partners/department-of-health-logo.jpg",
    href: "https://www.health.gov.za/",
  },
  {
    name: "SA Harvest",
    logo: "/partners/sa-harvest-logo.png",
    href: "https://saharvest.org/",
    wide: true,
  },
  {
    name: "Blessman International",
    logo: "/partners/blessman-international-logo.png",
    href: "https://www.blessmaninternational.org/",
    wide: true,
  },
  {
    name: "A Heart To Help",
    logo: "/partners/a-heart-to-help-logo.png",
    href: "https://ahearttohelp.co.za/",
    wide: true,
  },
  {
    name: "Checkers",
    logo: "/partners/checkers-logo.png",
    href: "https://www.checkers.co.za/",
    wide: true,
  },
  {
    name: "SPAR",
    logo: "/partners/spar-logo.png",
    href: "https://www.spar.co.za/",
    wide: true,
  },
  {
    name: "Pick n Pay",
    logo: "/partners/pick-n-pay-logo.png",
    href: "https://www.pnp.co.za/",
    wide: true,
  },
  {
    name: "Restore Africa Foundation",
    logo: "/partners/restore-africa-foundation-logo.png",
    href: "https://www.facebook.com/p/Restore-Africa-Foundation-61573115377603/",
  },
  {
    name: "CMH Ford Group",
    logo: "/partners/cmh-ford-ballito-logo.png",
    href: "https://cmhford.co.za/",
    wide: true,
  },
  {
    name: "The Sharks",
    logo: "/partners/sharks-logo-on-white.png",
    href: "https://sharksrugby.co.za/",
  },
  {
    name: "SANTACO",
    logo: "/partners/santaco-logo.png",
    href: "https://santaco.org/",
    wide: true,
  },
  {
    name: "dmAFRICA",
    logo: "/partners/dmafrica-logo.png",
    href: "https://dmafrica.com/",
    wide: true,
  },
];
