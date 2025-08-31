import { ExternalLink } from "@node_modules/lucide-react";

function DocsLink({ to, content }) {
  return (
    <div
      className="gap-1 items-center w-fix inline-block"
      onClick={() => {
        const el = document.getElementById(to);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <span className="inline-flex items-center gap-1 text-blue-600 hover:underline transition-colors cursor-pointer">
        {content}{" "}<ExternalLink className="w-4 h-4" />
      </span>
    </div>
  );
}

export default DocsLink;
