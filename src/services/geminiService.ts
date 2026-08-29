import { BusinessProfile, ChatMessage, GeminiInterviewResponse } from '../types';

export const sendGeminiInterview = async (
  messages: ChatMessage[],
  businessProfile: BusinessProfile | null,
  customApiKey?: string
): Promise<GeminiInterviewResponse> => {
  const chatHistory = messages.map(m => ({
    role: m.role === 'model' ? 'model' : 'user',
    parts: [{ text: m.text }]
  }));

  const profileInfo = businessProfile ? `--- HỒ SƠ DOANH NGHIỆP TỪ BUSINESS INTAKE ---
- Tên DN: ${businessProfile.q1}
- Lĩnh vực: ${businessProfile.q2}
- Sản phẩm/Dịch vụ: ${businessProfile.q3}
- Khách hàng: ${businessProfile.q4}
- Thị trường: ${businessProfile.q5?.join(', ')}
- Đối thủ: ${businessProfile.q6}
- Giá trị khác biệt (USP): ${businessProfile.q7}
- Mạng lưới: ${businessProfile.q8?.join(', ')} ${businessProfile.q8_other || ''}
- Tài sản/Kênh số: ${businessProfile.q9?.join(', ')}
- Doanh thu: ${businessProfile.q10} ${businessProfile.q10_other || ''}
- Xu hướng doanh thu: ${businessProfile.q11} ${businessProfile.q11_other || ''}
- Khó khăn (Triệu chứng): ${businessProfile.q12?.join(', ')}
- Ưu tiên 90 ngày (Cấp bách): ${businessProfile.q13}
---------------------------------------------` : `--- THÔNG TIN DOANH NGHIỆP ---
Hiện tại chưa có thông tin đầu vào. Hãy đặt câu hỏi để tìm hiểu sơ bộ về mô hình kinh doanh, sản phẩm, và vấn đề của CEO.
---------------------------------------------`;

  const systemPrompt = `Bạn là AI Business Architect & CEO Challenger.
Nhiệm vụ: Phỏng vấn CEO để chẩn đoán các vấn đề và rủi ro kinh doanh. 

${profileInfo}

Nguyên tắc ĐẶC BIỆT QUAN TRỌNG:
1. TUYỆT ĐỐI KHÔNG HỎI LẠI những thông tin đã có trong phần thông tin doanh nghiệp (nếu có).
2. BẮT BUỘC: Đặt nhãn cho TẤT CẢ các câu hỏi của bạn theo định dạng: **[Nhãn chủ đề]** Nội dung câu hỏi...?
   (Ví dụ: **[Quy trình vận hành]** Anh chị đang quản lý khách hàng bằng công cụ gì?)
3. Đọc kỹ phần "Khó khăn" và "Ưu tiên 90 ngày" để đặt câu hỏi ĐÀO SÂU tìm nguyên nhân gốc rễ (Root Cause).
4. MỤC TIÊU BẮT BUỘC: Thu thập thông tin xoáy sâu vào: Dòng tiền, Quy trình, Khả năng mở rộng, Dữ liệu.
5. LUẬT PHỎNG VẤN 1 CÂU HỎI MỖI LƯỢT: CHỈ ĐƯỢC PHÉP HỎI ĐÚNG 01 CÂU HỎI trong mỗi lượt hồi đáp. Không gộp nhiều câu.
6. Nếu câu trả lời quá ngắn, không suy diễn, hãy hỏi follow-up.
7. Không đồng ý ngay với CEO. Tìm kiếm giả định sai lầm.

BẮT BUỘC TRẢ VỀ CHÍNH XÁC ĐỊNH DẠNG JSON SAU (Không có markdown block \`\`\`json):
{
  "replyToUser": "DUY NHẤT 01 Câu hỏi/phản biện tiếp theo dành cho CEO (Bắt buộc có nhãn **[Chủ đề]** ở đầu câu hỏi)",
  "aiState": {
    "whatAiKnows": ["Thông tin 1", "Thông tin 2"],
    "whatAiDoesntKnow": ["Thông tin còn thiếu 1"],
    "whatAiNeedsToAsk": "Mục tiêu câu hỏi tiếp",
    "conclusion": "Giả thuyết về vấn đề cốt lõi",
    "evidence": "Câu nói của CEO dùng để suy luận",
    "confidenceLevel": 50
  },
  "isDataSufficientToConclude": false,
  "diagnosticData": {
    "businessValue": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "usp": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "customerInsight": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "management": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "marketing": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "sales": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "revenueDiv": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "scalability": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "operation": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "dataMaturity": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "digitalAssets": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "aiReadiness": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" },
    "ecosystem": { "score": 50, "evidence": "", "reason": "", "risk": "", "recommendation": "" }
  }
}`;

  const payload = {
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents: chatHistory,
    generationConfig: {
      responseMimeType: "application/json",
    }
  };

  const apiKey = customApiKey || (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`API Error HTTP ${response.status}`);
  }

  const result = await response.json();

  if (result.candidates && result.candidates.length > 0) {
    const jsonText = result.candidates[0].content.parts[0].text;
    const cleanJson = jsonText.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
    return JSON.parse(cleanJson);
  }

  throw new Error("Không nhận được phản hồi từ Gemini API");
};
