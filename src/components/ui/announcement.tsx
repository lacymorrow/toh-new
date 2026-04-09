import { ArrowRight } from "lucide-react";
import { Link } from "@/components/primitives/link";
import { routes } from "@/config/routes";

export function Announcement() {
  return (
    <Link
      href={routes.town.news}
      className="group inline-flex items-center px-0.5 text-sm font-medium"
    >
      <span className="underline-offset-4 group-hover:underline">Town of Harmony News</span>
      <ArrowRight className="ml-1 h-4 w-4" />
    </Link>
  );
}
