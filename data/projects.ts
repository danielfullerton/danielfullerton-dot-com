export type Project = {
  title: string;
  context: string;
  summary: string;
  metrics: string[];
  stack: string[];
  href: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
};

// Independent projects built and shipped outside my day job.
export const projects: Project[] = [
  {
    title: "Lean Site Services",
    context: "Freelance · Design, build, hosting & launch",
    summary:
      "I rebuilt a construction-services company's website end to end and launched it on their domain. The old WordPress site on shared hosting became a static Next.js site on Azure Static Web Apps, with quote and contact forms delivered by a serverless function and a Pay Your Bill checkout through Authorize.Net that takes live card payments. I ran the DNS cutover through Cloudflare with a tested rollback path, and every push runs the unit tests before deploying to production, dev, or a per-PR preview.",
    metrics: [
      "live card payments",
      "$0/mo hosting",
      "141 unit + 16 end-to-end tests",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Azure Static Web Apps",
      "Azure Functions",
      "Cloudflare",
      "Resend",
      "Authorize.Net",
      "Vitest",
      "Playwright",
    ],
    href: "https://leansiteservices.com",
    linkLabel: "leansiteservices.com",
    image: "/lss-homepage.jpg",
    imageAlt: "Lean Site Services homepage",
  },
];
