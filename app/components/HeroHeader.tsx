"use client";

import { useState, useEffect } from "react";
import TextType from "../blocks/TextAnimations/TextType/TextType";

// Custom hook to manage typing sequence
const useTypingSequence = () => {
  const [mainTypingComplete, setMainTypingComplete] = useState(false);
  const [subtitleStarted, setSubtitleStarted] = useState(false);

  useEffect(() => {
    if (mainTypingComplete && !subtitleStarted) {
      // Start subtitle after a brief delay
      const timer = setTimeout(() => {
        setSubtitleStarted(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mainTypingComplete, subtitleStarted]);

  return {
    mainTypingComplete,
    setMainTypingComplete,
    subtitleStarted
  };
};

export default function BrandHeader() {
  const { mainTypingComplete, setMainTypingComplete, subtitleStarted } = useTypingSequence();

  // Debug logging
  console.log('BrandHeader state:', { mainTypingComplete, subtitleStarted });

  return (
    <div 
      style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        textAlign: 'center',
        pointerEvents: 'none'
      }}
    >
      {/* Main Brand Name - Types once and stays */}
      <div style={{ position: 'relative' }}>
        <TextType 
          text="ctrl+/"
          style={{
            fontSize: 'clamp(3rem, 12vw, 12rem)',
            fontFamily: 'monospace',
            fontWeight: '900',
            color: 'white',
            textShadow: '0 0 20px rgba(0,0,0,0.8)',
            letterSpacing: '0.1em'
          }}
          className="font-mono"
          typingSpeed={75}
          showCursor={false}
          loop={false}
          startOnVisible={true}
          onSentenceComplete={() => setMainTypingComplete(true)}
        />
        
        {/* Subtitle - Positioned relative to main brand name */}
        {subtitleStarted && (
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginTop: '2rem',
              whiteSpace: 'nowrap'
            }}
          >
            <TextType 
              text={["50+ Languages", "100+ Frameworks", "500+ APIs", "1000+ Packages"]}
              style={{
                fontSize: 'clamp(1rem, 4vw, 3rem)',
                fontFamily: 'monospace',
                fontWeight: '600',
                color: '#e5e7eb',
                textShadow: '0 0 10px rgba(0,0,0,0.8)',
                letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
              className="font-mono"
              typingSpeed={50}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="_"
              cursorClassName="text-gray-300"
              loop={true}
              startOnVisible={true}
            />
          </div>
        )}
      </div>
    </div>
  );
} 