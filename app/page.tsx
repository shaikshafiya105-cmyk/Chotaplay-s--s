'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IntroPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Auto-play on mount
    video.play().catch(() => {
      // If browser blocks autoplay with sound, continue video muted
      video.muted = true;
      video.play();
    });

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      router.push('/home');
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [router]);

  const handleSkip = () => {
    router.push('/home');
  };

  return (
    <main
      onClick={handleSkip}
      className="fixed inset-0 w-screen h-screen bg-white flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
    >
      {/* Full-bleed Intro Video */}
      <video
        ref={videoRef}
        src="/videos/introduction%20video.mp4"
        className="w-full h-full object-contain"
        playsInline
        autoPlay
      />

      {/* Thin Blue Progress Indicator */}
      <div className="absolute bottom-0 inset-x-0 h-1.5 bg-brand-yellow/30">
        <div
          className="h-full bg-brand-blue transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </main>
  );
}
