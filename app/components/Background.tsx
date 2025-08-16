"use client"
import FaultyTerminal from "../blocks/Backgrounds/FaultyTerminal/FaultyTerminal";

export default function Background() {
  return (
    <>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          pause={false}
          scanlineIntensity={0}
          glitchAmount={1}
          flickerAmount={0.5}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#2c1376"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />
      </div>
      
      {/* Blue Nebula Labs Branding */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        borderRadius: '8px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(36, 139, 255, 0.2)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <span style={{
          color: '#ededed',
          fontSize: '14px',
          fontWeight: '400',
          fontFamily: 'var(--font-inter)'
        }}>
        </span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <img 
            src="/logo.png" 
            alt="Blue Nebula Labs Logo" 
            style={{
              width: '24px',
              height: '24px',
              filter: 'drop-shadow(0 2px 4px rgba(36, 139, 255, 0.3))',
              transition: 'transform 0.6s ease-in-out',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'rotate(360deg) scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
            }}
          />
          <a 
            href="https://bluenebulalabs.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <span style={{
              background: 'linear-gradient(135deg, #2392ff 0%, #248bff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '16px',
              fontWeight: '800',
              fontFamily: 'var(--font-plus-jakarta)',
              letterSpacing: '0.5px'
            }}>
              Blue Nebula Labs
            </span>
          </a>
        </div>
      </div>
    </>
  );
}