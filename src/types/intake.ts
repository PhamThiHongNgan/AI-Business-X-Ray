export interface IntakeData {
  q1: string;          // Tên doanh nghiệp
  q2: string;          // Lĩnh vực hoạt động
  q3: string;          // Sản phẩm / Dịch vụ
  q4: string;          // Khách hàng chính
  q5: string[];        // Thị trường
  q6: string;          // Đối thủ cạnh tranh
  q7: string;          // Giá trị khác biệt (USP)
  q8: string[];        // Mạng lưới
  q8_other?: string;
  q9: string[];        // Tài sản / Kênh số
  q10: string;         // Doanh thu gần nhất
  q10_other?: string;
  q11: string;         // Xu hướng doanh thu
  q11_other?: string;
  q12: string[];       // Khó khăn / Triệu chứng
  q13: string;         // Ưu tiên 90 ngày tới
}

export type BusinessProfile = IntakeData;
