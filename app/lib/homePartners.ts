/**
 * Public-facing partner logos for the home marquee.
 * Not the full partner portal registry — only brands we display publicly.
 */

export type HomePartner = {
  name: string;
  logo: string;
  href: string;
  /** Wider wordmarks vs square crests */
  wide?: boolean;
};

export const HOME_PARTNERS: HomePartner[] = [
  {
    name: "SPAR",
    logo: "/partners/spar-logo.png",
    href: "https://www.spar.co.za/",
    wide: true,
  },
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
    name: "SANTACO",
    logo: "/partners/santaco-logo.png",
    href: "https://santaco.org/",
    wide: true,
  },
  {
    name: "SA Harvest",
    logo: "/partners/sa-harvest-logo.png",
    href: "https://saharvest.org/",
    wide: true,
  },
  {
    name: "Restore Africa Foundation",
    logo: "/partners/restore-africa-foundation-logo.png",
    href: "https://www.facebook.com/p/Restore-Africa-Foundation-61573115377603/",
  },
  {
    name: "A Heart To Help",
    logo: "/partners/a-heart-to-help-logo.png",
    href: "https://ahearttohelp.co.za/",
    wide: true,
  },
  {
    name: "The Sharks",
    logo: "/partners/sharks-logo-on-white.png",
    href: "https://sharksrugby.co.za/",
  },
  {
    name: "dmAFRICA",
    logo: "/partners/dmafrica-logo.png",
    href: "https://dmafrica.com/",
    wide: true,
  },
];
