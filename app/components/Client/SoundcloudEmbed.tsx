'use client'

import { useRef, useEffect, useState } from 'react'

export default function SoundCloudEmbed() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.25,
        rootMargin: '200px 0px' // preload slightly before visible
      }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full h-75">
      {isVisible && (
        <iframe
          className="w-full h-full"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2190251222&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          loading="lazy"
          allow="autoplay"
          title="SoundCloud Playlist"
        />
      )}
    </div>
  )
}
