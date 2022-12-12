/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
/* ----------------------------------- NPM ---------------------------------- */
import { Poppins, Bitter } from "@next/font/google";
import { NextFont } from "@next/font/dist/types";

/* -------------------------------------------------------------------------- */
/*                                    FONTS                                   */
/* -------------------------------------------------------------------------- */
export const bitter: NextFont = Bitter({
  subsets: ["latin"],
});

export const poppins: NextFont = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});