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
  const paymentRef =
