import Image from 'next/image';
import type { PropsWithChildren } from 'react';

type AvatarProps = PropsWithChildren<{
  src: string;
  alt: string;
  size?: number;
  className?: string;
}>;

export default function Avatar({
  src,
  alt,
  size = 56,
  className,
}: AvatarProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-slate-800 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="56px"
        className="object-cover"
      />
    </div>
  );
}
