import Image from 'next/image';

export default function GuideBanner({ priority }: { priority?: boolean }) {
  return (
    <Image
      src="/guide-banner.png"
      alt="Last Z: Survival Shooter — An Akcrono Guide"
      width={2000}
      height={848}
      priority={priority}
      className="w-full h-auto rounded-[var(--radius-md)] shadow-[var(--shadow-sm)]"
    />
  );
}
