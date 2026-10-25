import type { IconType } from "react-icons";
import { FaTiktok } from "react-icons/fa6";
import {
  LuGithub,
  LuInstagram,
  LuLink,
  LuLinkedin,
  LuMusic2,
  LuTwitch,
  LuTwitter,
  LuYoutube,
} from "react-icons/lu";

const ICONS: Record<string, IconType> = {
  instagram: LuInstagram,
  youtube: LuYoutube,
  github: LuGithub,
  twitch: LuTwitch,
  linkedin: LuLinkedin,
  twitter: LuTwitter,
  spotify: LuMusic2,
  tiktok: FaTiktok,
};

type Props = { network: string; className?: string };

export const SocialsNetworkIcon = ({ network, className }: Props) => {
  const Icon = ICONS[network] ?? LuLink;
  return <Icon aria-hidden className={className} />;
};
