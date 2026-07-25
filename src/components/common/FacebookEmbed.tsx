export interface FacebookEmbedProps {
  url: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function FacebookEmbed({
  url,
  width = "100%",
  height = "100%",
  className = "",
}: FacebookEmbedProps) {
  const encodedUrl = encodeURIComponent(url);
  const heightParam = typeof height === "number" ? `&height=${height}` : "";
  const widthParam = typeof width === "number" ? `&width=${width}` : "";
  const iframeSrc = `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false&t=0${widthParam}${heightParam}`;

  return (
    <div className={`flex justify-center items-center w-full h-full overflow-hidden ${className}`}>
      <iframe
        src={iframeSrc}
        width={width}
        height={height}
        style={{ border: 'none', overflow: 'hidden', width: '100%', height: '100%' }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
}
