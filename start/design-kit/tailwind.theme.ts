// Tailwind theme extension — tuned to the source site's tone.
// Corners: slightly-rounded · Shadows: soft · Mood: clean, trustworthy SaaS with crisp blue energy
export const theme = {
  extend: {
    colors: { primary: "#ffa311", accent: "#722b32" },
    borderRadius: { DEFAULT: "0.375rem" },
    boxShadow: { card: "0 4px 12px -2px rgb(0 0 0 / 0.10)" },
    fontFamily: { heading: ["Avenir Next", "system-ui"], body: ["Helvetica Neue", "system-ui"] },
  },
};
