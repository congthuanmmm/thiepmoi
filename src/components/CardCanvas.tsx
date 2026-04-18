"use client";

import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Text, Rect, Group, Circle, Line } from 'react-konva';
import useImage from 'use-image';
import { CARD_CONFIG } from '@/lib/card-config';
import { InvitationData } from '@/types/invitation';

interface CardCanvasProps {
    data: InvitationData;
    downloadTrigger?: number;
}

const CardCanvas = ({ data, downloadTrigger }: CardCanvasProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stageRef = useRef<any>(null);
    const [banner] = useImage('/banner.jpg');
    const [guestImg] = useImage(data.guestImage || '', 'anonymous');
    const [qrCode] = useImage('/qr.png');

    useEffect(() => {
        if (!downloadTrigger || downloadTrigger === 0) return;
        if (!stageRef.current) return;

        try {
            // Optimization: Use pixelRatio: 1 for 1080x1920 (already high res)
            const uri = stageRef.current.toDataURL({
                pixelRatio: 1,
                mimeType: 'image/png'
            });

            if (!uri || uri === 'data:,') {
                throw new Error("Canvas data is empty");
            }

            const link = document.createElement('a');
            link.download = `ThiepMoi-${(data.guestName || 'AI-Event').replace(/\s+/g, '-')}.png`;
            link.href = uri;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            setTimeout(() => {
                document.body.removeChild(link);
            }, 200);
        } catch (err) {
            console.error("Download error:", err);
            alert("Lỗi tải ảnh. Nếu bạn đang dùng iPhone/Zalo, hãy nhấn giữ vào ảnh thiệp để lưu hoặc chụp màn hình nhé!");
        }
    }, [downloadTrigger, data.guestName]);

    const getCrop = (image: HTMLImageElement, containerWidth: number, containerHeight: number) => {
        const imageRatio = image.width / image.height;
        const containerRatio = containerWidth / containerHeight;
        let newWidth = image.width;
        let newHeight = image.height;
        let x = 0;
        let y = 0;

        if (containerRatio > imageRatio) {
            newHeight = image.width / containerRatio;
            y = (image.height - newHeight) / 2;
        } else {
            newWidth = image.height * containerRatio;
            x = (image.width - newWidth) / 2;
        }

        return { x, y, width: newWidth, height: newHeight };
    };

    // Adjusted Card dimensions for the V2 template
    const cardWidth = 800;
    const cardHeight = 960;
    const cardY = 60;

    return (
        <Stage
            width={CARD_CONFIG.width}
            height={CARD_CONFIG.height}
            ref={stageRef}
            style={{
                width: '100%',
                height: 'auto',
                maxWidth: '100%',
                aspectRatio: '1080 / 1920',
                backgroundColor: CARD_CONFIG.colors.background,
            }}
            scaleX={1}
            scaleY={1}
        >
            <Layer>
                {/* Background Full Banner */}
                <Rect width={CARD_CONFIG.width} height={CARD_CONFIG.height} fill={CARD_CONFIG.colors.background} />
                {banner && (
                    <KonvaImage
                        image={banner}
                        x={0}
                        y={0}
                        width={CARD_CONFIG.width}
                        height={CARD_CONFIG.height}
                        crop={getCrop(banner, CARD_CONFIG.width, CARD_CONFIG.height)}
                    />
                )}

                {/* Glassmorphism Card Overlay */}
                {/* Scaled up by 10% as requested, adjusting X to keep it centered */}
                <Group x={(CARD_CONFIG.width - cardWidth * 1.1) / 2} y={cardY} scaleX={1.1} scaleY={1.1}>
                    {/* Glowing Box */}
                    <Rect
                        width={cardWidth}
                        height={cardHeight}
                        cornerRadius={40}
                        fill={CARD_CONFIG.colors.cardBackground}
                        stroke={CARD_CONFIG.colors.primary}
                        strokeWidth={2}
                        shadowColor={CARD_CONFIG.colors.primary}
                        shadowBlur={50}
                        shadowOpacity={0.6}
                        shadowOffset={{ x: 0, y: 0 }}
                    />

                    {/* KÍNH MỜI TEXT */}
                    <Text
                        text="TRÂN TRỌNG KÍNH MỜI"
                        x={0}
                        y={40}
                        width={cardWidth}
                        align="center"
                        fontSize={36}
                        fontFamily="Montserrat"
                        fontStyle="bold"
                        fill={CARD_CONFIG.colors.primary}
                        letterSpacing={2}
                    />

                    {/* Guest Image Avatar */}
                    <Group x={cardWidth / 2} y={180}>
                        <Circle radius={72} fill={CARD_CONFIG.colors.primary} shadowColor={CARD_CONFIG.colors.primary} shadowBlur={20} opacity={0.5} />
                        <Circle radius={70} fill={CARD_CONFIG.colors.background} stroke={CARD_CONFIG.colors.primary} strokeWidth={4} />
                        {guestImg && (
                            <Group clipFunc={(ctx) => { ctx.arc(0, 0, 68, 0, Math.PI * 2, false); }}>
                                <KonvaImage
                                    image={guestImg}
                                    x={-68}
                                    y={-68}
                                    width={136}
                                    height={136}
                                />
                            </Group>
                        )}
                    </Group>

                    {/* Guest Name & Title */}
                    <Text
                        text={data.guestName ? data.guestName.toUpperCase() : "TÊN KHÁCH MỜI"}
                        x={0}
                        y={280}
                        width={cardWidth}
                        align="center"
                        fontSize={44}
                        fontFamily="Montserrat"
                        fontStyle="bold"
                        fill={CARD_CONFIG.colors.text}
                    />
                    <Text
                        text={data.guestTitle || "Chức danh / Công ty"}
                        x={0}
                        y={340}
                        width={cardWidth}
                        align="center"
                        fontSize={26}
                        fontFamily="Be Vietnam Pro"
                        fontStyle="italic"
                        fill={CARD_CONFIG.colors.primaryMuted}
                    />

                    {/* Separator inside Card */}
                    <Rect
                        x={cardWidth / 2 - 80}
                        y={400}
                        width={160}
                        height={2}
                        fill={CARD_CONFIG.colors.primary}
                        cornerRadius={1}
                        opacity={0.5}
                    />

                    {/* Timeline Section */}
                    {/* Position lower inside the card */}
                    <Group x={0} y={430}>
                        <Text
                            text="ỨNG DỤNG AI AGENT - VIBE CODING - AI VIDEO"
                            width={cardWidth}
                            align="center"
                            fontSize={24}
                            fontFamily="Montserrat"
                            fontStyle="bold"
                            fill={CARD_CONFIG.colors.primary}
                            letterSpacing={1}
                            y={0}
                        />

                        {/* Rendering the Timeline */}
                        <Group y={60} x={40}>
                            {/* Vertical cyan thin line */}
                            <Line
                                points={[30, 10, 30, (CARD_CONFIG.timeline.length - 1) * 50 + 10]}
                                stroke={CARD_CONFIG.colors.primary}
                                strokeWidth={1}
                                opacity={0.4}
                            />

                            {CARD_CONFIG.timeline.map((item, index) => {
                                const yPos = index * 50;
                                // Approximate text width for the bold speaker name
                                const speakerWidth = item.speaker.length * 10;

                                return (
                                    <Group key={index} y={yPos} x={0}>
                                        {/* Glowing dot */}
                                        <Circle x={30} y={10} radius={4} fill={CARD_CONFIG.colors.primary} shadowColor={CARD_CONFIG.colors.primary} shadowBlur={10} />

                                        {/* Time */}
                                        <Text x={50} y={0} text={item.time} fill={CARD_CONFIG.colors.primary} fontSize={18} fontFamily="Inter" fontStyle="bold" />

                                        {/* Divider */}
                                        <Text x={185} y={0} text="|" fill={CARD_CONFIG.colors.primaryMuted} fontSize={18} fontFamily="Inter" />

                                        {/* Speaker */}
                                        <Text x={200} y={0} text={item.speaker} fill={CARD_CONFIG.colors.text} fontSize={18} fontFamily="Inter" fontStyle="bold" />

                                        {/* Topic */}
                                        {item.topic && (
                                            <Text x={200 + speakerWidth + 10} y={2} text={`— ${item.topic}`} fill={CARD_CONFIG.colors.text} fontSize={15} fontFamily="Inter" fontStyle="normal" opacity={0.9} />
                                        )}
                                    </Group>
                                );
                            })}
                        </Group>
                    </Group>

                    {/* Footer / QR / Time inside card */}
                    <Group y={cardHeight - 140}>
                        {/* Time */}
                        <Text
                            text="Thời gian : 19h30 24/04/2026"
                            x={0}
                            y={40}
                            width={cardWidth}
                            align="center"
                            fontSize={26}
                            fontFamily="Montserrat"
                            fontStyle="bold"
                            fill={CARD_CONFIG.colors.text}
                        />

                        {/* QR Code */}
                        {qrCode && (
                            <KonvaImage
                                image={qrCode}
                                x={cardWidth - 140}
                                y={10}
                                width={90}
                                height={90}
                                cornerRadius={8}
                            />
                        )}
                        <Text
                            text="QUÉT MÃ ĐỂ ĐĂNG KÝ"
                            x={cardWidth - 200}
                            y={110}
                            width={210}
                            align="center"
                            fontSize={12}
                            fontFamily="Inter"
                            fontStyle="normal"
                            fill={CARD_CONFIG.colors.textMuted}
                        />
                    </Group>
                </Group>
            </Layer>
        </Stage>
};

CardCanvas.displayName = 'CardCanvas';

export default CardCanvas;
