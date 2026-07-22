import type { CSSProperties } from 'react';

export interface TikTokEmbedProps {
  url: string;
  videoId?: string;
  title?: string;
  author?: string;
  style?: CSSProperties;
}

function parseTikTokUrl(url: string) {
  // Extract video ID e.g. /video/7478692074703932679
  const videoIdMatch = url.match(/\/video\/(\d+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';

  // Extract author handle e.g. @protea.garden
  const authorMatch = url.match(/@([^/?#]+)/);
  const authorHandle = authorMatch ? authorMatch[1] : 'tiktok';

  return { videoId, authorHandle };
}

export default function TikTokEmbed({
  url,
  videoId: propVideoId,
  title = '',
  author: propAuthor,
  style = { maxWidth: '605px', minWidth: '325px' },
}: TikTokEmbedProps) {
  const { videoId: extractedId, authorHandle } = parseTikTokUrl(url);
  const videoId = propVideoId || extractedId;
  const author = propAuthor || `@${authorHandle}`;
  const displayAuthor = author.startsWith('@') ? author : `@${author}`;
  const cleanAuthorHandle = displayAuthor.replace('@', '');
  const authorUrl = `https://www.tiktok.com/@${cleanAuthorHandle}?refer=embed`;

  return (
    <div className="flex flex-col items-center justify-center w-full my-2 overflow-hidden">
      {videoId ? (
        <div className="w-full max-w-[340px] sm:max-w-[400px] h-[520px] sm:h-[580px] rounded-xl overflow-hidden shadow-2xl bg-black border border-white/10 relative">
          <iframe
            src={`https://www.tiktok.com/player/v1/${videoId}?autoplay=0`}
            title={title || `TikTok ${displayAuthor}`}
            className="w-full h-full border-0 pointer-events-auto"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <blockquote
          className="tiktok-embed"
          cite={url}
          data-video-id={videoId}
          style={style}
        >
          <section>
            <a
              target="_blank"
              title={displayAuthor}
              href={authorUrl}
              rel="noreferrer"
            >
              {displayAuthor}
            </a>{' '}
            {title}
          </section>
        </blockquote>
      )}
    </div>
  );
}
