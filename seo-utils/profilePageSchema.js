import { PERSON_ID } from "@/data/profile";

/**
 * ProfilePage wrapper for the homepage.
 *
 * `mainEntity` is a bare `@id` reference — the Person itself is declared once
 * in `siteGraph()` from the root layout. Re-declaring its properties here is
 * what previously produced two conflicting Person nodes on the same page, with
 * a different `sameAs` list on each.
 *
 * The old `dateCreated`/`dateModified` pair was dropped: it hardcoded a fake
 * 2024-01-01 creation date and stamped "modified" at render time, so the page
 * claimed to change on every request.
 */
export const profilePageSchema = () => {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": PERSON_ID },
  });
};
