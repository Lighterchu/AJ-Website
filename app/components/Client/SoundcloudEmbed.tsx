export default function SoundCloudEmbed() {
    return (
      <div
      className=" mt-5"
        dangerouslySetInnerHTML={{
          __html: `
            <iframe 
              width="100%" 
              height="300" 
              scrolling="no" 
              frameborder="no" 
              allow="autoplay" 
              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A2148527099&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
            </iframe>
  
            <div style="font-size: 10px; color: #cccccc; line-break: anywhere; word-break: normal; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif; font-weight: 100;">
              <a href="https://soundcloud.com/mvmnt-entertainment" title="MVMNT Entertainment" target="_blank" style="color: #cccccc; text-decoration: none;">MVMNT Entertainment</a>
              · 
              <a href="https://soundcloud.com/mvmnt-entertainment/sets/artist-of-mvmnt-2025" title="ARTIST OF MVMNT 2025" target="_blank" style="color: #cccccc; text-decoration: none;">ARTIST OF MVMNT 2025</a>
            </div>
          `,
        }}
      />
    );
  }
  