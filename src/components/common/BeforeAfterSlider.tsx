import React, { useState, useRef, useEffect, useCallback } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Original Photo (Raw Input)',
  afterLabel = 'Mangal Tech Studio Transformation',
  aspectRatio = 'aspect-[4/3]',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    setSliderPosition(position);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-refined shadow-premium border border-evergreen/10 bg-ivory-dark cursor-ew-resize group ${aspectRatio} ${className}`}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* After image (Underneath / Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        loading="lazy"
      />
      <div className="absolute top-4 right-4 bg-evergreen/90 backdrop-blur-sm text-ivory text-xs px-3 py-1.5 rounded font-medium shadow-sm tracking-wide z-10 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-copper inline-block animate-pulse"></span>
        {afterLabel}
      </div>

      {/* Before image (Clipped Foreground) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
            height: '100%',
          }}
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-charcoal/85 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded font-medium shadow-sm tracking-wide z-10">
          {beforeLabel}
        </div>
      </div>

      {/* Draggable Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl pointer-events-none z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Handle circle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-evergreen shadow-xl flex items-center justify-center border-2 border-copper cursor-ew-resize transition-transform group-hover:scale-110">
          <svg className="w-4 h-4 text-evergreen fill-current" viewBox="0 0 24 24">
            <path d="M8.5 6l-5 6 5 6V6zm7 12l5-6-5-6v12z"/>
          </svg>
        </div>
      </div>

      {/* Subtle Hint on Hover */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-charcoal/60 backdrop-blur-md text-white/90 text-[11px] px-3 py-1 rounded-full pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity">
        Drag slider to compare
      </div>
    </div>
  );
};
