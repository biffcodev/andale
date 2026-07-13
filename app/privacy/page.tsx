"use client";

import { PolicyPage } from "@/components/policy-page";
import { useSite } from "@/components/site-context";
import { PRIVACY_POLICY } from "@/lib/policies";

export default function PrivacyPage() {
  const { lang } = useSite();
  return <PolicyPage policy={PRIVACY_POLICY[lang]} />;
}
