'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PillButton } from '@/components/ui/PillButton';
import { SolidButton } from '@/components/ui/SolidButton';
import { CurriculumTopic } from '@/lib/types';
import { submitVideoCompletion, fetchGradeLockStates } from '@/app/actions/progression';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface StandardVideoPlayerProps {
  topic: CurriculumTopic;
  backToTopicsHref: string;
  isExploreVariant?: boolean;
  gameHref?: string;
}

export function StandardVideoPlayer({
  topic,
  backToTopicsHref,
  isExploreVariant = false,
  gameHref,
}: StandardVideoPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function checkCompletion() {
      try {
        const states = await fetchGradeLockStates(topic.grade);
        const cur = states.find(s => s.topicId === topic.id);
        if (mounted && cur?.isVideoCompleted) {
          setIsCompleted(true);
        }
      } catch (err) {
        // ignore
      }
    }
    checkCompletion();
    return () => {
      mounted = false;
    };
  }, [topic]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = async () => {
      setIsPlaying(false);
      setIsCompleted(true);
      // Validate completion with server
      await submitVideoCompletion(topic.grade, topic.id, video.duration || 1);
      router.refresh();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [topic, router]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const seekTime = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const handlePlayGameClick = () => {
    if (!isCompleted) return;
    // Silent auto-pause rule
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    if (gameHref) {
      router.push(gameHref);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Top Bar: Back to Topics */}
      <div className="w-full flex items-center justify-between mb-4">
        <PillButton href={backToTopicsHref}>
          Back To Topics
        </PillButton>
        <span className="font-extrabold text-xl text-brand-blue">
          {topic.title}
        </span>
      </div>

      {/* Video Canvas Container */}
      <div className="relative w-full aspect-video bg-white rounded-3xl overflow-hidden border-4 border-brand-blue/20 shadow-card flex items-center justify-center group">
        <video
          ref={videoRef}
          src={topic.videoSrc}
          className="w-full h-full object-contain bg-white"
          playsInline
          onClick={togglePlay}
        />

        {/* Big Center Play Button (shown when paused) */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play video"
            className="absolute inset-0 m-auto w-20 h-20 md:w-24 md:h-24 rounded-full bg-brand-blue/90 hover:bg-brand-blue text-white flex items-center justify-center shadow-active active:scale-95 transition-all z-20 cursor-pointer"
          >
            <Play className="w-10 h-10 md:w-12 md:h-12 fill-current translate-x-1" />
          </button>
        )}

        {/* Bottom Custom Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-white/95 border-t border-brand-blue/20 px-4 py-3 flex items-center gap-4 z-20 transition-opacity">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            className="text-brand-blue hover:text-brand-orange transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
          </button>

          {/* Progress Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-2.5 bg-brand-yellow rounded-lg appearance-none cursor-pointer accent-brand-orange"
          />

          {/* Volume Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="text-brand-blue hover:text-brand-orange transition-colors"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullScreen}
            aria-label="Fullscreen"
            className="text-brand-blue hover:text-brand-orange transition-colors"
          >
            <Maximize className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Action Zone Below Video */}
      <div className="w-full mt-6 flex flex-col items-center gap-4">
        {/* Conditional Play Game CTA */}
        {topic.hasGame && !isExploreVariant && (
          <div className="flex flex-col items-center gap-2">
            <SolidButton
              variant="orange"
              onClick={handlePlayGameClick}
              disabled={!isCompleted}
              className={`text-xl md:text-2xl px-12 py-4 transition-all ${
                !isCompleted ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Play Game
            </SolidButton>
            {!isCompleted && (
              <span className="text-sm font-semibold text-brand-blue/70">
                🔒 Watch video completely to unlock game
              </span>
            )}
          </div>
        )}

        {/* Explore Notice Banner */}
        {isExploreVariant && (
          <div className="w-full max-w-md py-4 px-6 rounded-2xl bg-brand-yellow border-2 border-brand-yellow text-brand-blue font-extrabold text-center text-lg md:text-xl shadow-sm">
            Games will be in future update.
          </div>
        )}

        {/* Video completed feedback */}
        {isCompleted && !topic.hasGame && (
          <div className="text-brand-blue font-bold text-base md:text-lg animate-pulse">
            ✨ Video completed! Next topic is now unlocked.
          </div>
        )}

        {/* Secondary Back to Home anchor */}
        <div className="mt-4">
          <PillButton href="/home" icon={false}>
            Back To Home
          </PillButton>
        </div>
      </div>
    </div>
  );
}
