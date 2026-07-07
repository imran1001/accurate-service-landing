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
  { q: "Is visa approval guaranteed?", a: "No. We prepare and review your documents to
