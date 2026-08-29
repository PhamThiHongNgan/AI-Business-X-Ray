import { useState, useEffect } from 'react';

export const useHtml2Pdf = () => {
  const [isPdfReady, setIsPdfReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.html2pdf) {
      setIsPdfReady(true);
      return;
    }

    const existingScript = document.getElementById('html2pdf-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'html2pdf-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.async = true;
      script.onload = () => setIsPdfReady(true);
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener('load', () => setIsPdfReady(true));
    }
  }, []);

  return { isPdfReady };
};
