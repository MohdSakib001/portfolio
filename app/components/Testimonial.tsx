import Image from "next/image";

export interface TestimonialProps {
  name: string;
  quote: string;
  avatar?: string;
}

export default function Testimonial({ name, quote, avatar }: TestimonialProps) {
  return (
    <section className="py-24 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto flex items-start gap-6">
        {/* Avatar + name + line */}
        <div className="flex items-center gap-3 shrink-0 pt-2.5">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-black/8 flex items-center justify-center shrink-0">
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                width={44}
                height={44}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-[13px] font-semibold text-black/40 select-none">
                {name[0]}
              </span>
            )}
          </div>
          <span className="text-caption font-medium text-black/70 whitespace-nowrap">
            {name}
          </span>
          <div className="w-16 h-px bg-black/20" />
        </div>

        {/* Quote */}
        <blockquote className="text-title font-display leading-snug italic text-black/85">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
