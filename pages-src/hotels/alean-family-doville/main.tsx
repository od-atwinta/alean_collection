import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AleanFamilyDovillePage from "../../../app/hotels/alean-family-doville/page";
import "../../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AleanFamilyDovillePage />
  </StrictMode>,
);
