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
                    <Row label="Bank" value="MCB Bank Limited" />
                    <Row label="Account Number" value="0987 6543 2109 8765" />
                    <Row label="IBAN" value="PK36 MCIB 0987 6543 2109 8765" />
                  </div>
                </div>

                <div className="rounded-2xl border border-navy-foreground/20 bg-navy-foreground/5 p-6 shadow-lg">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gold">
                    <MobileIcon /> Mobile Wallets
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <Row label="Easypaisa" value="0316 0285386" />
                    <Row label="Account Name" value="Muhammad Imran Malik" />
                  </div>
                  <div className="mt-6 rounded-lg bg-gold/10 p-3 text-xs text-gold">
                    ⚡ Instant verification available via WhatsApp after transfer.
                  </div>
                </div>
              </div>

              <div className="mt-10 text-center">
                <a
                  href={`https://wa.me/923160285386?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-bold text-gold-foreground shadow-xl transition-transform hover:scale-105"
                >
                  <span>Share Screenshot on WhatsApp</span>
                  <span>→</span>
                </a>
                <p className="mt-3 text-xs text-navy-foreground/60">
                  Clicking will open WhatsApp with your application details pre-filled.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy">Frequently Asked Questions</h2>
          <p className="mt-2 text-muted-foreground">Everything you need to know about our consultancy and process.</p>
        </div>
        <div className="mt-10 space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between p-5 text-left font-semibold text-foreground transition-colors hover:bg-secondary/50"
              >
                <span>{faq.q}</span>
                <span className="ml-4 text-lg font-bold text-gold">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="border-t border-border/50 bg-secondary/20 p-5 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-navy py-12 text-navy-foreground/70 text-sm">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p font-bold text-navy-foreground>Accurate Consultancy © {new Date().getFullYear()}</p>
          <p className="mt-1 text-xs">Visa &amp; Travel Document Specialists — Lahore, Pakistan</p>
        </div>
      </footer>
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-navy-foreground/10 pb-2">
      <span className="text-navy-foreground/70">{label}</span>
      <span className="font-mono font-bold text-navy-foreground">{value}</span>
    </div>
  );
}

function BankIcon() {
  return <span className="text-lg">🏛️</span>;
}

function MobileIcon() {
  return <span className="text-lg">📱</span>;
}

/* --- FORM SUB-COMPONENTS --- */

interface FormProps {
  onSubmit: (summary: string) => void;
}

function FlightHotelForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const summary = buildSummaryLines(data, {
      fullName: "Full Name",
      passportNo: "Passport Number",
      destinations: "Destinations",
      travelDates: "Estimated Travel Dates",
    });
    onSubmit(summary);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name (as on Passport)" name="fullName" required />
      <Input label="Passport Number" name="passportNo" required />
      <Input label="Destination Country/Cities" name="destinations" required />
      <Input label="Estimated Travel Dates" name="travelDates" placeholder="e.g., 10 Aug - 25 Aug 2026" required />
      <SubmitButton label="Proceed to Payment" />
    </form>
  );
}

function CoverItineraryForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const summary = buildSummaryLines(data, {
      fullName: "Full Name",
      purpose: "Travel Purpose",
      employmentStatus: "Employment Status",
      travelDates: "Travel Dates",
    });
    onSubmit(summary);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" name="fullName" required />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Purpose of Trip</label>
        <select name="purpose" className="rounded-lg border border-border bg-background p-2.5 text-sm outline-none focus:border-gold">
          {PURPOSE_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <Input label="Current Employment / Occupation Status" name="employmentStatus" placeholder="e.g., Salaried Software Engineer" required />
      <Input label="Proposed Travel Dates" name="travelDates" required />
      <SubmitButton label="Proceed to Payment" />
    </form>
  );
}

function InsuranceForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const summary = buildSummaryLines(data, {
      fullName: "Full Name",
      age: "Age",
      coverageRegion: "Coverage Region",
      duration: "Trip Duration (Days)",
    });
    onSubmit(summary);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" name="fullName" required />
      <Input label="Age" name="age" type="number" required />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Region</label>
        <select name="coverageRegion" className="rounded-lg border border-border bg-background p-2.5 text-sm outline-none focus:border-gold">
          <option value="Schengen Area">Schengen Area (0 Euro Coverage)</option>
          <option value="Worldwide">Worldwide</option>
          <option value="UK / USA / Canada">UK / USA / Canada</option>
        </select>
      </div>
      <Input label="Duration (in Days)" name="duration" type="number" required />
      <SubmitButton label="Proceed to Payment" />
    </form>
  );
}

function CompleteFileForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const summary = buildSummaryLines(data, {
      fullName: "Full Name",
      phone: "WhatsApp Number",
      targetCountry: "Target Country",
      travelMonth: "Travel Dates",
    });
    onSubmit(summary);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" name="fullName" required />
      <Input label="WhatsApp Phone Number" name="phone" required />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Target Country</label>
        <select name="targetCountry" className="rounded-lg border border-border bg-background p-2.5 text-sm outline-none focus:border-gold">
          <optgroup label="Schengen Area">
            {SCHENGEN_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </optgroup>
          <optgroup label="Other Major Destinations">
            {OTHER_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </optgroup>
        </select>
      </div>
      <Input label="Tentative Travel Month" name="travelMonth" placeholder="e.g., September 2026" required />
      <SubmitButton label="Proceed to Payment" />
    </form>
  );
}

function AppointmentForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const summary = buildSummaryLines(data, {
      fullName: "Full Name",
      embassy: "Target Embassy/Consulate",
      preferredDate: "Preferred Appointment Timeframe",
    });
    onSubmit(summary);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Full Name" name="fullName" required />
      <Input label="Embassy / Consulate Location" name="embassy" placeholder="e.g., German Embassy Islamabad" required />
      <Input label="Preferred Timeframe" name="preferredDate" placeholder="e.g., Anytime in August" required />
      <SubmitButton label="Proceed to Payment" />
    </form>
  );
}

function UmrahForm({ onSubmit }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;
    const summary = buildSummaryLines(data, {
      fullName: "Contact Person Name",
      passengers: "Number of Pilgrims",
      packageTier: "Preferred Tier",
      travelDates: "Expected Travel Dates",
    });
    onSubmit(summary);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Contact Person Name" name="fullName" required />
      <Input label="Total Pilgrims (Adults/Children)" name="passengers" placeholder="e.g., 2 Adults, 1 Child" required />
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Package Tier</label>
        <select name="packageTier" className="rounded-lg border border-border bg-background p-2.5 text-sm outline-none focus:border-gold">
          <option value="Economy (4-5 Star Outer Ring)">Economy (4-5 Star Outer Ring)</option>
          <option value="Premium (Close Distance to Haram)">Premium (Close Distance to Haram)</option>
          <option value="VIP / Custom (Clock Tower / Frontline)">VIP / Custom (Clock Tower / Frontline)</option>
        </select>
      </div>
      <Input label="Expected Month / Days of Stay" name="travelDates" placeholder="e.g., 14 Days in November" required />
      <SubmitButton label="Submit Inquiry via WhatsApp" />
    </form>
  );
}

/* --- FORM UI PRIMITIVES --- */

function Input({ label, name, type = "text", placeholder, required = false }: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="rounded-lg border border-border bg-background p-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="mt-4 w-full rounded-lg bg-navy py-3 text-sm font-semibold text-navy-foreground transition-transform hover:-translate-y-0.5 hover:bg-navy/90"
    >
      {label} →
    </button>
  );
}
