import {
  Leaf,
  Wheat,
  Truck,
  Landmark,
  Link as LinkIcon,
  Award,
  Heart,
  Feather,
  Globe,
  Target,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Leaf,
  Wheat,
  Truck,
  Landmark,
  Link: LinkIcon,
  Award,
  Heart,
  Feather,
  Globe,
  Target,
};

export function CompanyIcon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Leaf;
  return <Icon size={size} className={className} />;
}
