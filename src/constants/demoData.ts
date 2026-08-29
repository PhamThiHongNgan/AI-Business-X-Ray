import { DiagnosticData } from '../types';

export const DEMO_DATA: DiagnosticData = {
  businessValue: { 
    score: 45, 
    evidence: "Giao dịch chủ yếu là mua đứt bán đoạn.", 
    reason: "Chưa thiết kế giải pháp gia tăng.", 
    risk: "Biên lợi nhuận mỏng.", 
    recommendation: "Đóng gói thành giải pháp trọn gói & gói duy trì." 
  },
  usp: { 
    score: 30, 
    evidence: "Thông điệp quảng cáo chung chung: Giá rẻ.", 
    reason: "Tiêu chuẩn ngành, không phải USP.", 
    risk: "Rơi vào cuộc chiến giá.", 
    recommendation: "Xây dựng USP dựa trên Dịch vụ & Trải nghiệm khách hàng vượt trội." 
  },
  customerInsight: { 
    score: 55, 
    evidence: "Thiếu chân dung khách hàng chi tiết bằng dữ liệu.", 
    reason: "Hiểu biết nằm trong đầu nhân sự.", 
    risk: "Chảy máu khách hàng.", 
    recommendation: "Xây dựng Customer Journey Map & lưu trữ thông tin tập trung." 
  },
  management: { 
    score: 35, 
    evidence: "CEO duyệt mọi chi phí qua Zalo.", 
    reason: "Thiếu hệ thống phân quyền.", 
    risk: "CEO là nút thắt cổ chai.", 
    recommendation: "Xây dựng ma trận phân quyền tài chính & quy trình phê duyệt tự động." 
  },
  marketing: { 
    score: 40, 
    evidence: "CAC tăng 30%.", 
    reason: "Phụ thuộc Facebook/Google Ads.", 
    risk: "Lỗ vốn khi thuật toán đổi.", 
    recommendation: "Tối ưu phễu Zalo ZNS, xây kênh Organic và Remarketing tự động." 
  },
  sales: { 
    score: 65, 
    evidence: "Tỷ lệ chốt đơn 25%.", 
    reason: "CEO trực tiếp đào tạo kịch bản tốt.", 
    risk: "Khó nhân bản quy mô.", 
    recommendation: "Số hóa kịch bản Sales thành Knowledge Base và đào tạo bằng AI." 
  },
  revenueDiv: { 
    score: 15, 
    evidence: "100% doanh thu từ bán sản phẩm.", 
    reason: "Chưa có dịch vụ phụ trợ.", 
    risk: "Dòng tiền không ổn định.", 
    recommendation: "Khởi tạo Gói Subscription / Gói dịch vụ định kỳ (ARR)." 
  },
  scalability: { 
    score: 25, 
    evidence: "Tăng doanh thu phải tăng tuyến tính nhân sự.", 
    reason: "Mô hình phụ thuộc sức người.", 
    risk: "Lợi nhuận không tăng tỷ lệ thuận.", 
    recommendation: "Tự động hóa CSKH & chuẩn hóa SOP cho từng phòng ban." 
  },
  operation: { 
    score: 45, 
    evidence: "Trao đổi qua file Excel rời rạc.", 
    reason: "Có phần mềm nhưng không chuẩn hóa quy trình.", 
    risk: "Dữ liệu rác sinh ra mỗi ngày.", 
    recommendation: "Tích hợp API giữa các phòng ban và đồng bộ dữ liệu Real-time." 
  },
  dataMaturity: { 
    score: 20, 
    evidence: "Tập 20.000 KH nằm chết trong Excel.", 
    reason: "Không có văn hóa thu thập dữ liệu sạch.", 
    risk: "Lãng phí tài nguyên, không thể dùng AI.", 
    recommendation: "Dự án 30 ngày: Làm sạch Database và chuẩn hóa thẻ phân loại khách hàng." 
  },
  digitalAssets: { 
    score: 35, 
    evidence: "Fanpage tương tác dưới 1%.", 
    reason: "Không biết cách vận hành để Monetization.", 
    risk: "ROI bằng 0.", 
    recommendation: "Dùng AI Content tái cấu trúc blog, video ngắn và phễu chuyển đổi." 
  },
  aiReadiness: { 
    score: 10, 
    evidence: "Quy trình chưa chuẩn, dữ liệu phân tán.", 
    reason: "Chưa có Data Foundation.", 
    risk: "Mua phần mềm AI sẽ thất bại.", 
    recommendation: "Tập trung số hóa cơ bản và làm sạch dữ liệu trước." 
  },
  ecosystem: { 
    score: "N/A", 
    evidence: "Chưa rõ về mạng lưới đối tác.", 
    reason: "AI chưa khai thác đủ thông tin.", 
    risk: "Bỏ lỡ khách hàng miễn phí.", 
    recommendation: "Thu thập thêm dữ liệu B2B và mở rộng liên minh đối tác." 
  }
};
