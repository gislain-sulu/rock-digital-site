import type { IconType } from 'react-icons';
import {
  HiOutlineArrowPathRoundedSquare,
  HiOutlineCloudArrowUp,
  HiOutlineCodeBracket,
  HiOutlineCog6Tooth,
  HiOutlineDevicePhoneMobile,
  HiOutlineMegaphone,
  HiOutlinePaintBrush,
} from 'react-icons/hi2';

import type { Service } from '@/lib/content';

const ICONS: Record<Service['icon'], IconType> = {
  web: HiOutlineCodeBracket,
  mobile: HiOutlineDevicePhoneMobile,
  design: HiOutlinePaintBrush,
  saas: HiOutlineCloudArrowUp,
  transformation: HiOutlineArrowPathRoundedSquare,
  automation: HiOutlineCog6Tooth,
  branding: HiOutlineMegaphone,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: Service['icon'];
  className?: string;
}) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
