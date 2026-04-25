import { loadFont as loadDmSerif } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadBricolage } from "@remotion/google-fonts/BricolageGrotesque";

const dmSerif = loadDmSerif("normal", { weights: ["400"], subsets: ["latin"] });
const dmSerifItalic = loadDmSerif("italic", {
  weights: ["400"],
  subsets: ["latin"],
});
const inter = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const bricolage = loadBricolage("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const fontFamilies = {
  display: dmSerif.fontFamily,
  displayItalic: dmSerifItalic.fontFamily,
  body: `${inter.fontFamily}, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`,
  heading: bricolage.fontFamily,
};

export const waitForFonts = () =>
  Promise.all([
    dmSerif.waitUntilDone(),
    dmSerifItalic.waitUntilDone(),
    inter.waitUntilDone(),
    bricolage.waitUntilDone(),
  ]);
