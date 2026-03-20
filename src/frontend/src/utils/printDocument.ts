import type { CompanySettings } from "../hooks/useCompanySettings";

export function printDocument(
  title: string,
  bodyHTML: string,
  settings: CompanySettings,
): void {
  const logoHTML = settings.logo
    ? `<img src="${settings.logo}" style="width:80px;height:80px;object-fit:contain;" alt="logo" />`
    : `<div style="width:80px;height:80px;background:#e5e7eb;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:24px;">📡</div>`;

  const contactLine = [
    settings.email && `ইমেইল: ${settings.email}`,
    settings.whatsapp && `WhatsApp: ${settings.whatsapp}`,
  ]
    .filter(Boolean)
    .join("  |  ");

  const html = `<!DOCTYPE html>
<html lang="bn">
<head>
<meta charset="UTF-8" />
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Noto Sans Bengali', sans-serif;
    font-size: 11pt;
    color: #1a1a1a;
    background: #fff;
  }
  .page-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 24px 12px;
    border-bottom: 2px solid #1e3a5f;
    margin-bottom: 16px;
  }
  .header-logo { flex-shrink: 0; }
  .header-info { flex: 1; }
  .header-info .org-name {
    font-size: 18pt;
    font-weight: 700;
    color: #1e3a5f;
    line-height: 1.2;
  }
  .header-info .org-address {
    font-size: 10pt;
    color: #444;
    margin-top: 2px;
  }
  .header-info .org-contact {
    font-size: 9pt;
    color: #666;
    margin-top: 4px;
  }
  .doc-title {
    text-align: center;
    font-size: 13pt;
    font-weight: 700;
    margin: 0 24px 14px;
    padding: 6px;
    background: #f0f4f8;
    border-radius: 4px;
  }
  .content { padding: 0 24px 24px; }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
  }
  th {
    background: #1e3a5f;
    color: #fff;
    padding: 7px 8px;
    text-align: left;
    font-weight: 600;
    white-space: nowrap;
  }
  td {
    padding: 6px 8px;
    border-bottom: 1px solid #e2e8f0;
    vertical-align: top;
  }
  tr:nth-child(even) td { background: #f8fafc; }
  tfoot td {
    font-weight: 700;
    border-top: 2px solid #1e3a5f;
    background: #eef2f7;
  }
  @media print {
    @page { size: A4 portrait; margin: 12mm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .page-header { page-break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="page-header">
    <div class="header-logo">${logoHTML}</div>
    <div class="header-info">
      <div class="org-name">${settings.name}</div>
      ${settings.address ? `<div class="org-address">${settings.address}</div>` : ""}
      ${contactLine ? `<div class="org-contact">${contactLine}</div>` : ""}
    </div>
  </div>
  <div class="doc-title">${title}</div>
  <div class="content">${bodyHTML}</div>
</body>
</html>`;

  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => {
    win.focus();
    win.print();
  }, 800);
}
