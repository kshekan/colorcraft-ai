"use client";

/**
 * Trigger a file download in the browser.
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download a base64-encoded PNG image as a file.
 */
export function downloadPng(base64Data: string, filename: string) {
  const byteString = atob(base64Data);
  const bytes = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: "image/png" });
  downloadBlob(blob, filename);
}

/**
 * Open a print window with the image.
 */
export function printImage(base64Data: string, description: string) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>ColorCraft - ${description}</title>
        <style>
          @page { size: portrait; margin: 0.5in; }
          body { margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
          img { max-width: 100%; max-height: 100vh; object-fit: contain; }
        </style>
      </head>
      <body>
        <img src="data:image/png;base64,${base64Data}" alt="${description}" />
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
