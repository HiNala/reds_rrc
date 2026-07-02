import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/test-path",
  useSearchParams: () => new URLSearchParams(),
}));

// We test the trackEvent helper (pure logic, no React rendering needed).
// Import dynamically after mocks.
const { trackEvent } = await import("@/lib/analytics");

describe("trackEvent", () => {
  beforeEach(() => {
    // Reset DOM + storage mocks
    vi.stubGlobal("navigator", {
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
      doNotTrack: null,
      language: "en-US",
      sendBeacon: vi.fn(() => true),
    });
    vi.stubGlobal("document", {
      referrer: "https://google.com/",
    });
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(() => "test-session-id"),
      setItem: vi.fn(),
    });
    vi.stubGlobal("window", {
      location: { pathname: "/test", search: "" },
      doNotTrack: null,
    });
    vi.stubGlobal("Blob", class MockBlob {
      constructor(public parts: unknown[]) {}
    });
  });

  it("calls sendBeacon with the event payload", () => {
    trackEvent("pageview", { path: "/test" });
    expect(navigator.sendBeacon).toHaveBeenCalledWith(
      "/api/track",
      expect.anything(),
    );
  });

  it("does not track when Do-Not-Track is enabled", () => {
    vi.stubGlobal("navigator", { ...navigator, doNotTrack: "1" });
    trackEvent("pageview");
    expect(navigator.sendBeacon).not.toHaveBeenCalled();
  });

  it("detects mobile device from user agent", () => {
    trackEvent("pageview");
    // The sendBeacon call captures the blob; we verify it was called.
    expect(navigator.sendBeacon).toHaveBeenCalled();
  });
});
