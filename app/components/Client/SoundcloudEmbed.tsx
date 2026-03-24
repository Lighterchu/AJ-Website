
export default function SoundCloudEmbed() {
  return (
    <div className="w-full h-75">
      <iframe
          className="w-full h-full"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2190251222&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
          loading="lazy"
          allow="autoplay"
          title="SoundCloud Playlist"
        />
    </div>
  )
}
