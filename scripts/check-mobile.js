const http = require("http");

function fetch(path) {
  return new Promise((resolve, reject) => {
    http.get({ hostname: "127.0.0.1", port: 3000, path }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

(async () => {
  const home = await fetch("/");
  const viewport = home.match(/name="viewport"\s+content="([^"]+)"/);
  console.log("viewport:", viewport?.[1]);

  const responsiveClasses = (home.match(/sm:|md:|lg:|xl:/g) || []).length;
  console.log("responsive class count:", responsiveClasses);

  // Check for mobile menu
  const hasMobileMenu = home.includes("md:hidden") || home.includes("sm:hidden");
  console.log("has mobile menu toggle:", hasMobileMenu);

  // Check for mobile sticky CTA
  const hasMobileSticky = home.includes("fixed bottom-0") || home.includes("sticky");
  console.log("has sticky/fixed elements:", hasMobileSticky);

  // Check for lead capture popup
  const hasPopup = home.includes("popup") || home.includes("Popup");
  console.log("has lead capture popup:", hasPopup);

  // Check horizontal overflow (elements wider than viewport)
  const hasOverflow = home.includes("overflow-x-auto") || home.includes("overflow-x-scroll");
  console.log("has horizontal scroll containers:", hasOverflow);

  // Check grid responsiveness
  const gridClasses = (home.match(/grid-cols-1|grid-cols-2|grid-cols-3|grid-cols-4/g) || []);
  console.log("grid classes found:", [...new Set(gridClasses)]);

  // Check flex responsiveness
  const flexClasses = (home.match(/flex-col|flex-row|sm:flex-row|md:flex-row/g) || []);
  console.log("flex direction classes:", [...new Set(flexClasses)].slice(0, 10));
})();
