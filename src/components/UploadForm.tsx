"use client";

import React, { ChangeEvent, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { InvitationData } from '@/types/invitation';
import { cn } from '@/lib/utils';

interface UploadFormProps {
    data: InvitationData;
    onChange: (data: Partial<InvitationData>) => void;
}

export default function UploadForm({ data, onChange }: UploadFormProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onChange({ guestImage: event.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ [name]: value });
    };

    return (
        <div className="flex flex-col gap-6 p-6 bg-[#0B1527] border border-[#1A2E4C] rounded-2xl shadow-2xl">
            <div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00D1FF] to-[#3B82F6]">
                    Thông Tin Khách Mời
                </h2>
                <p className="text-[#8BA6C4] mt-1 text-sm">Điền thông tin để tạo thiệp mời cá nhân hóa</p>
            </div>

            <div className="space-y-4">
                {/* Upload Image */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#E2E8F0]">Ảnh đại diện</label>
                    <div
                        className={cn(
                            "relative border-2 border-dashed rounded-xl p-4 transition-all hover:bg-[#1A2E4C]/50 cursor-pointer overflow-hidden group",
                            data.guestImage ? "border-[#00D1FF]" : "border-[#1A2E4C]"
                        )}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {data.guestImage ? (
                            <div className="flex items-center gap-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={data.guestImage} alt="Guest" className="w-16 h-16 rounded-full object-cover border-2 border-[#00D1FF]" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-white">Ảnh đã tải lên</p>
                                    <p className="text-xs text-[#8BA6C4]">Click để thay đổi</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onChange({ guestImage: null }); }}
                                    className="p-2 bg-[#1A2E4C] rounded-full hover:bg-red-500/20 hover:text-red-400 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-[#1A2E4C] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload size={20} className="text-[#00D1FF]" />
                                </div>
                                <p className="text-sm font-medium text-white">Upload ảnh của bạn</p>
                                <p className="text-xs text-[#8BA6C4] mt-1">Đề xuất tỉ lệ 1:1, max 5MB</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Guest Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#E2E8F0]">Họ và Tên</label>
                    <input
                        type="text"
                        name="guestName"
                        value={data.guestName}
                        onChange={handleChange}
                        placeholder="VD: Nguyễn Văn A"
                        className="w-full bg-[#040B16] border border-[#1A2E4C] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00D1FF] focus:border-transparent transition-all placeholder:text-[#4A6482]"
                    />
                </div>

                {/* Guest Title */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-[#E2E8F0]">Chức danh / Đơn vị</label>
                    <input
                        type="text"
                        name="guestTitle"
                        value={data.guestTitle}
                        onChange={handleChange}
                        placeholder="VD: CEO / Vibe Coding"
                        className="w-full bg-[#040B16] border border-[#1A2E4C] text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00D1FF] focus:border-transparent transition-all placeholder:text-[#4A6482]"
                    />
                </div>
            </div>
        </div>
    );
}
