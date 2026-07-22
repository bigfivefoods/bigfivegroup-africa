import Image from "next/image";

/**
 * Story cover — local paths use next/image; remote URLs use img.
 */
export default function StoryCover({
  src,
  alt,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const remote = src.startsWith("http://") || src.startsWith("https://");

  return (
    <div className={`relative overflow-hidden bg-black/5 ${className}`}>
      {remote ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={`absolute inset-0 w-full h-full ${imageClassName}`} />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={imageClassName}
          sizes={sizes}
          priority={priority}
        />
      )}
    </div>
  );
}
