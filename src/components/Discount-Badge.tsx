import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "./ui/badge";
import { twMerge } from "tailwind-merge";

interface BagdeDicount extends BadgeProps {
  children: number;
}

const DiscountBadge = ({ children, className, ...props }: BagdeDicount) => {
  return (
    <Badge className={twMerge("px-2 py-[2px]", className)} {...props}>
      <ArrowDownIcon size={14} /> {children * 100}%
    </Badge>
  );
};

export default DiscountBadge;
