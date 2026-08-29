declare global {
  interface Window {
    html2pdf?: any;
  }
}

export interface PdfExportOptions {
  elementId: string;
  filename?: string;
}

export const exportToPdf = async ({
  elementId,
  filename = 'AI_Business_XRay_Report.pdf'
}: PdfExportOptions): Promise<boolean> => {
  if (typeof window === 'undefined' || !window.html2pdf) {
    console.error('html2pdf is not loaded yet');
    return false;
  }

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return false;
  }

  const opt = {
    margin: 0.5,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, logging: false },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  try {
    await window.html2pdf().set(opt).from(element).save();
    return true;
  } catch (err) {
    console.error('Failed to generate PDF:', err);
    return false;
  }
};
