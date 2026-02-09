'use client'

import { useRef, useEffect, useState } from 'react';

export default function SoundCloudEmbed() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Lazy load iframe when visible
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full aspect-[16/9]">
      {isVisible && (
        <iframe
          className="w-full h-75"
          allow="autoplay; encrypted-media"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2148527099"
          frameBorder="0"
          allowFullScreen
          title="SoundCloud Playlist"
        />
      )}
    </div>
  )
}
