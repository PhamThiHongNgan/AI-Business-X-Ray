import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import { 

  IntakeData, 
  BusinessProfile, 
  ChatMessage, 
  AiCognitiveState, 
  DiagnosticData 
} from './types';
import { DEMO_DATA } from './constants';
import { 
  calculateOverallScore, 
  getSortedCriteria, 
  getRadarData, 
  exportToPdf, 
  saveSessionToJson, 
  loadSessionFromJson 
} from './utils';
import { sendGeminiInterview } from './services/geminiService';
import { useHtml2Pdf } from './hooks/useHtml2Pdf';
import { Sidebar } from './components/layout/Sidebar';
import { LoadingOverlay } from './components/common/LoadingOverlay';
import { BusinessIntakeModal } from './components/intake/BusinessIntakeModal';
import {
  WelcomeStep,
  InterviewStep,
  UnderstandingStep,
  XRayStep,
  LevelStep,
  BottlenecksStep,
  ScoreStep,
  CanvasStep,
  PriorityStep,
  RevenueStep,
  HypothesisStep,
  RoadmapStep,
  DNAStep,
  ReportStep
} from './components/steps';

const INITIAL_INTAKE_STATE: IntakeData = {
  q1: '', 
  q2: '', 
  q3: '', 
  q4: '', 
  q5: [], 
  q6: '', 
  q7: '', 
  q8: [], 
  q8_other: '', 
  q9: [], 
  q10: '', 
  q10_other: '', 
  q11: '', 
  q11_other: '', 
  q12: [], 
  q13: ''
};

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState<number>(1); 
  const [, setIsDemoMode] = useState<boolean>(false);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null); 
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  
  const { isPdfReady } = useHtml2Pdf();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  
  // Intake Form States
  const [showIntake, setShowIntake] = useState<boolean>(false);
  const [analyzingStatus, setAnalyzingStatus] = useState<number>(0); // 0: None, 1-5: Loading steps
  const [intakeData, setIntakeData] = useState<IntakeData>(INITIAL_INTAKE_STATE);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  
  // AI Interview State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const [aiState, setAiState] = useState<AiCognitiveState>({
    whatAiKnows: [],
    whatAiDoesntKnow: [],
    whatAiNeedsToAsk: "",
    conclusion: "",
    evidence: "",
    confidenceLevel: 0
  });

  // Initial Message Generator based on Business Profile
  useEffect(() => {
    if (currentStepIndex === 1 && messages.length === 0) {
      if (businessProfile) {
        setMessages([{ 
          role: 'model', 
          text: `Chào bạn, tôi đã nhận hồ sơ của **${businessProfile.q1}**.\n\nƯu tiên lớn nhất của bạn trong 90 ngày tới là:\n*"${businessProfile.q13}"*\n\n**[Nguyên nhân gốc rễ]** Theo bạn, vấn đề này thực chất xuất phát từ khâu nào trong vận hành hoặc chiến lược hiện tại?` 
        }]);
        
        setAiState({
          whatAiKnows: [
            `Tên: ${businessProfile.q1}`,
            `Sản phẩm: ${businessProfile.q3.substring(0, 50)}...`,
            `Thị trường: ${businessProfile.q5.join(', ')}`,
            `Ưu tiên 90 ngày: ${businessProfile.q13.substring(0, 50)}...`
          ],
          whatAiDoesntKnow: [
            "Nguyên nhân sâu xa của vấn đề ưu tiên",
            "Dòng tiền và cơ cấu chi phí hiện tại",
            "Mức độ sẵn sàng chuẩn hóa quy trình"
          ],
          whatAiNeedsToAsk: "Đào sâu vào root cause của ưu tiên 90 ngày.",
          conclusion: `Dựa trên Intake, CEO đang gặp khó khăn ở khâu: ${businessProfile.q12.join(', ')}. Cần xác minh xem đây là lỗi hệ thống hay do biến động thị trường.`,
          evidence: businessProfile.q13,
          confidenceLevel: 25
        });
      } else {
        setMessages([{ 
          role: 'model', 
          text: "Chào bạn, tôi là AI Business Architect.\n\nĐể tôi có thể giúp bạn chẩn đoán vấn đề, hãy chia sẻ ngắn gọn về mô hình kinh doanh hiện tại và khó khăn lớn nhất doanh nghiệp đang gặp phải là gì?" 
        }]);
        
        setAiState({
          whatAiKnows: ["Chưa có thông tin doanh nghiệp"],
          whatAiDoesntKnow: ["Mô hình kinh doanh", "Sản phẩm/Dịch vụ", "Thách thức hiện tại"],
          whatAiNeedsToAsk: "Thu thập thông tin tổng quan từ người dùng.",
          conclusion: "Đang chờ dữ liệu đầu vào từ người dùng.",
          evidence: "",
          confidenceLevel: 10
        });
      }
    }
  }, [currentStepIndex, businessProfile, messages.length]);

  const handleSendInterview = async () => {
    if (!input.trim() || isTyping) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await sendGeminiInterview(newMessages, businessProfile);
      
      setMessages(prev => [...prev, { role: 'model', text: aiResponse.replyToUser }]);
      if (aiResponse.aiState) {
        setAiState(aiResponse.aiState);
      }
      
      const questionCount = Math.floor(newMessages.length / 2);
      if (aiResponse.isDataSufficientToConclude || (aiResponse.aiState && aiResponse.aiState.confidenceLevel >= 85) || questionCount >= 8) {
        setMaxUnlockedStep(2); 
        
        if (aiResponse.diagnosticData) {
          setDiagnosticData(aiResponse.diagnosticData);
        } else {
          setDiagnosticData(DEMO_DATA); 
        }

        setTimeout(() => {
          setCurrentStepIndex(2);
          setMaxUnlockedStep(13); 
        }, 3000);
      }
    } catch (error: any) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `Lỗi hệ thống: ${error.message}. (Vui lòng xem Console F12 để biết chi tiết lỗi hoặc kiểm tra lại file .env).` 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExportData = () => {
    saveSessionToJson({
      intakeData,
      businessProfile,
      messages,
      aiState,
      diagnosticData,
      maxUnlockedStep,
      currentStepIndex
    });
  };

  const handleImportData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const state = await loadSessionFromJson(file);
      if (state.intakeData) setIntakeData(state.intakeData);
      if (state.businessProfile) setBusinessProfile(state.businessProfile);
      if (state.messages) setMessages(state.messages);
      if (state.aiState) setAiState(state.aiState);
      if (state.diagnosticData) setDiagnosticData(state.diagnosticData);
      if (state.maxUnlockedStep) setMaxUnlockedStep(state.maxUnlockedStep);
      
      alert("Nạp dữ liệu thành công! Bạn có thể tiếp tục xem các tab phân tích.");
      setShowIntake(false);

      if (state.maxUnlockedStep && state.maxUnlockedStep > 1) {
        setCurrentStepIndex(3); // Jump to X-Ray
      } else if (state.businessProfile) {
        setCurrentStepIndex(1); // Jump to interview
      }
    } catch (error: any) {
      alert(error.message || "File dữ liệu không hợp lệ.");
    }
  };

  const unlockDemoDashboard = () => {
    setIsDemoMode(true);
    setDiagnosticData(DEMO_DATA);
    setMaxUnlockedStep(13);
    setCurrentStepIndex(3);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleIntakeSubmit = async () => {
    setAnalyzingStatus(1);
    await delay(1200);
    setAnalyzingStatus(2); 
    await delay(1200);
    setAnalyzingStatus(3); 
    await delay(1200);
    setAnalyzingStatus(4); 
    await delay(1500);
    setAnalyzingStatus(5); 
    await delay(1500);
    
    // Save state and transition
    setBusinessProfile(intakeData);
    setAnalyzingStatus(0);
    setShowIntake(false);
    
    if (messages.length === 0 || currentStepIndex === 0) {
      setCurrentStepIndex(1); 
      setMaxUnlockedStep(prev => Math.max(prev, 1));
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    await exportToPdf({
      elementId: 'report-pdf-content',
      filename: `AI_Business_XRay_${businessProfile?.q1 ? businessProfile.q1.replace(/\s+/g, '_') : 'Report'}.pdf`
    });
    setIsGeneratingPDF(false);
  };

  const activeData = diagnosticData || DEMO_DATA;
  const scoringResult = useMemo(() => calculateOverallScore(activeData), [activeData]);
  const radarData = useMemo(() => getRadarData(activeData), [activeData]);
  const sortedDataList = useMemo(() => getSortedCriteria(activeData), [activeData]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#050810] text-slate-200 font-sans font-medium overflow-hidden selection:bg-indigo-500/30 print:h-auto print:bg-white print:text-slate-900 print:overflow-visible text-[16px] md:text-[18px]">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0B1120] border-b border-slate-800 z-40 shrink-0">
        <div className="flex items-center text-indigo-400">
          <Cpu className="w-5 h-5 mr-2" />
          <span className="text-base font-black tracking-widest">AI X-RAY</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-800 rounded-lg">
          {isSidebarOpen ? <X className="w-5 h-5 text-slate-300" /> : <Menu className="w-5 h-5 text-slate-300" />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-300 ease-in-out z-50 md:z-0 flex shrink-0`}>
        <Sidebar 
          currentStepIndex={currentStepIndex}
          maxUnlockedStep={maxUnlockedStep}
          onSelectStep={(idx) => {
            setCurrentStepIndex(idx);
            setIsSidebarOpen(false);
          }}
        />
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 -z-10 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
        )}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed print:bg-none print:bg-white print:overflow-visible print:block">
        
        {/* Step 0: Welcome & Intake Form */}
        {currentStepIndex === 0 && (
          analyzingStatus > 0 ? (
            <LoadingOverlay status={analyzingStatus} />
          ) : showIntake ? (
            <BusinessIntakeModal 
              intakeData={intakeData}
              onChangeIntakeData={setIntakeData}
              onSubmit={handleIntakeSubmit}
              isUpdate={!!businessProfile}
            />
          ) : (
            <WelcomeStep 
              businessProfile={businessProfile}
              onOpenIntake={() => setShowIntake(true)}
              onUnlockDemo={unlockDemoDashboard}
              onImportFile={handleImportData}
            />
          )
        )}

        {/* Step 1: AI Interview */}
        {currentStepIndex === 1 && (
          <InterviewStep 
            businessProfile={businessProfile}
            messages={messages}
            input={input}
            isTyping={isTyping}
            aiState={aiState}
            onChangeInput={setInput}
            onSendMessage={handleSendInterview}
          />
        )}

        {/* Step 2: AI Understanding */}
        {currentStepIndex === 2 && (
          <UnderstandingStep aiState={aiState} />
        )}

        {/* Step 3: Business X-Ray */}
        {currentStepIndex === 3 && (
          <XRayStep 
            scoringResult={scoringResult}
            radarData={radarData}
          />
        )}

        {/* Step 4: Business Maturity Level */}
        {currentStepIndex === 4 && (
          <LevelStep scoringResult={scoringResult} />
        )}

        {/* Step 5: Bottlenecks (Root Cause Analysis) */}
        {currentStepIndex === 5 && (
          <BottlenecksStep sortedDataList={sortedDataList} />
        )}

        {/* Step 6: Detailed Diagnostic Scores */}
        {currentStepIndex === 6 && (
          <ScoreStep sortedDataList={sortedDataList} />
        )}

        {/* Step 7: Digital Business Canvas */}
        {currentStepIndex === 7 && (
          <CanvasStep activeData={activeData} />
        )}

        {/* Step 8: Action Priorities */}
        {currentStepIndex === 8 && (
          <PriorityStep sortedDataList={sortedDataList} />
        )}

        {/* Step 9: Revenue Engine */}
        {currentStepIndex === 9 && (
          <RevenueStep activeData={activeData} />
        )}

        {/* Step 10: Revenue Hypothesis */}
        {currentStepIndex === 10 && (
          <HypothesisStep activeData={activeData} />
        )}

        {/* Step 11: Transformation Roadmap */}
        {currentStepIndex === 11 && (
          <RoadmapStep sortedDataList={sortedDataList} />
        )}

        {/* Step 12: Business DNA Profile */}
        {currentStepIndex === 12 && (
          <DNAStep 
            sortedDataList={sortedDataList}
            aiState={aiState}
          />
        )}

        {/* Step 13: Executive Report */}
        {currentStepIndex === 13 && (
          <ReportStep 
            businessProfile={businessProfile}
            diagnosticData={diagnosticData}
            activeData={activeData}
            scoringResult={scoringResult}
            sortedDataList={sortedDataList}
            aiState={aiState}
            isPdfReady={isPdfReady}
            isGeneratingPDF={isGeneratingPDF}
            onExportJson={handleExportData}
            onDownloadPDF={handleDownloadPDF}
          />
        )}

      </main>

    </div>
  );
}
