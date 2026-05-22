import Link from "next/link";

const FloatingButton = ({ href, title }: { href: string; title: string }) => {
  return (
    <div className="mt-24 flex justify-center">
      <Link href={href} title={title}>
        <div className="group relative w-[320px] cursor-pointer">
          {/* ghost cards — depth only */}
          <div className="absolute left-8 right-8 -bottom-2.5 h-15 rounded-[18px] bg-[#1a1a1a] opacity-[0.06] transition-all duration-300 group-hover:translate-y-1 group-hover:opacity-[0.04]" />
          <div className="absolute left-4 right-4 -bottom-1.5 h-15 rounded-[18px] bg-[#1a1a1a] opacity-[0.12] transition-all duration-300 group-hover:translate-y-0.5 group-hover:opacity-[0.09]" />

          {/* front card */}
          <div className="relative z-10 flex h-15 items-center justify-between rounded-[18px] bg-[#1a1a1a] px-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            <span className="text-[12px] font-medium uppercase tracking-[0.15em] text-white/55">
              {title}
            </span>
            <span className="text-base text-white/90 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FloatingButton;
