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

// Waitlist form component
const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage("Adding...");

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbzpIdtTPbJMSYEveyd1hS5jNS4YtfjDNa_1DCTeO4VfWhenyAcUldHvBdI4RwJ-efbR/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          ua: navigator.userAgent
        })
      });
      
      const data = await res.json();
      if (data.ok) {
        setMessage("You're in! 🎉");
        setEmail("");
      } else {
        setMessage(data.msg || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Network error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '12px', 
      alignItems: 'center', 
      marginTop: '1.5rem',
      width: '100%',
      maxWidth: '600px'
    }}>
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '1px solid rgba(229, 231, 235, 0.3)',
          borderRadius: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: 'white',
          fontFamily: 'monospace',
          fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
          outline: 'none',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'rgba(229, 231, 235, 0.6)';
          e.target.style.boxShadow = '0 0 15px rgba(229, 231, 235, 0.2)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(229, 231, 235, 0.3)';
          e.target.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
        }}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '12px 20px',
          border: '0',
          borderRadius: '8px',
          cursor: isSubmitting ? 'not-allowed' : 'pointer',
          backgroundColor: 'rgba(229, 231, 235, 0.9)',
          color: '#1f2937',
          fontFamily: 'monospace',
          fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
          fontWeight: '600',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)'
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = 'rgba(229, 231, 235, 1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 2px 15px rgba(229, 231, 235, 0.4)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) {
            e.currentTarget.style.backgroundColor = 'rgba(229, 231, 235, 0.9)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
          }
        }}
      >
        {isSubmitting ? "Joining..." : "Join the Beta Testers"}
      </button>
      {message && (
        <span style={{
          fontSize: 'clamp(0.7rem, 1.8vw, 1rem)',
          fontFamily: 'monospace',
          color: message.includes('🎉') ? '#10b981' : message.includes('error') ? '#ef4444' : '#e5e7eb',
          textShadow: '0 0 8px rgba(0,0,0,0.8)',
          whiteSpace: 'nowrap'
        }}>
          {message}
        </span>
      )}
    </form>
  );
};

export default function BrandHeader() {
  const { mainTypingComplete, setMainTypingComplete, subtitleStarted } = useTypingSequence();

  // Debug logging
  console.log('BrandHeader state:', { mainTypingComplete, subtitleStarted });

  return (
    <div 
      style={{
        position: 'absolute',
        top: '25%',
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
              whiteSpace: 'nowrap',
              pointerEvents: 'auto'
            }}
          >
            {/* New tagline */}
            <div 
              style={{
                fontSize: 'clamp(0.8rem, 3vw, 2.5rem)',
                fontFamily: 'monospace',
                fontWeight: '600',
                color: '#e5e7eb',
                textShadow: '0 0 10px rgba(0,0,0,0.8)',
                letterSpacing: '0.05em',
                marginBottom: '0.5rem'
              }}
            >
              The Open-Source Google for AI IDEs
            </div>
            
            {/* Italicized description */}
            <div 
              style={{
                fontSize: 'clamp(0.6rem, 2.5vw, 2rem)',
                fontFamily: 'monospace',
                fontStyle: 'italic',
                fontWeight: '400',
                color: '#d1d5db',
                textShadow: '0 0 8px rgba(0,0,0,0.8)',
                letterSpacing: '0.03em',
                marginBottom: '1rem'
              }}
            >
              Solving the context gap in AI-powered development
            </div>
            
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
            
            {/* Waitlist Form */}
            <WaitlistForm />
          </div>
        )}
      </div>
    </div>
  );
} 