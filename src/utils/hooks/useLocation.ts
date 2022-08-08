import { useEffect, useState } from "react";

export const useLocation = () => {
  const [windowLocation, setWindowLocation] = useState("");
  useEffect(() => {
    setWindowLocation(window.origin);
  }, [window.location]);
  return windowLocation;
};
