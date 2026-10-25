import Image from "next/image";
import { SocialsNetworkIcon } from "./SocialsNetworkIcon";

type Props = {
  name: string;
  handle: string;
  avatar: string;
  links: { network: string; label: string }[];
};

export const SocialsMockCard = ({ name, handle, avatar, links }: Props) => (
  <div className="w-full rounded-2xl border border-white/10 bg-white/[0.09] p-2.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
    <div className="flex flex-col items-center text-center">
      <div className="relative size-8 overflow-hidden rounded-full ring-2 ring-white/18">
        <Image src={avatar} alt="" fill sizes="32px" className="object-cover" />
      </div>
      <div className="mt-1.5 text-[10px] font-semibold text-white">{name}</div>
      <div className="text-[9px] text-white/58">{handle}</div>
    </div>
    <div className="mt-2 space-y-1">
      {links.map((link) => (
        <div
          key={link.label}
          className="flex h-5 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.13] px-1.5 text-[9px] font-medium text-white"
        >
          <SocialsNetworkIcon network={link.network} className="size-2.5 shrink-0" />
          <span className="truncate">{link.label}</span>
        </div>
      ))}
    </div>
  </div>
);
