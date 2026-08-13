import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const CaseStudy = ({ project }: { project: any }) => {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group text-xs font-bold uppercase tracking-[0.15em] text-foreground flex items-center"
    >
      Case Study
      <ArrowUpRight
        size={18}
        className="group-hover:-translate-y-1 group-hover:scale-110 group-hover:translate-x-1 duration-200 linear text-accent"
      />
    </Link>
  );
};
