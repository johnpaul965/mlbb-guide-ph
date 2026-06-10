import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Information We Collect",
    body: "MLBB Guide operates primarily as a read-only resource. We do not require account registration, and we do not collect personal information such as your name, email address, or payment details simply for browsing our content. Information is only collected if you voluntarily contact us via email or our contact form.",
  },
  {
    title: "2. Usage Data & Telemetry",
    body: "To optimize the site, we collect anonymized usage data (telemetry) such as pages visited, time on site, and general device information through standard analytics tools. This helps us understand which hero guides are most popular and improve our user experience.",
  },
  {
    title: "3. Cookies",
    body: "This site uses cookies for analytics, functionality, and advertising purposes. Cookies are small text files stored on your device. You can disable cookies in your browser settings, though some features or ads may not function as intended. Third-party vendors, including Google, may use cookies to serve ads based on your prior visits to this or other websites.",
  },
  {
    title: "4. Google AdSense & Third-Party Advertising",
    body: (
      <>
        We use Google AdSense to display advertisements on this website. Google and its partners use cookies (including the DoubleClick cookie) to serve ads based on your interests and prior visits to this site and other sites on the internet. You may opt out of personalized advertising by visiting{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mlbb-accent underline hover:opacity-80 transition-opacity"
        >
          Google Ads Settings
        </a>
        {" "}or{" "}
        <a
          href="https://www.aboutads.info"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mlbb-accent underline hover:opacity-80 transition-opacity"
        >
          www.aboutads.info
        </a>
        . For more information on how Google uses data collected from sites that use its services, visit{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mlbb-accent underline hover:opacity-80 transition-opacity"
        >
          Google's Privacy & Terms
        </a>
        .
      </>
    ),
  },
  {
    title: "5. Third-Party Links",
    body: "Our guides may occasionally link to external websites or resources. We are not responsible for the privacy practices, tracking, or content of those external domains. Please review their specific policies upon visiting.",
  },
  {
    title: "6. Data Security",
    body: "While we take reasonable, industry-standard measures to protect any information submitted to us via contact forms, please remember that no transmission over the internet or electronic storage method is 100% secure.",
  },
  {
    title: "7. Children's Privacy",
    body: "This website is an esports strategy resource intended for general audiences. It is not directed at children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided personal information, please contact us so we can remove it.",
  },
  {
    title: "8. Your Rights",
    body: "Depending on your location, you may have the right to access, correct, or delete any personal data we hold about you. To make such a request, please contact us via our Contact page. We will respond within a reasonable timeframe.",
  },
  {
    title: "9. Policy Updates",
    body: "We reserve the right to update this privacy policy at any time. Significant changes will be reflected by an updated date at the top of this document. Continued use of the site after changes constitutes your acceptance of the updated policy.",
  },
];

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center md:text-left"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold font-display uppercase tracking-widest mb-6 border border-slate-200 bg-white text-slate-600 shadow-sm">
          <Shield className="w-3 h-3" />
          <span>Legal</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tight text-slate-900 mb-4">
          Privacy <span className="text-mlbb-accent">Policy</span>
        </h1>
        <p className="text-slate-500 font-display uppercase tracking-widest text-sm font-bold">
          Last updated: June 2026
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm"
      >
        <div className="space-y-10">
          {sections.map(({ title, body }, i) => (
            <div
              key={i}
              className="pb-8 border-b border-slate-100 last:border-0 last:pb-0"
            >
              <h2 className="text-lg font-black font-display uppercase tracking-wide text-slate-900 mb-3">
                {title}
              </h2>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                {body}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-slate-400 text-xs mt-8"
      >
        Questions? Contact us via the{" "}
        <a href="/contact" className="text-mlbb-accent hover:underline">
          Contact page
        </a>
        .
      </motion.p>
    </div>
  );
}
