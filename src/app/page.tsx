"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Download } from "lucide-react";
import UploadForm from "@/components/UploadForm";
import { InvitationData } from "@/types/invitation";
import { CardCanvasRef } from "@/components/CardCanvas";

// Dynamically import Konva components because they need the window object
const CardCanvas = dynamic(() => import("@/components/CardCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[9/16] bg-[#040B16] rounded-2xl animate-pulse flex items-center justify-center border border-[#1A2E4C] shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00D1FF]/10 via-transparent to-transparent"></div>
      <p className="text-[#00D1FF] font-medium tracking-widest relative z-10 font-mono flex items-center gap-2">
        <span className="w-2 h-2 bg-[#00D1FF] rounded-full animate-ping"></span>
        LOADING CANVAS
      </p>
    </div>
  ),
});

export default function Home() {
  const [data, setData] = useState<InvitationData>({
    guestImage: null,
    guestName: "",
    guestTitle: "",
  });

  const [mounted, setMounted] = useState(false);
  const [downloadTrigger, setDownloadTrigger] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (newData: Partial<InvitationData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const handleDownload = () => {
    setDownloadTrigger(Date.now());
  };

  return (
    <div className="min-h-screen bg-[#02050A] text-white">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00D1FF]/5 via-[#02050A] to-[#02050A]"></div>
      </div>

      <main className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A2E4C]/50 border border-[#1A2E4C] text-[#00D1FF] text-sm mb-4 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse"></span>
            VIBE CODING AI 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Thiết kế <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#3B82F6]">Thiệp Mời</span> Sự Kiện
          </h1>
          <p className="text-[#8BA6C4] max-w-2xl mx-auto text-lg">
            Tạo thiệp mời cá nhân hóa cho sự kiện AI lớn nhất năm chỉ với vài thao tác đơn giản.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column: Form & Actions */}
          <div className="w-full lg:w-5/12 space-y-8 sticky top-12">
            <UploadForm data={data} onChange={handleChange} />

            <button
              onClick={handleDownload}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-[#00D1FF] to-[#3B82F6] text-white font-bold text-lg py-5 px-8 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_-10px_rgba(0,209,255,0.5)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Download size={24} className="group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300" />
                <span>TẢI THIỆP NGAY</span>
              </div>
            </button>
          </div>

          {/* Right Column: Preview/Canvas */}
          <div className="w-full lg:w-7/12 flex flex-col items-center">
            <div className="w-full max-w-[400px] lg:max-w-full lg:w-[480px] relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-1 bg-gradient-to-b from-[#00D1FF]/40 to-transparent rounded-3xl blur-md opacity-70"></div>
              <div className="relative border shadow-2xl rounded-2xl overflow-hidden border-[#1A2E4C] bg-[#040B16] w-full">
                {mounted && <CardCanvas data={data} downloadTrigger={downloadTrigger} />}
              </div>
              <p className="text-center text-[#8BA6C4] text-sm mt-6 flex items-center justify-center gap-2">
                Preview thiệp mời theo thời gian thực
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
