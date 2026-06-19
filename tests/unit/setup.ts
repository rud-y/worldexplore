import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

//  CityItem.test.tsx / City.test.tsx ----------------------------------
// Stable timezone so date assertions match across machines
// e.g. "Monday, January 15, 2024" for "2024-01-15"
process.env.TZ = "UTC";

// CitiesContext.test.tsx ----------------------------
// Supabase client throws at import time without these env vars
vi.stubEnv("VITE_SUPABASE_URL", "https://test.supabase.co");
vi.stubEnv("VITE_SUPABASE_ANON_KEY", "test-anon-key");

//  CityList.test.tsx --------------------------------
// Modal uses native <dialog> showModal / close (not fully implemented in jsdom)
HTMLDialogElement.prototype.showModal = function showModal() {
  this.open = true;
};

HTMLDialogElement.prototype.close = function close(returnValue?: string) {
  this.open = false;
  if (returnValue !== undefined) {
    this.returnValue = returnValue;
  }
};

// All tests (user-event / jsdom gaps) ----------------
Element.prototype.scrollIntoView = vi.fn();

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

afterEach(() => {
  cleanup();
  document.body.innerHTML = "";
});
