export interface FacebookEmbedProps {
  url: string;
  width?: number | string;
  height?: number | string;
}

export default function FacebookEmbed({
  url,
  width = 560,
  height = 314,
}: FacebookEmbedProps) {
  const encodedUrl = encodeURIComponent(url);
  const iframeSrc = `https://www.facebook.com/plugins/video.php?height=${height}&href=${encodedUrl}&show_text=false&width=${width}&t=0`;

  return (
    <div className="flex justify-center items-center w-full h-full overflow-hidden">
      <iframe
        src={iframeSrc}
        width={width}
        height={height}
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="max-w-full rounded-lg"
      ></iframe>
    </div>
  );
}
