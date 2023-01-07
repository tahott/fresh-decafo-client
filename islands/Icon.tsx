import { Icon } from "@iconify/react";

interface IconProps {
  icon: string;
  width?: number;
}

export default function I({ icon, width }: IconProps) {
  return (
    <div class="pr-2">
      <Icon icon={icon} width={width || 36} />
    </div>
  )
} 