import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/** Каркас юридических страниц: спокойная читаемая вёрстка */
export function LegalPage({
  crumb,
  title,
  updated,
  children,
}: {
  crumb: Crumb;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="pb-20 pt-28 lg:pb-28 lg:pt-40">
      <div className="shell">
        <Breadcrumbs items={[crumb]} />
        <header className="mt-8 max-w-3xl border-b border-line pb-10 lg:mt-12">
          <h1 className="text-h2">{title}</h1>
          <p className="mt-5 text-sm text-moss">Редакция от {updated}</p>
        </header>
        <div className="legal mt-10 max-w-3xl">{children}</div>
      </div>
    </article>
  );
}
