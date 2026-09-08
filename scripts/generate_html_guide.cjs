const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Read the excel file
const excelPath = path.resolve('Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx');
const workbook = XLSX.readFile(excelPath);

const sheetNames = workbook.SheetNames;
const sheetsData = sheetNames.map((name) => {
  const ws = workbook.Sheets[name];
  const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
  return {
    name,
    data: jsonData
  };
});

const sheetLabels = {
  "1_Tong_Quan": "🌟 1. Tổng Quan Hệ Thống",
  "2_Che_Do_Tap": "⚡ 2. 5 Chế Độ Tập Luyện",
  "3_9_Vi_Tri_27_Ky_Thuat": "🏸 3. 9 Vị Trí & 27 Biến Thể",
  "4_Kho_Video_Chien_Thuat": "🎥 4. Kho Video Giáo Trình",
  "5_Thu_Thach_100_Ngay": "🔥 5. Thử Thách 100 Ngày",
  "6_Tinh_Nang_Bo_Tro": "📊 6. Tính Năng Bổ Trợ & Báo Cáo"
};

const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cẩm Nang & Giới Thiệu Tính Năng - Badminton Pro Trainer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #070d18;
      --bg-card: rgba(15, 23, 42, 0.85);
      --bg-card-hover: rgba(30, 41, 59, 0.9);
      --primary: #00f0ff;
      --primary-glow: rgba(0, 240, 255, 0.35);
      --secondary: #39ff14;
      --accent: #ffb703;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.1);
      --border-accent: rgba(0, 240, 255, 0.3);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      background: radial-gradient(circle at 50% 0%, #0d2137 0%, #060b14 100%);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.6;
      padding: 24px 16px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      padding: 32px 16px 24px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 28px;
    }
    .badge-top {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 240, 255, 0.12);
      border: 1px solid rgba(0, 240, 255, 0.3);
      color: var(--primary);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
    }
    h1 {
      font-size: clamp(24px, 4vw, 36px);
      font-weight: 900;
      background: linear-gradient(135deg, #ffffff 30%, #00f0ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    p.subtitle {
      color: var(--text-muted);
      font-size: 16px;
      max-width: 780px;
      margin: 0 auto 24px;
    }
    .action-links {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-top: 18px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 14px;
      text-decoration: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .btn-download {
      background: linear-gradient(135deg, #00f0ff, #0284c7);
      color: #030712;
      box-shadow: 0 4px 14px var(--primary-glow);
    }
    .btn-download:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 240, 255, 0.5);
    }
    .btn-outline {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      border: 1px solid var(--border);
    }
    .btn-outline:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: var(--primary);
      transform: translateY(-2px);
    }
    .btn-app {
      background: rgba(57, 255, 20, 0.15);
      border: 1px solid rgba(57, 255, 20, 0.4);
      color: var(--secondary);
    }
    .btn-app:hover {
      background: rgba(57, 255, 20, 0.25);
      transform: translateY(-2px);
    }
    /* Tab bar */
    .tabs-nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;
      background: rgba(10, 18, 30, 0.8);
      padding: 8px;
      border-radius: 12px;
      border: 1px solid var(--border);
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 700;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s;
    }
    .tab-btn:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
    }
    .tab-btn.active {
      color: #030712;
      background: #00f0ff;
      box-shadow: 0 2px 10px var(--primary-glow);
    }
    /* Tab Content panels */
    .tab-pane {
      display: none;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(12px);
      overflow-x: auto;
    }
    .tab-pane.active {
      display: block;
      animation: fadeIn 0.25s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .table-title {
      font-size: 20px;
      font-weight: 800;
      color: var(--primary);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
      text-align: left;
    }
    th, td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      vertical-align: top;
    }
    th {
      background: rgba(15, 23, 42, 0.95);
      color: #38bdf8;
      font-weight: 800;
      letter-spacing: 0.5px;
      border-bottom: 2px solid rgba(0, 240, 255, 0.3);
      position: sticky;
      top: 0;
    }
    tr:hover td {
      background: rgba(255, 255, 255, 0.03);
    }
    td:first-child {
      font-weight: 700;
      color: var(--secondary);
    }
    .highlight-pill {
      display: inline-block;
      padding: 3px 8px;
      background: rgba(255, 183, 3, 0.15);
      border: 1px solid rgba(255, 183, 3, 0.3);
      color: var(--accent);
      border-radius: 6px;
      font-size: 12px;
      font-weight: 700;
    }
    footer {
      text-align: center;
      padding: 36px 16px 20px;
      color: var(--text-muted);
      font-size: 13px;
      border-top: 1px solid var(--border);
      margin-top: 40px;
    }
    @media (max-width: 768px) {
      .tabs-nav {
        flex-direction: column;
      }
      .tab-btn {
        text-align: left;
      }
      th, td {
        padding: 10px 12px;
        font-size: 13px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge-top">🏸 TÀI LIỆU HỆ THỐNG CHÍNH THỨC</div>
      <h1>CẨM NANG & GIỚI THIỆU TÍNH NĂNG</h1>
      <p class="subtitle">
        Bản tổng hợp chi tiết toàn bộ tính năng, 5 chế độ huấn luyện, bản đồ 9 ô sân & 27 biến thể kỹ thuật, kho video và lộ trình 100 ngày.
      </p>

      <div class="action-links">
        <a href="./Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx" download="Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx" class="btn btn-download">
          📥 Tải File Excel Gốc (.xlsx)
        </a>
        <a href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Ftool-badminton-1.onrender.com%2FGioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          🌐 Xem Trực Tuyến (Office Live)
        </a>
        <a href="https://docs.google.com/viewer?url=https%3A%2F%2Ftool-badminton-1.onrender.com%2FGioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          📄 Xem Qua Google Docs
        </a>
        <a href="./" class="btn btn-app">
          🏸 Quay Lại Ứng Dụng Tập
        </a>
      </div>
    </header>

    <!-- TAB BUTTONS -->
    <div class="tabs-nav" id="tabNav">
      ${sheetsData.map((s, idx) => `
        <button class="tab-btn ${idx === 0 ? 'active' : ''}" onclick="switchTab(${idx})">
          ${sheetLabels[s.name] || s.name}
        </button>
      `).join('')}
    </div>

    <!-- TAB PANES -->
    <div id="tabPanes">
      ${sheetsData.map((s, idx) => {
        const rows = s.data || [];
        if (rows.length === 0) return '';
        
        let headerRow = rows[0];
        let bodyRows = rows.slice(1);
        let title = '';

        // If row 0 is single title line
        if (rows[0] && rows[0][0] && (!rows[0][1] || rows[0][1] === '')) {
          title = rows[0][0];
          // Find next non-empty header row
          let hIdx = 1;
          while (hIdx < rows.length && (!rows[hIdx] || rows[hIdx].length <= 1)) {
            hIdx++;
          }
          if (hIdx < rows.length) {
            headerRow = rows[hIdx];
            bodyRows = rows.slice(hIdx + 1);
          }
        }

        return `
          <div class="tab-pane ${idx === 0 ? 'active' : ''}" id="pane-${idx}">
            ${title ? `<div class="table-title">📌 ${title}</div>` : ''}
            <table>
              <thead>
                <tr>
                  ${(headerRow || []).map((h) => `<th>${h || ''}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${bodyRows.map((r) => {
                  if (!r || r.length === 0 || r.every(cell => !cell)) return '';
                  return `<tr>${(headerRow || []).map((_, cIdx) => `<td>${r[cIdx] !== undefined ? String(r[cIdx]).replace(/\\n/g, '<br/>') : ''}</td>`).join('')}</tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        `;
      }).join('')}
    </div>

    <footer>
      <p>© 2026 Badminton Pro Trainer. Toàn quyền sở hữu tài liệu hướng dẫn kỹ chiến thuật.</p>
    </footer>
  </div>

  <script>
    function switchTab(index) {
      document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
      });
      document.querySelectorAll('.tab-pane').forEach((pane, i) => {
        pane.classList.toggle('active', i === index);
      });
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.resolve('public/huong-dan-tinh-nang.html'), htmlContent, 'utf-8');
fs.writeFileSync(path.resolve('dist/huong-dan-tinh-nang.html'), htmlContent, 'utf-8');

console.log('Successfully generated public/huong-dan-tinh-nang.html and dist/huong-dan-tinh-nang.html');
