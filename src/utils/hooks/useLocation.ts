import { useEffect, useState } from "react";

export const useLocation = () => {
  const [windowLocation, setWindowLocation] = useState("");
  useEffect(() => {
    if (window) {
      setWindowLocation(window.origin);
    }
  }, []);
  return windowLocation;
};
