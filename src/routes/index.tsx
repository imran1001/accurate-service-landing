import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, type FormEvent, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const SCHENGEN_COUNTRIES = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Czech Republic", "Denmark",
  "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland",
  "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
  "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia",
  "Slovenia", "Spain", "Sweden",
];

const OTHER_COUNTRIES = [
  "United Kingdom", "Ireland", "Canada", "Australia", "USA", "New Zealand",
];

const ALL_DESTINATIONS = [...SCHENGEN_COUNTRIES, ...OTHER_COUNTRIES];

const PURPOSE_OPTIONS = ["Tourism", "Business", "Family Visit", "Medical", "Other"];

const SERVICE_META: Record<string, { name: string; price: string }> = {
  "flight-hotel": { name: "Flight + Hotel Booking", price: "PKR 3,000" },
  "cover-itinerary": { name: "Cover Letter + Travel Itinerary", price: "PKR 3,000" },
  "insurance": { name: "Travel Insurance", price: "From PKR 2,500" },
  "complete": { name: "Complete Visa File Package", price: "PKR 10,000" },
  "appointment": { name: "Appointment Assistance", price: "Add-on service" },
  "umrah": { name: "Umrah Package", price: "Custom Quote" },
};

const COUNTRIES_GRID = [
  { name: "Schengen Area — 29 Countries", flag: "🇪🇺" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "USA", flag: "🇺🇸" },
  { name: "New Zealand", flag: "🇳🇿" },
];

const EVISA = ["Thailand", "Malaysia", "Singapore", "Indonesia", "Vietnam", "Sri Lanka", "Azerbaijan"];
const TOURS = ["Thailand", "Malaysia", "Azerbaijan"];

const FAQS = [
  { q: "Is visa approval guaranteed?", a: "No. We prepare and review your documents to the highest professional standard, but the final visa approval decision rests solely with the embassy or consulate." },
  { q: "How long does document preparation take?", a: "Most complete visa files are ready within 24–48 hours of receiving your information and payment confirmation." },
  { q: "What is your refund policy on travel insurance?", a: "Travel insurance purchased through us is fully refundable if your visa is refused — simply share the refusal letter and we process the refund." },
  { q: "Do you help with embassy appointments?", a: "Yes. Our appointment assistance service actively monitors and secures your earliest available embassy slot. If no slot is found within 30 days due to our monitoring delay, the appointment service fee is refunded." },
  { q: "How do I share documents with you?", a: "Everything happens on WhatsApp — after payment confirmation, our team will guide you through document submission step by step." },
];

/* Turns a submission object into readable WhatsApp lines, skipping empty values */
function buildSummaryLines(data: Record<string, string>, labels: Record<string, string>) {
  return Object.entries(data)
    .filter(([, val]) => val && val.trim() !== "")
    .map(([key, val]) => `${labels[key] || key}: ${val}`)
    .join("\n");
}

