const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function generateHtmlReport() {
  const excelPath = path.resolve('Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx');
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(excelPath);

  const sheetsData = [];
  workbook.eachSheet((worksheet) => {
    const rows = [];
    worksheet.eachRow({ includeEmpty: false }, (row) => {
      // Convert cell values to text
      const rowValues = [];
      row.eachCell({ includeEmpty: true }, (cell, colNum) => {
        rowValues[colNum - 1] = cell.text || (cell.value ? String(cell.value) : '');
      });
      rows.push(rowValues);
    });
    sheetsData.push({
      name: worksheet.name,
      data: rows
    });
  });

  const sheetIcons = {
    '1. Báo Cáo Tổng Quan': '📋',
    '2. 5 Chế Độ Luyện Tập': '⚡',
    '3. 9 Ô Sân & 27 Kỹ Thuật': '🏸',
    '4. Video Thực Chiến': '🎥',
    '5. Thử Thách 100 Ngày': '🔥',
    '6. Tính Năng Bổ Trợ': '📊'
  };

  const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Báo Cáo Toàn Diện Tính Năng - Badminton Pro Trainer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #070d18;
      --bg-card: rgba(15, 23, 42, 0.9);
      --primary: #00f0ff;
      --primary-glow: rgba(0, 240, 255, 0.3);
      --secondary: #39ff14;
      --accent: #ffb703;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.1);
      --border-accent: rgba(0, 240, 255, 0.35);
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
      max-width: 1280px;
      margin: 0 auto;
    }
    /* Executive Header */
    .executive-header {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9));
      border: 1px solid var(--border-accent);
      border-radius: 20px;
      padding: 36px 28px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      margin-bottom: 28px;
      position: relative;
      overflow: hidden;
    }
    .executive-header::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(0, 240, 255, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }
    .badge-report {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 240, 255, 0.12);
      border: 1px solid rgba(0, 240, 255, 0.3);
      color: var(--primary);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
    }
    .report-title {
      font-size: clamp(24px, 3.5vw, 36px);
      font-weight: 900;
      background: linear-gradient(135deg, #ffffff 40%, #00f0ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
      line-height: 1.25;
    }
    .report-subtitle {
      color: var(--text-muted);
      font-size: 15px;
      max-width: 850px;
      margin-bottom: 24px;
    }
    /* Executive Metric Scorecards */
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 14px;
      margin-bottom: 24px;
    }
    .metric-card {
      background: rgba(10, 18, 30, 0.7);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px 20px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      transition: transform 0.2s ease, border-color 0.2s;
    }
    .metric-card:hover {
      transform: translateY(-2px);
      border-color: var(--primary);
    }
    .metric-val {
      font-size: 26px;
      font-weight: 900;
      color: var(--primary);
      letter-spacing: -0.5px;
    }
    .metric-lbl {
      font-size: 13px;
      font-weight: 700;
      color: #fff;
    }
    .metric-desc {
      font-size: 12px;
      color: var(--text-muted);
    }
    /* Quick Action Buttons */
    .action-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 22px;
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
      box-shadow: 0 4px 16px var(--primary-glow);
    }
    .btn-download:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 240, 255, 0.5);
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
      background: rgba(10, 18, 30, 0.85);
      padding: 10px;
      border-radius: 16px;
      border: 1px solid var(--border);
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 12px 20px;
      border-radius: 10px;
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
      box-shadow: 0 4px 14px var(--primary-glow);
    }
    /* Tab Content panels */
    .tab-pane {
      display: none;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
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
      margin-bottom: 20px;
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
      padding: 14px 18px;
      border-bottom: 1px solid var(--border);
      vertical-align: middle;
    }
    th {
      background: rgba(15, 23, 42, 0.98);
      color: #38bdf8;
      font-weight: 800;
      letter-spacing: 0.5px;
      border-bottom: 2px solid rgba(0, 240, 255, 0.4);
      position: sticky;
      top: 0;
    }
    tr:hover td {
      background: rgba(255, 255, 255, 0.035);
    }
    td:first-child {
      font-weight: 700;
      color: #38bdf8;
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
    <div class="executive-header">
      <div class="badge-report">📊 TÀI LIỆU TRÌNH BAN LÃNH ĐẠO / HLV TRƯỞNG</div>
      <h1 class="report-title">BÁO CÁO TOÀN DIỆN HỆ THỐNG BADMINTON PRO TRAINER</h1>
      <p class="report-subtitle">
        Bản tổng hợp chi tiết toàn bộ tính năng, kiến trúc 5 chế độ huấn luyện, bản đồ 9 ô sân & 27 kỹ thuật thực chiến, kho video chuyên môn và lộ trình 100 ngày nâng cao thể lực.
      </p>

      <!-- 4 High-Level Metric Scorecards -->
      <div class="metric-grid">
        <div class="metric-card">
          <span class="metric-val">5 CHẾ ĐỘ</span>
          <span class="metric-lbl">Huấn Luyện Đa Chiều</span>
          <span class="metric-desc">Tay, Chân, Phối Hợp, Lý Thuyết, Tổng Hợp</span>
        </div>
        <div class="metric-card">
          <span class="metric-val">9 Ô & 27 BÀI</span>
          <span class="metric-lbl">Biến Thể Thực Chiến</span>
          <span class="metric-desc">Mô phỏng 3D cơ sinh học góc đánh & chân lunge</span>
        </div>
        <div class="metric-card">
          <span class="metric-val">9 VIDEO THỰC TẾ</span>
          <span class="metric-lbl">Tự Đổi Theo Ô Sân</span>
          <span class="metric-desc">6 Đơn Nam + 3 Đôi Nam kèm chống tua nhanh</span>
        </div>
        <div class="metric-card">
          <span class="metric-val">100 NGÀY</span>
          <span class="metric-lbl">Lộ Trình Thử Thách</span>
          <span class="metric-desc">5 giai đoạn rèn luyện kỷ luật và thể lực bền bỉ</span>
        </div>
      </div>

      <div class="action-links">
        <a href="./Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx" download="Gioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx" class="btn btn-download">
          📥 Tải File Excel Chuẩn Sếp (.xlsx)
        </a>
        <a href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Ftool-badminton-1.onrender.com%2FGioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          🌐 Xem Excel Online (Office Live)
        </a>
        <a href="https://docs.google.com/viewer?url=https%3A%2F%2Ftool-badminton-1.onrender.com%2FGioi_Thieu_Tinh_Nang_Badminton_Pro.xlsx" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
          📄 Xem Excel Qua Google Docs
        </a>
        <a href="./" class="btn btn-app">
          🏸 Trở Lại Ứng Dụng Luyện Tập
        </a>
      </div>
    </div>

    <!-- TABS NAVIGATION -->
    <div class="tabs-nav" id="tabNav">
      ${sheetsData.map((s, idx) => `
        <button class="tab-btn ${idx === 0 ? 'active' : ''}" onclick="switchTab(${idx})">
          ${sheetIcons[s.name] || '📌'} ${s.name}
        </button>
      `).join('')}
    </div>

    <!-- TABS CONTENT PANES -->
    <div id="tabPanes">
      ${sheetsData.map((s, idx) => {
        const rows = s.data || [];
        if (rows.length === 0) return '';
        
        let headerRow = rows[0];
        let bodyRows = rows.slice(1);
        let title = s.name;

        // If row 0 is a banner title
        if (rows[0] && rows[0][0] && (!rows[0][1] || rows[0][1] === '')) {
          title = rows[0][0];
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
            <div class="table-title">📌 ${title}</div>
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
      <p>© 2026 Badminton Pro Trainer. Báo cáo độc quyền phục vụ công tác quản lý và huấn luyện thể thao chuyên nghiệp.</p>
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

  console.log('HTML Executive Report generated successfully!');
}

generateHtmlReport().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
