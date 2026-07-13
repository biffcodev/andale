"use client";

import { PolicyPage } from "@/components/policy-page";
import { useSite } from "@/components/site-context";
import { TERMS_POLICY } from "@/lib/policies";

export default function TermsPage() {
  const { lang } = useSite();
  return <PolicyPage policy={TERMS_POLICY[lang]} />;
}
