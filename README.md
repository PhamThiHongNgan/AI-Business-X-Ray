# AI Business X-Ray - Executive Platform

> **Nền tảng Chẩn đoán Sức khỏe Doanh nghiệp & Tái cấu trúc Toàn diện dành cho Lãnh đạo (CEO / Founder / Ban Điều Hành)**

![Project Status](https://img.shields.io/badge/status-active-emerald.svg)
![React](https://img.shields.io/badge/React-18.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)
![Deploy Ready](https://img.shields.io/badge/Vercel-Deploy%20Ready-black.svg)

---

## 🎯 Giới thiệu Dự án

**AI Business X-Ray** là hệ thống chẩn đoán sức khỏe doanh nghiệp thông minh, kết hợp giữa **khung quản trị chiến lược 13 lăng kính** và **AI Challenger**. Hệ thống giúp các nhà lãnh đạo bóc tách tận gốc các điểm nghẽn về dòng tiền, vận hành và dữ liệu, từ đó tự động đề xuất lộ trình hành động thực thi (Transformation Roadmap) chi tiết trong 30 - 90 ngày tới.

---

## ✨ Tính Năng Nổi Bật

1. **Khảo sát 13 câu hỏi chuẩn hóa (Business Intake):** Định hình nhanh chân dung mô hình kinh doanh, tài chính, thị trường và đối thủ.
2. **AI Challenger 1-1:** Trợ lý AI phỏng vấn phản biện thông minh nhằm đào sâu tìm nguyên nhân gốc rễ (**Root Cause Analysis**).
3. **AI Cognitive Engine Panel:** Bảng điều khiển nhận thức theo thời gian thực (Đo lường mức độ tin cậy *Confidence Level*, tri thức thu thập được, giả thuyết tăng trưởng).
4. **Business X-Ray & Radar Chart:** Trực quan hóa điểm số 13 lăng kính quản trị qua biểu đồ Radar năng lực.
5. **Thuật toán Penalty Rule:** Tự động giới hạn trần điểm nếu nền tảng quản trị cơ bản (Fundamentals) quá yếu nhằm tránh rủi ro số hóa trên quy trình lỗi.
6. **Bản đồ điểm nghẽn (Bottleneck Map):** Tự động phát hiện và cảnh báo các chỉ số nguy cơ ($\le 40$ điểm).
7. **Digital Business Canvas:** Bức tranh mô hình kinh doanh 5 khối được AI tái cấu trúc từ dữ liệu thực tế.
8. **Động cơ doanh thu & Giả thuyết What-If:** Đề xuất chiến lược đa dạng hóa dòng tiền và tăng biên lợi nhuận.
9. **Lộ trình chuyển đổi (Transformation Roadmap):** Phân tầng 3 giai đoạn thực thi rõ ràng: **NOW (0 - 30 ngày)**, **NEXT (30 - 90 ngày)**, **LATER (90+ ngày)**.
10. **Xuất Báo cáo Executive Report (PDF 4 trang):** Tạo báo cáo chuyên nghiệp định dạng A4 chuẩn in ấn gửi Ban Giám đốc / Hội đồng Quản trị.
11. **Bảo mật & Lưu trữ JSON cục bộ (Client-Side First):** Tải và nạp lại phiên làm việc `.json` bất kỳ lúc nào mà không lo rò rỉ dữ liệu lên máy chủ công khai.

---

## 📁 Cấu Trúc Thư Mục Dự Án (Clean Architecture)

```
AI Business X-Ray - Executive Platform/
├── package.json                         # Dependencies (React 18, Vite 6, Recharts, Lucide)
├── tsconfig.json                        # Cấu hình TypeScript (Strict types)
├── vite.config.ts                       # Cấu hình Vite Dev Server & Build Rollup
├── tailwind.config.js                   # Cấu hình Tailwind CSS Theme & Utilities
├── postcss.config.js                    # PostCSS Plugins
├── vercel.json                          # Cấu hình Routing SPA khi deploy lên Vercel
├── .gitignore                           # Danh sách loại trừ Git
├── index.html                           # HTML template & Font Plus Jakarta Sans
├── .env.example                         # File mẫu biến môi trường
├── README.md                            # Tài liệu dự án
└── src/
    ├── main.tsx                         # Entry point ứng dụng React
    ├── App.tsx                          # Container điều phối trạng thái & 14 bước
    ├── index.css                        # Style toàn cục, Tailwind directives & Print CSS
    │
    ├── types/                           # Hệ thống Type & Interface chặt chẽ
    │   ├── intake.ts                    # Type hồ sơ Intake Form (13 câu hỏi)
    │   ├── diagnosis.ts                 # Type điểm số 13 tiêu chí, 4 nhóm, Radar & Tiers
    │   ├── chat.ts                      # Type tin nhắn chat, AI State & Step config
    │   └── index.ts
    │
    ├── constants/                       # Cấu hình tĩnh & Dữ liệu mẫu
    │   ├── steps.ts                     # Cấu hình danh sách 14 bước (STEPS)
    │   ├── tiers.ts                     # Bảng phân cấp mức độ (CRITICAL, WEAK, etc.)
    │   ├── scoringSchema.ts             # Trọng số 4 nhóm & 13 lăng kính chấm điểm
    │   ├── demoData.ts                  # Dữ liệu chẩn đoán mẫu (DEMO_DATA)
    │   ├── formOptions.ts               # Các tùy chọn trắc nghiệm trong Form Intake
    │   └── index.ts
    │
    ├── utils/                           # Hàm tiện ích xử lý logic
    │   ├── scoring.ts                   # Thuật toán tính điểm tổng, Radar data, Sort
    │   ├── pdfExport.ts                 # Xuất báo cáo Executive Report sang PDF
    │   ├── storage.ts                   # Xuất và nạp phiên làm việc dạng file JSON
    │   └── index.ts
    │
    ├── services/                        # Tích hợp AI / Backend
    │   └── geminiService.ts             # Kết nối Google Gemini API (Structured JSON)
    │
    ├── hooks/                           # Custom React Hooks
    │   └── useHtml2Pdf.ts               # Dynamic Loader cho thư viện html2pdf
    │
    └── components/                      # Giao diện UI phân tách module độc lập
        ├── common/                      # Components dùng chung
        │   ├── FormatText.tsx           # Bóc tách nhãn [Tag] phát sáng & in đậm
        │   ├── CognitivePanel.tsx       # Bảng nhận thức AI Cognitive Engine
        │   ├── LoadingOverlay.tsx       # Animation AI đọc hồ sơ doanh nghiệp
        │   └── index.ts
        ├── forms/                       # Bộ Form Controls chuẩn hóa
        │   ├── FormInput.tsx            # Input Text & Textarea
        │   ├── FormMultiSelect.tsx      # Multi-select card pills kèm ô "Khác"
        │   ├── FormRadio.tsx            # Radio button cards kèm ô nhập số cụ thể
        │   └── index.ts
        ├── layout/                      # Layout & Điều hướng
        │   └── Sidebar.tsx              # Sidebar 14 bước với trạng thái khóa/mở khóa
        ├── intake/                      # Khảo sát doanh nghiệp
        │   └── BusinessIntakeModal.tsx  # Modal 3 bước Business Intake
        └── steps/                       # 14 Màn hình từng bước chẩn đoán
            ├── 01_WelcomeStep.tsx       # 01. Welcome (Khởi đầu, Lộ trình, Lợi ích)
            ├── 02_InterviewStep.tsx     # 02. Business Interview (AI Challenger Chat)
            ├── 03_UnderstandingStep.tsx # 03. AI Understanding (Đúc kết tri thức)
            ├── 04_XRayStep.tsx          # 04. Business X-Ray (Điểm tổng & Radar Chart)
            ├── 05_LevelStep.tsx         # 05. Business Level (Độ trưởng thành 4 trụ cột)
            ├── 06_BottlenecksStep.tsx   # 06. Bottleneck Map (Phân tích điểm nghẽn)
            ├── 07_ScoreStep.tsx         # 07. Digital Score (Bảng điểm 13 tiêu chí)
            ├── 08_CanvasStep.tsx        # 08. Digital Canvas (Mô hình kinh doanh 5 cột)
            ├── 09_PriorityStep.tsx      # 09. Priority (Top 5 ưu tiên xử lý cấp bách)
            ├── 10_RevenueStep.tsx       # 10. Revenue Engine (4 Trụ cột tăng trưởng)
            ├── 11_HypothesisStep.tsx    # 11. Revenue Hypothesis (Giả thuyết What-If)
            ├── 12_RoadmapStep.tsx       # 12. Roadmap (Lộ trình Now/Next/Later)
            ├── 13_DNAStep.tsx           # 13. Business DNA (Gen trội, Gen lặn, Đột biến)
            └── 14_ReportStep.tsx        # 14. Executive Report (Bản in & Xuất PDF)
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Yêu cầu môi trường
- **Node.js**: Phiên bản `>= 18.0.0`
- **npm** hoặc **yarn** / **pnpm**

### 2. Cài đặt thư viện
```bash
npm install
```

### 3. Cấu hình Gemini API (Tùy chọn)
Tạo file `.env` tại thư mục gốc:
```bash
cp .env.example .env
```
Mở file `.env` và dán API Key của bạn:
```env
VITE_GEMINI_API_KEY=AIzaSy...
```
*(Lưu ý: Nếu không cấu hình API Key, bạn vẫn có thể nhấn **"Xem Dashboard (Bản Demo)"** hoặc nạp file JSON mẫu để trải nghiệm đầy đủ toàn bộ tính năng).*

### 4. Chạy môi trường Phát triển (Development)
```bash
npm run dev
```
Mở trình duyệt truy cập: **`http://localhost:3000`**

### 5. Kiểm tra & Build Production
```bash
npm run build
```
Kết quả build hoàn chỉnh sẽ nằm trong thư mục `dist/`.

---

## 🌐 Hướng Dẫn Deploy Lên Vercel / Netlify

Dự án đã có sẵn file [vercel.json](file:///d:/Phuc/Workspace/Thuc_tap/AI%20Business%20X-Ray%20-%20Executive%20Platform/vercel.json) và [.gitignore](file:///d:/Phuc/Workspace/Thuc_tap/AI%20Business%20X-Ray%20-%20Executive%20Platform/.gitignore).

### Deploy qua Vercel Dashboard (Khuyên dùng):
1. Push mã nguồn lên một repository trên **GitHub**.
2. Đăng nhập [Vercel.com](https://vercel.com) $\rightarrow$ Chọn **Add New...** $\rightarrow$ **Project**.
3. Chọn repo GitHub vừa tạo và nhấn **Import**.
4. Vercel sẽ tự cấu hình:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. (Tùy chọn) Thêm Environment Variable: `VITE_GEMINI_API_KEY` nếu bạn muốn AI phỏng vấn hoạt động trên production.
6. Nhấn **Deploy** $\rightarrow$ Hoàn tất!

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Bundler:** Vite 6
- **Biểu đồ & Đồ thị:** Recharts (Radar Chart, Polar Axis)
- **Bộ Icon:** Lucide React
- **Xuất Báo cáo:** html2pdf.js
- **Trí tuệ nhân tạo:** Google Gemini API (Interactions API / Structured Output)

---

## 📄 Bản Quyền & Giấy Phép
Dự án được phát triển phục vụ mục đích chuyển đổi số và tư vấn quản trị chiến lược doanh nghiệp.
