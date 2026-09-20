'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { PillButton } from '@/components/ui/PillButton';
import { SolidButton } from '@/components/ui/SolidButton';
import { CurriculumTopic } from '@/lib/types';
import { requestGameSession, submitGameCompletion } from '@/app/actions/progression';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface GamePlayerProps {
  topic: CurriculumTopic;
  backToVideoHref: string;
  nextTopicHref?: string;
}

export function GamePlayer({ topic, backToVideoHref, nextTopicHref }: GamePlayerProps) {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize single-use session token
  useEffect(() => {
    let mounted = true;
    async function initSession() {
      try {
        const token = await requestGameSession(topic.grade, topic.id);
        if (mounted) setSessionToken(token);
      } catch (err) {
        console.error('Failed to create game session', err);
      }
    }
    initSession();
    return () => {
      mounted = false;
    };
  }, [topic]);

  // Listen for genuine completion message from game iframe or bridge
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data?.type === 'CHOTAPLAY_GAME_COMPLETE') {
        if (isSubmitting || isCompleted) return;
        setIsSubmitting(true);
        try {
          const tokenToUse = event.data?.token || sessionToken;
          if (!tokenToUse) {
            console.warn('Game completed event received before token initialization; requesting session fallback...');
            const fallbackToken = await requestGameSession(topic.grade, topic.id);
            const res = await submitGameCompletion(fallbackToken, topic.id, topic.grade);
            if (res.success) {
              setIsCompleted(true);
              router.refresh();
            }
          } else {
            const res = await submitGameCompletion(tokenToUse, topic.id, topic.grade);
            if (res.success) {
              setIsCompleted(true);
              router.refresh();
            }
          }
        } catch (err) {
          console.error('Completion validation error:', err);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [sessionToken, topic, isSubmitting, isCompleted, router]);

  // Game completion bridge injection into iframe on load
  const handleIframeLoad = () => {
    try {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow) return;

      const topicId = topic.id;
      const curToken = sessionToken || '';
      const bridgeScript = `
        (function() {
          let hasNotified = false;
          function notifyComplete() {
            if (hasNotified) return;
            hasNotified = true;
            try {
              window.parent.postMessage({ type: 'CHOTAPLAY_GAME_COMPLETE', token: '${curToken}' }, '*');
            } catch (err) {
              console.warn('Bridge postMessage error', err);
            }
          }

          function checkElementTrulyVisible(el) {
            if (!el) return false;
            if (el.classList.contains('hidden') || el.hasAttribute('hidden')) return false;
            
            // Check bounding rect and offsetParent
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return false;

            let cur = el;
            while (cur && cur !== document.body) {
              const style = window.getComputedStyle(cur);
              if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
                return false;
              }
              if (cur.classList.contains('hidden') || cur.hasAttribute('hidden')) {
                return false;
              }
              cur = cur.parentElement;
            }
            return true;
          }

          function checkVictory() {
            if (hasNotified) return true;

            // Topic-specific verified grand finale containers
            if ('${topicId}' === 'ukg-01') {
              // UKG Vowels: strictly all 5 vowels complete in finale scene
              const finale = document.getElementById('scene-finale');
              if (finale && checkElementTrulyVisible(finale)) {
                notifyComplete();
                return true;
              }
              return false;
            }

            if ('${topicId}' === 'lkg-14') {
              // LKG Difference: finale scene only
              const finale = document.getElementById('scene-celebration') || document.getElementById('screen-finale');
              if (finale && checkElementTrulyVisible(finale)) {
                notifyComplete();
                return true;
              }
              return false;
            }

            if ('${topicId}' === 'ukg-19') {
              // UKG These & Those: Zone 7 Grand Celebration
              const finale = document.getElementById('screen-celebration');
              if (finale && checkElementTrulyVisible(finale)) {
                notifyComplete();
                return true;
              }
              return false;
            }

            if ('${topicId}' === 'first-03' || '${topicId}' === 'act-04') {
              // 1st Class Colours: World complete screen only
              const completeScreen = document.getElementById('world-complete-screen');
              if (completeScreen && checkElementTrulyVisible(completeScreen)) {
                notifyComplete();
                return true;
              }
              return false;
            }

            // General confirmed full-game victory screens (only when truly rendered & visible)
            const victorySelectors = [
              '#world-complete-screen',
              '#overlay-victory',
              '#screen-finale',
              '#victory-screen',
              '#scene-final-celebration'
            ];

            for (const selector of victorySelectors) {
              const el = document.querySelector(selector);
              if (el && checkElementTrulyVisible(el)) {
                notifyComplete();
                return true;
              }
            }
            return false;
          }

          const observer = new MutationObserver(() => {
            checkVictory();
          });

          if (document.body) {
            observer.observe(document.body, { attributes: true, childList: true, subtree: true });
          }
          setInterval(checkVictory, 500);
        })();
      `;

      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (doc && doc.body) {
          const script = doc.createElement('script');
          script.textContent = bridgeScript;
          doc.body.appendChild(script);
        }
      } catch (e) {
        // Cross-origin fallback
      }
    } catch (e) {
      console.warn('Iframe bridge initialization note:', e);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 flex flex-col items-center">
      {/* Top Bar: Back to Video & Get Game CTA */}
      <div className="w-full flex items-center justify-between mb-4">
        <PillButton href={backToVideoHref}>
          Back
        </PillButton>

        <h2 className="font-extrabold text-xl md:text-2xl text-brand-blue">
          {topic.title}
        </h2>

        <SolidButton
          variant="orange"
          onClick={() => {
            if (iframeRef.current) {
              iframeRef.current.src = iframeRef.current.src;
            }
          }}
          className="py-2.5 px-6 text-base md:text-lg"
        >
          Get Game
        </SolidButton>
      </div>

      {/* Game Canvas Box */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] max-h-[75vh] bg-white rounded-3xl overflow-hidden border-4 border-brand-blue/30 shadow-card">
        {topic.gamePath ? (
          <iframe
            ref={iframeRef}
            src={topic.gamePath}
            onLoad={handleIframeLoad}
            className="w-full h-full border-0"
            title={topic.title}
            sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-brand-yellow/20">
            <p className="text-brand-blue font-extrabold text-xl">
              This topic is video-based.
            </p>
          </div>
        )}

        {/* Celebratory Game Completed Overlay (only on genuine full completion) */}
        {isCompleted && (
          <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 text-center z-50 animate-in fade-in zoom-in duration-300">
            {/* Spark Motif */}
            <div className="w-24 h-24 rounded-full bg-brand-yellow border-4 border-brand-orange flex items-center justify-center text-brand-orange mb-4 shadow-active animate-bounce">
              <Sparkles className="w-12 h-12 stroke-[2.5]" />
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-brand-blue mb-2">
              Game Completed!
            </h1>

            <p className="text-lg md:text-xl font-bold text-brand-blue/80 mb-6 max-w-md">
              Great job! You have mastered {topic.title} and unlocked the next topic.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {nextTopicHref && (
                <SolidButton
                  variant="orange"
                  href={nextTopicHref}
                  className="text-lg md:text-xl px-8 py-3.5"
                >
                  Next Topic
                </SolidButton>
              )}
              <PillButton href={backToVideoHref} icon={false}>
                Back To Topic
              </PillButton>
            </div>
          </div>
        )}
      </div>

      {/* Base Anchor: Back to Home */}
      <div className="mt-4">
        <PillButton href="/home" icon={false}>
          Back To Home
        </PillButton>
      </div>
    </div>
  );
}
