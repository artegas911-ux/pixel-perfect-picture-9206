import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VehicleImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
}

/** Image with a clean branded surface instead of a broken-image icon when loading fails. */
export function VehicleImage({ src, alt, className, loading = "lazy" }: VehicleImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  // An error during SSR hydration fires before React attaches onError; check after mount.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setStatus(img.naturalWidth > 0 ? "loaded" : "error");
  }, []);

  return (
    <div className={cn("image-fallback relative overflow-hidden", className)}>
      {status === "error" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="label-caps text-titanium-light">Image unavailable</span>
        </div>
      ) : (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out",
            status === "loaded" ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
