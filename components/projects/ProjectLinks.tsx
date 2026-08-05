import { ArrowUpRight, Code2 } from "lucide-react";

import Icon from "@/components/icon";
import type { Project } from "@/types/projects";

/**
 * Collapses the six possible link fields into one primary site plus the store
 * icons used on the home grid, dropping `#` placeholders and duplicates.
 */
export function resolveProjectLinks(project: Project) {
  const { live, website, webapp, github, playstore, appstore } = project.links;
  const clean = (url?: string) => (url && url !== "#" ? url : undefined);

  const site = clean(website) ?? clean(live) ?? clean(webapp);
  const webappUrl = clean(webapp);

  const stores: { href: string; label: string; img: string }[] = [];
  const appstoreUrl = clean(appstore);
  if (appstoreUrl)
    stores.push({
      href: appstoreUrl,
      label: "App Store",
      img: "/assets/svg/app-store.svg",
    });

  const playstoreUrl = clean(playstore);
  if (playstoreUrl)
    stores.push({
      href: playstoreUrl,
      label: "Play Store",
      img: "/assets/svg/playstore.svg",
    });

  if (webappUrl && webappUrl !== site)
    stores.push({
      href: webappUrl,
      label: "Web App",
      img: "/assets/svg/chrome.svg",
    });

  return { site, stores, github: clean(github) };
}

export default function ProjectLinks({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const { site, stores, github } = resolveProjectLinks(project);
  if (!site && !github && stores.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {site && (
        <a
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-label font-semibold uppercase tracking-[0.12em] text-white transition duration-200 hover:bg-neutral-800"
        >
          Visit Site
          <ArrowUpRight size={14} />
        </a>
      )}

      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-3 text-label font-semibold uppercase tracking-[0.12em] text-black/70 shadow-[0_0_0_1px_rgba(3,3,2,0.06)] transition duration-200 hover:bg-white"
        >
          <Code2 size={14} />
          Source
        </a>
      )}

      {stores.map((store) => (
        <Icon
          key={store.href}
          href={store.href}
          title={store.label}
          type="img"
          img={store.img}
        />
      ))}
    </div>
  );
}
