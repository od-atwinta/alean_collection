import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AleanClubSophiaPage from "../../../app/hotels/alean-club-sophia/page";
import "../../../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AleanClubSophiaPage />
  </StrictMode>,
);
