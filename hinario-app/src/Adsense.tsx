// src/components/Adsense.tsx
import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export default function Adsense() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense Error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4442376726356772"
      data-ad-slot="1234567890" // Substitua pelo seu slot real
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}