function Index() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submissionSummary, setSubmissionSummary] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const servicesRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);

  const scrollTo = (r: React.RefObject<HTMLDivElement | null>) =>
    r.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSelectService = (id: string) => {
    setSelectedService(id);
    setSubmitted(false);
    setSubmissionSummary("");
    setTimeout(() => scrollTo(formRef), 50);
  };

  const handleFormSubmit = (summary: string) => {
    setSubmissionSummary(summary);
    setSubmitted(true);
    setTimeout(() => scrollTo(paymentRef), 50);
  };

  const selectedName = selectedService ? SERVICE_META[selectedService].name : "";
  const waMessage = encodeURIComponent(
    `Hi, I have completed payment for ${selectedName || "your service"}.\n\n${submissionSummary}\n\nPlease find my receipt attached.`,
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-navy-foreground">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-gold font-bold text-gold-foreground">A</div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-wide sm:text-base">Accurate Consultancy</div>
              <div className="text-[10px] uppercase tracking-widest text-gold sm:text-xs">Visa & Travel Documents</div>
            </div>
          </div>
          <a
            href="https://wa.me/923160285386"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-gold px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-gold-foreground sm:inline-block"
          >
            WhatsApp Us
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 10%, rgba(212,175,55,0.35), transparent 40%), radial-gradient(circle at 80% 90%, rgba(212,175,55,0.25), transparent 45%)",
        }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wide text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              19+ Years of Immigration Expertise
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Complete Visa Application Files —{" "}
              <span className="text-gold">AI-Powered, Consultant Reviewed</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground/80 sm:text-lg">
              Serving Schengen, UK, Ireland, Canada, USA, Australia & New Zealand. 19 years of immigration expertise
              packaged into document files embassies expect.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo(servicesRef)}
                className="rounded-full bg-gold px-8 py-3.5 text-sm font-semibold text-gold-foreground shadow-lg shadow-gold/20 transition-transform hover:-translate-y-0.5"
              >
                Get Started →
              </button>
              <a
                href="#faq"
                className="rounded-full border border-navy-foreground/30 px-8 py-3.5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                Read FAQ
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                ["19+", "Years experience"],
                ["24–48h", "Turnaround"],
                ["100%", "Consultant reviewed"],
                ["6+", "Regions served"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-gold sm:text-3xl">{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-navy-foreground/60">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servicesRef} id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Services & Packages</h2>
          <p className="mt-4 text-muted-foreground">
            Choose a single document, the complete visa file, appointment assistance, or an Umrah package.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* À la carte */}
          <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
            <h3 className="text-xl font-bold text-navy">À La Carte Services</h3>
            <p className="mt-2 text-sm text-muted-foreground">Individual documents, when you only need one piece.</p>
            <div className="mt-8 space-y-4">
              {[
                { id: "flight-hotel", name: "Flight + Hotel Booking", price: "PKR 3,000" },
                { id: "cover-itinerary", name: "Cover Letter + Travel Itinerary", price: "PKR 3,000" },
                { id: "insurance", name: "Travel Insurance", price: "From PKR 2,500", note: "Fully refundable if visa refused" },
              ].map((s) => (
                <div key={s.id} className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-foreground">{s.name}</span>
                    <span className="text-sm font-semibold text-navy">{s.price}</span>
                  </div>
                  {s.note && <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>}
                  <button
                    onClick={() => handleSelectService(s.id)}
                    className="mt-3 w-full rounded-lg border border-navy/20 bg-navy/5 py-2 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
                  >
                    Select This Service
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Complete – featured */}
          <div className="relative flex flex-col rounded-2xl border-2 border-gold bg-navy p-8 text-navy-foreground shadow-xl shadow-navy/10 lg:-translate-y-4">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-gold-foreground">
              Most Popular
            </span>
            <h3 className="text-xl font-bold">Complete Visa File</h3>
            <p className="mt-2 text-sm text-navy-foreground/70">Everything an embassy expects — reviewed by our consultants.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gold">PKR 10,000</span>
              <span className="text-sm text-navy-foreground/60">/ file</span>
            </div>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Financial statement letter",
                "Cover letter",
                "Travel itinerary",
                "Travel insurance (Schengen-compliant)",
                "Flight reservation",
                "Hotel booking",
                "Consultation session",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-gold text-[11px] font-bold text-gold-foreground">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSelectService("complete")}
              className="mt-8 w-full rounded-lg bg-gold py-3 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5"
            >
              Select This Service
            </button>
          </div>

          {/* Appointment + Umrah stacked */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-xl font-bold text-navy">Appointment Assistance</h3>
              <span className="mt-1 inline-block w-fit rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-navy">Add-on</span>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                We actively monitor and secure your earliest available embassy appointment slot.
              </p>
              <div className="mt-4 rounded-xl border border-gold/30 bg-gold/10 p-3 text-xs text-navy">
                <strong className="font-semibold">Refund promise:</strong> If no slot within 30 days due to our monitoring delay, the fee is refunded.
              </div>
              <button
                onClick={() => handleSelectService("appointment")}
                className="mt-5 w-full rounded-lg border border-navy/20 bg-navy/5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
              >
                Select This Service
              </button>
            </div>

            <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-xl font-bold text-navy">Umrah Package</h3>
              <span className="mt-1 inline-block w-fit rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-navy">Custom Quote</span>
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                Tailored Umrah packages — Makkah &amp; Madinah hotels, Economy to Premium tiers, arranged around your dates and group size.
              </p>
              <div className="mt-4 rounded-xl bg-gold/10 p-3 text-xs text-navy font-medium">
                Custom Quote — Inquire via WhatsApp
              </div>
              <button
                onClick={() => handleSelectService("umrah")}
                className="mt-5 w-full rounded-lg border border-navy/20 bg-navy/5 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-navy-foreground"
              >
                Select This Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FORMS */}
      <div ref={formRef}>
        {selectedService && !submitted && (
          <section className="border-y border-border bg-secondary/40">
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="inline-block rounded-full bg-navy/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy">
                  Step 1 of 2
                </span>
                <h2 className="mt-4 text-3xl font-bold text-navy">Your Details</h2>
                <p className="mt-3 inline-block rounded-lg border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-semibold text-navy">
                  You're booking: <span className="text-navy">{selectedName}</span>
                </p>
              </div>
              <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                {selectedService === "flight-hotel" && <FlightHotelForm onSubmit={handleFormSubmit} />}
                {selectedService === "cover-itinerary" && <CoverItineraryForm onSubmit={handleFormSubmit} />}
                {selectedService === "insurance" && <InsuranceForm onSubmit={handleFormSubmit} />}
                {selectedService === "complete" && <CompleteFileForm onSubmit={handleFormSubmit} />}
                {selectedService === "appointment" && <AppointmentForm onSubmit={handleFormSubmit} />}
                {selectedService === "umrah" && <UmrahForm onSubmit={handleFormSubmit} />}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* PAYMENT */}
      <div ref={paymentRef}>
        {submitted && (
          <section className="border-y-4 border-gold bg-navy text-navy-foreground">
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="text-center">
                <span className="inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                  Step 2 of 2
                </span>
                <h2 className="mt-4 text-4xl font-extrabold text-gold sm:text-5xl">Complete Your Payment</h2>
                <p className="mt-2 text-sm text-navy-foreground/70">
                  Selected service: <span className="font-semibold text-gold">{selectedName}</span>
                </p>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border-2 border-gold bg-navy-foreground/10 p-6 shadow-lg">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold">
                    <BankIcon /> Bank Transfer
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <Row label="Account Title" value="Muhammad Imran Malik" />
                    <Row label="Bank" value="MCB Bank Limited, Lahore" />
                    <Row label="Account #" value="1069209731000337" mono big copyable />
                    <Row label="IBAN" value="PK85MUCB1069209731000337" mono big copyable />
                  </div>
                </div>
                <div className="rounded-2xl border-2 border-gold bg-navy-foreground/10 p-6 shadow-lg">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold">
                    <WalletIcon /> EasyPaisa
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <Row label="Account Title" value="Muhammad Imran Malik" />
                    <Row label="Number" value="0316 0285386" mono big copyable />
                  </div>
                  <div className="mt-6 rounded-lg bg-gold/10 p-3 text-xs text-gold">
                    ⚡ Instant verification available via WhatsApp after transfer.
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl border-l-4 border-gold bg-gold/15 p-5 text-base font-bold leading-relaxed text-navy-foreground">
                After completing payment, please send your transfer/payment receipt screenshot to our WhatsApp number
                below. Our team will confirm receipt and begin processing your documents immediately. You will receive
                further guidance and updates via WhatsApp as soon as possible.
              </div>

              <a
                href={`https://wa.me/923160285386?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[oklch(0.68_0.17_150)] py-5 text-lg font-bold text-white shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5 0-.2 0-.4-.1-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.2zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                Send Payment Receipt on WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-navy-foreground/60">
                Clicking will open WhatsApp with your application details pre-filled.
              </p>
            </div>
          </section>
        )}
      </div>

      {/* COUNTRIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy sm:text-4xl">Countries We Serve</h2>
          <p className="mt-3 text-muted-foreground">Consular expertise across the world's most-requested destinations.</p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {COUNTRIES_GRID.map((c) => (
            <div key={c.name} className="rounded-xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-gold hover:shadow-md">
              <div className="text-3xl">{c.flag}</div>
              <div className="mt-2 text-sm font-medium text-navy">{c.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* E-VISA + TOURS */}
      <section className="bg-secondary/40 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">E-Visa Processing</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fast electronic visa applications for supported destinations.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {EVISA.map((c) => (
                <span key={c} className="rounded-full border border-navy/15 bg-navy/5 px-3 py-1.5 text-sm font-medium text-navy">{c}</span>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-gold/10 p-4 text-sm text-navy">
              All-Inclusive: <strong className="font-bold">PKR 12,000</strong> per country
              <p className="mt-1.5 text-xs text-navy/70">
                Includes government e-visa fee + our complete processing service — no hidden costs
              </p>
            </div>
            <a href="https://wa.me/923160285386" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-navy-foreground transition-transform hover:-translate-y-0.5">
              Inquire on WhatsApp
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">Tour Packages</h2>
            <p className="mt-2 text-sm text-muted-foreground">Custom itineraries designed around your budget and interests.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {TOURS.map((c) => (
                <span key={c} className="rounded-full border border-navy/15 bg-navy/5 px-3 py-1.5 text-sm font-medium text-navy">{c}</span>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-gold/10 p-4 text-sm text-navy">Custom itineraries available — quoted individually.</div>
            <a href="https://wa.me/923160285386" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-navy-foreground transition-transform hover:-translate-y-0.5">
              Inquire via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "19+ Years Experience", d: "Deep consular knowledge across regions." },
            { t: "AI-Powered Speed", d: "Files prepared in 24–48 hours." },
            { t: "Consultant Reviewed", d: "Every file audited by a human expert." },
            { t: "Refund Protection", d: "Insurance & appointment fee refunds available." },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-xl text-gold">★</div>
              <h3 className="mt-4 font-bold text-navy">{b.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-secondary/40 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-xl border border-border bg-card">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-navy">{f.q}</span>
                    <span className={`grid h-7 w-7 flex-none place-items-center rounded-full bg-gold/15 text-gold transition-transform ${open ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {open && <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted-foreground">{f.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-gold font-bold text-gold-foreground">A</div>
              <div className="text-base font-bold">Accurate Consultancy</div>
            </div>
            <p className="mt-4 text-sm text-navy-foreground/70">
              Visa & travel document specialists. 19 years of immigration expertise, packaged into files embassies expect.
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gold">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>WhatsApp: <a href="https://wa.me/923160285386" className="hover:text-gold">0316 0285386</a></li>
              <li>Email: <a href="mailto:info@accurate-consultancy.com" className="hover:text-gold">info@accurate-consultancy.com</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gold">Ready to start?</div>
            <button onClick={() => scrollTo(servicesRef)} className="mt-4 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-gold-foreground">
              View Services
            </button>
          </div>
        </div>
        <div className="border-t border-navy-foreground/10">
          <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-navy-foreground/50 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} Accurate Consultancy. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-navy focus:ring-2 focus:ring-navy/20";

function Field({ label, required, children, className = "" }: { label: string; required?: boolean; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}

function BankIcon() {
  return <span className="text-lg">🏛️</span>;
}

function WalletIcon() {
  return <span className="text-lg">📱</span>;
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" />
    </svg>
  );
}

function Row({ label, value, mono, big, copyable }: { label: string; value: string; mono?: boolean; big?: boolean; copyable?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center justify-between gap-3 border-b border-navy-foreground/10 py-2 last:border-0">
      <span className="text-xs uppercase tracking-wider text-navy-foreground/60">{label}</span>
      <div className="flex items-center gap-2">
        <span
          className={`text-right font-bold text-navy-foreground ${mono ? "font-mono" : ""} ${
            big ? "text-lg sm:text-xl" : "text-sm"
          }`}
        >
          {value}
        </span>
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            className="flex-none rounded-md bg-gold/20 p-1.5 text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
            aria-label={`Copy ${label}`}
          >
            {copied ? <span className="block px-1 text-[10px] font-bold">✓</span> : <CopyIcon />}
          </button>
        )}
      </div>
    </div>
  );
}

function SubmitBtn() {
  return (
    <div className="sm:col-span-2">
      <button
        type="submit"
        className="w-full rounded-lg bg-navy py-3.5 text-sm font-semibold text-navy-foreground transition-transform hover:-translate-y-0.5"
      >
        Continue to Payment →
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Shared form pieces                                                     */
/* ---------------------------------------------------------------------- */

const selectCls = inputCls + " bg-background";

function DestinationSelect({ value, onChange, required }: { value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <select
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={selectCls}
    >
      <option value="">Select destination</option>
      <optgroup label="Schengen Area">
        {SCHENGEN_COUNTRIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </optgroup>
      <optgroup label="Other Destinations">
        {OTHER_COUNTRIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </optgroup>
    </select>
  );
}

/* ---------------------------------------------------------------------- */
/* FlightHotelForm                                                        */
/* ---------------------------------------------------------------------- */

function FlightHotelForm({ onSubmit }: { onSubmit: (summary: string) => void }) {
  const [fullName, setFullName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { fullName, passportNumber, destination, departureDate, returnDate, notes };
    const labels: Record<string, string> = {
      fullName: "Full Name",
      passportNumber: "Passport Number",
      destination: "Destination",
      departureDate: "Departure Date",
      returnDate: "Return Date",
      notes: "Additional Notes",
    };
    onSubmit(buildSummaryLines(data, labels));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full Name (as on passport)" required>
        <input required className={inputCls} value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Muhammad Ali Khan" />
      </Field>
      <Field label="Passport Number" required>
        <input required className={inputCls} value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} placeholder="e.g. AB1234567" />
      </Field>
      <Field label="Destination" required>
        <DestinationSelect value={destination} onChange={setDestination} required />
      </Field>
      <div />
      <Field label="Departure Date" required>
        <input required type="date" className={inputCls} value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
      </Field>
      <Field label="Return Date" required>
        <input required type="date" className={inputCls} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
      </Field>
      <Field label="Additional Notes" className="sm:col-span-2">
        <textarea className={inputCls} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Preferred airline, hotel area, budget, etc." />
      </Field>
      <SubmitBtn />
    </form>
  );
}

/* ---------------------------------------------------------------------- */
/* CoverItineraryForm                                                     */
/* ---------------------------------------------------------------------- */

function CoverItineraryForm({ onSubmit }: { onSubmit: (summary: string) => void }) {
  const [fullName, setFullName] = useState("");
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { fullName, destination, purpose, travelStartDate, travelEndDate, notes };
    const labels: Record<string, string> = {
      fullName: "Full Name",
      destination: "Destination",
      purpose: "Purpose of Travel",
      travelStartDate: "Travel Start Date",
      travelEndDate: "Travel End Date",
      notes: "Additional Notes",
    };
    onSubmit(buildSummaryLines(data, labels));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full Name" required>
        <input required className={inputCls} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </Field>
      <Field label="Destination" required>
        <DestinationSelect value={destination} onChange={setDestination} required />
      </Field>
      <Field label="Purpose of Travel" required>
        <select required className={selectCls} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="">Select purpose</option>
          {PURPOSE_OPTIONS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </Field>
      <div />
      <Field label="Travel Start Date" required>
        <input required type="date" className={inputCls} value={travelStartDate} onChange={(e) => setTravelStartDate(e.target.value)} />
      </Field>
      <Field label="Travel End Date" required>
        <input required type="date" className={inputCls} value={travelEndDate} onChange={(e) => setTravelEndDate(e.target.value)} />
      </Field>
      <Field label="Additional Notes" className="sm:col-span-2">
        <textarea className={inputCls} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything specific for the cover letter or itinerary" />
      </Field>
      <SubmitBtn />
    </form>
  );
}

/* ---------------------------------------------------------------------- */
/* InsuranceForm                                                          */
/* ---------------------------------------------------------------------- */

function InsuranceForm({ onSubmit }: { onSubmit: (summary: string) => void }) {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [destination, setDestination] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { fullName, dateOfBirth, destination, travelStartDate, travelEndDate };
    const labels: Record<string, string> = {
      fullName: "Full Name",
      dateOfBirth: "Date of Birth",
      destination: "Destination",
      travelStartDate: "Coverage Start Date",
      travelEndDate: "Coverage End Date",
    };
    onSubmit(buildSummaryLines(data, labels));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full Name" required>
        <input required className={inputCls} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </Field>
      <Field label="Date of Birth" required>
        <input required type="date" className={inputCls} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      </Field>
      <Field label="Destination" required>
        <DestinationSelect value={destination} onChange={setDestination} required />
      </Field>
      <div />
      <Field label="Coverage Start Date" required>
        <input required type="date" className={inputCls} value={travelStartDate} onChange={(e) => setTravelStartDate(e.target.value)} />
      </Field>
      <Field label="Coverage End Date" required>
        <input required type="date" className={inputCls} value={travelEndDate} onChange={(e) => setTravelEndDate(e.target.value)} />
      </Field>
      <SubmitBtn />
    </form>
  );
}

/* ---------------------------------------------------------------------- */
/* CompleteFileForm                                                       */
/* ---------------------------------------------------------------------- */

function CompleteFileForm({ onSubmit }: { onSubmit: (summary: string) => void }) {
  const [fullName, setFullName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, setTravelEndDate] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState("1");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = {
      fullName, passportNumber, destination, purpose,
      travelStartDate, travelEndDate, numberOfTravelers, notes,
    };
    const labels: Record<string, string> = {
      fullName: "Full Name",
      passportNumber: "Passport Number",
      destination: "Destination",
      purpose: "Purpose of Travel",
      travelStartDate: "Travel Start Date",
      travelEndDate: "Travel End Date",
      numberOfTravelers: "Number of Travelers",
      notes: "Additional Notes",
    };
    onSubmit(buildSummaryLines(data, labels));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full Name (as on passport)" required>
        <input required className={inputCls} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </Field>
      <Field label="Passport Number" required>
        <input required className={inputCls} value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} />
      </Field>
      <Field label="Destination" required>
        <DestinationSelect value={destination} onChange={setDestination} required />
      </Field>
      <Field label="Purpose of Travel" required>
        <select required className={selectCls} value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="">Select purpose</option>
          {PURPOSE_OPTIONS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </Field>
      <Field label="Travel Start Date" required>
        <input required type="date" className={inputCls} value={travelStartDate} onChange={(e) => setTravelStartDate(e.target.value)} />
      </Field>
      <Field label="Travel End Date" required>
        <input required type="date" className={inputCls} value={travelEndDate} onChange={(e) => setTravelEndDate(e.target.value)} />
      </Field>
      <Field label="Number of Travelers" required>
        <input required type="number" min="1" className={inputCls} value={numberOfTravelers} onChange={(e) => setNumberOfTravelers(e.target.value)} />
      </Field>
      <div />
      <Field label="Additional Notes" className="sm:col-span-2">
        <textarea className={inputCls} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Employment details, prior refusals, sponsor info, etc." />
      </Field>
      <SubmitBtn />
    </form>
  );
}

/* ---------------------------------------------------------------------- */
/* AppointmentForm                                                        */
/* ---------------------------------------------------------------------- */

function AppointmentForm({ onSubmit }: { onSubmit: (summary: string) => void }) {
  const [fullName, setFullName] = useState("");
  const [destination, setDestination] = useState("");
  const [city, setCity] = useState("");
  const [preferredDateRange, setPreferredDateRange] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { fullName, destination, city, preferredDateRange, notes };
    const labels: Record<string, string> = {
      fullName: "Full Name",
      destination: "Destination / Embassy",
      city: "Application Center City",
      preferredDateRange: "Preferred Date Range",
      notes: "Additional Notes",
    };
    onSubmit(buildSummaryLines(data, labels));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Full Name" required>
        <input required className={inputCls} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </Field>
      <Field label="Destination / Embassy" required>
        <DestinationSelect value={destination} onChange={setDestination} required />
      </Field>
      <Field label="Application Center City" required>
        <input required className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Lahore, Islamabad, Karachi" />
      </Field>
      <Field label="Preferred Date Range" required>
        <input required className={inputCls} value={preferredDateRange} onChange={(e) => setPreferredDateRange(e.target.value)} placeholder="e.g. Between 10–25 August 2026" />
      </Field>
      <Field label="Additional Notes" className="sm:col-span-2">
        <textarea className={inputCls} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any urgent travel dates or constraints" />
      </Field>
      <SubmitBtn />
    </form>
  );
}

/* ---------------------------------------------------------------------- */
/* UmrahForm                                                              */
/* ---------------------------------------------------------------------- */

const UMRAH_TIERS = ["Economy", "Standard", "Premium"];

function UmrahForm({ onSubmit }: { onSubmit: (summary: string) => void }) {
  const [fullName, setFullName] = useState("");
  const [numberOfPilgrims, setNumberOfPilgrims] = useState("1");
  const [packageTier, setPackageTier] = useState("");
  const [preferredDates, setPreferredDates] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data = { fullName, numberOfPilgrims, packageTier, preferredDates, notes };
    const labels: Record<string, string> = {
      fullName: "Contact Full Name",
      numberOfPilgrims: "Number of Pilgrims",
      packageTier: "Package Tier",
      preferredDates: "Preferred Travel Dates",
      notes: "Additional Notes",
    };
    onSubmit(buildSummaryLines(data, labels));
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <Field label="Contact Full Name" required>
        <input required className={inputCls} value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </Field>
      <Field label="Number of Pilgrims" required>
        <input required type="number" min="1" className={inputCls} value={numberOfPilgrims} onChange={(e) => setNumberOfPilgrims(e.target.value)} />
      </Field>
      <Field label="Package Tier" required>
        <select required className={selectCls} value={packageTier} onChange={(e) => setPackageTier(e.target.value)}>
          <option value="">Select tier</option>
          {UMRAH_TIERS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Preferred Travel Dates" required>
        <input required className={inputCls} value={preferredDates} onChange={(e) => setPreferredDates(e.target.value)} placeholder="e.g. Mid-Ramadan 2027" />
      </Field>
      <Field label="Additional Notes" className="sm:col-span-2">
        <textarea className={inputCls} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Hotel proximity preference, room sharing, etc." />
      </Field>
      <SubmitBtn />
    </form>
  );
}

