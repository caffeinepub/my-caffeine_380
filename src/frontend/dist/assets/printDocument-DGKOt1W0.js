function printDocument(title, bodyHTML, settings) {
  const logoHTML = settings.logo ? `<img src="${settings.logo}" style="width:90px;height:90px;object-fit:contain;border-radius:6px;" alt="logo" />` : `<div style="width:90px;height:90px;background:#e5e7eb;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;">📡</div>`;
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
    align-items: center;
    gap: 20px;
    padding: 18px 28px 14px;
    border-bottom: 3px solid #1e3a5f;
    margin-bottom: 18px;
    background: #f8fafc;
  }
  .header-logo { flex-shrink: 0; }
  .header-info { flex: 1; }
  .header-info .org-name {
    font-size: 20pt;
    font-weight: 700;
    color: #1e3a5f;
    line-height: 1.2;
    letter-spacing: -0.3px;
  }
  .header-info .org-sub {
    font-size: 9.5pt;
    color: #4a6fa5;
    margin-top: 1px;
    font-weight: 600;
  }
  .header-info .org-address {
    font-size: 9.5pt;
    color: #555;
    margin-top: 4px;
  }
  .header-info .org-contact-row {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 5px;
    flex-wrap: wrap;
  }
  .header-info .contact-item {
    font-size: 9pt;
    color: #1e3a5f;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .header-divider {
    height: 4px;
    background: linear-gradient(90deg, #1e3a5f 0%, #c9a227 50%, #1e3a5f 100%);
    margin-bottom: 4px;
  }
  .doc-title {
    text-align: center;
    font-size: 13pt;
    font-weight: 700;
    margin: 0 28px 16px;
    padding: 8px 16px;
    background: #1e3a5f;
    color: #fff;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }
  .content { padding: 0 28px 28px; }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
  }
  th {
    background: #1e3a5f;
    color: #fff;
    padding: 8px 9px;
    text-align: left;
    font-weight: 700;
    white-space: nowrap;
    border: 1px solid #16305a;
  }
  td {
    padding: 6px 9px;
    border: 1px solid #e2e8f0;
    vertical-align: top;
  }
  tr:nth-child(even) td { background: #f8fafc; }
  tfoot td {
    font-weight: 700;
    border-top: 2px solid #1e3a5f;
    background: #eef2f7;
    color: #1e3a5f;
  }
  .print-footer {
    text-align: center;
    font-size: 8pt;
    color: #888;
    margin: 20px 28px 0;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
  }
  @media print {
    @page { size: 215.9mm 330.2mm portrait; margin: 10mm 12mm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact; }
    .page-header { page-break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="header-divider"></div>
  <div class="page-header">
    <div class="header-logo">${logoHTML}</div>
    <div class="header-info">
      <div class="org-name">${settings.name}</div>
      ${settings.address ? `<div class="org-address">📍 ${settings.address}</div>` : ""}
      <div class="org-contact-row">
        ${settings.email ? `<span class="contact-item">✉ ${settings.email}</span>` : ""}
        ${settings.whatsapp ? `<span class="contact-item">📱 WhatsApp: ${settings.whatsapp}</span>` : ""}
      </div>
    </div>
  </div>
  <div class="doc-title">${title}</div>
  <div class="content">${bodyHTML}</div>
  <div class="print-footer">মুদ্রণের তারিখ: ${(/* @__PURE__ */ new Date()).toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" })}</div>
</body>
</html>`;
  const win = window.open("", "_blank", "width=950,height=800");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  setTimeout(() => {
    win.focus();
    win.print();
  }, 900);
}
export {
  printDocument as p
};
