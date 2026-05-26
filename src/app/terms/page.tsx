import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & License",
  description:
    "License terms for products purchased on itsmatias.com — full website templates, landing pages, and add-ons.",
  alternates: { canonical: "https://itsmatias.com/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 26, 2026";

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-24 text-slate-200">
      <Link
        href="/"
        className="text-sm text-slate-400 hover:text-white transition-colors"
      >
        ← itsmatias.com
      </Link>

      <h1 className="mt-6 text-4xl font-light tracking-tight text-white">
        Terms & License
      </h1>
      <p className="mt-2 text-sm text-slate-400">Last updated: {LAST_UPDATED}</p>

      <section className="mt-10 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">1. What you&apos;re buying</h2>
        <p>
          Products sold on itsmatias.com (&quot;the Templates&quot;) are full source-code
          projects delivered as private GitHub repositories. You buy one-time
          access and a perpetual license to use the code in your own projects.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">2. License grant</h2>
        <p>
          On payment, you receive a perpetual, worldwide, non-exclusive license
          to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Use the Templates on unlimited projects you own.</li>
          <li>Modify the source code in any way.</li>
          <li>Deploy the result to any hosting provider.</li>
          <li>
            Charge end users for products or services built on the Templates.
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">3. What you cannot do</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Resell, redistribute, or relicense the Templates as a stand-alone
            product, template, boilerplate, or starter kit.
          </li>
          <li>
            Open-source the Templates, in part or in whole, without prior
            written consent.
          </li>
          <li>
            Share your GitHub access with people who haven&apos;t purchased a
            license. Each license is single-buyer.
          </li>
          <li>Claim authorship of the Templates.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">4. Attribution</h2>
        <p>
          By default, deployed sites built on the Templates display a small
          &quot;Built by Matias Zanan&quot; credit in the footer linking to
          itsmatias.com.
        </p>
        <p>
          You may remove this credit by purchasing the &quot;Remove
          Attribution&quot; add-on for the relevant product on itsmatias.com.
          After purchase you may set{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">
            NEXT_PUBLIC_HIDE_ATTRIBUTION=true
          </code>{" "}
          in your environment to hide it.
        </p>
        <p>
          Removing the attribution without the add-on is a license violation.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">5. Delivery</h2>
        <p>
          Access to the private GitHub repository is granted automatically when
          your payment clears, using the GitHub username you provide at
          checkout. If you don&apos;t receive an invite within 1 hour, email{" "}
          <a
            href="mailto:matiaszanan@gmail.com"
            className="underline hover:text-white"
          >
            matiaszanan@gmail.com
          </a>{" "}
          with your receipt and GitHub username.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">6. Updates</h2>
        <p>
          You get lifetime updates: any improvement, fix, or new feature I
          publish to the source repository becomes available to you via{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">
            git pull
          </code>{" "}
          on the template branch.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">7. Refunds</h2>
        <p>
          Because access to the code cannot be revoked once granted, all sales
          are final. Reach out if something doesn&apos;t work as documented and
          I&apos;ll fix it or refund at my discretion.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">8. Warranty</h2>
        <p>
          The Templates are provided &quot;as is&quot;, without warranty of any
          kind. I make no guarantees about fitness for a particular purpose,
          uptime, security, or revenue. You are responsible for what you ship.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">9. Liability</h2>
        <p>
          In no event will the total liability for any claim related to the
          Templates exceed the amount you paid for them.
        </p>
      </section>

      <section className="mt-8 space-y-4 text-slate-300">
        <h2 className="text-xl font-medium text-white">10. Contact</h2>
        <p>
          Questions about this license:{" "}
          <a
            href="mailto:matiaszanan@gmail.com"
            className="underline hover:text-white"
          >
            matiaszanan@gmail.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
