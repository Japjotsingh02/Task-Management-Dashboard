// src/components/PriorityBadge.tsx
import type { Priority } from "../types";
import {
  PRIORITY_LABEL,
  PRIORITY_COLOR,
  PRIORITY_BG,
  PRIORITY_DOT,
} from "../utils/priority";

interface Props {
  priority: Priority;
  size?: "sm" | "md";
}

export default function PriorityBadge({ priority, size = "md" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium
      ${PRIORITY_BG[priority]} ${PRIORITY_COLOR[priority]}
      ${size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}`}
    >
      <span
        className={`rounded-full flex-shrink-0
        ${PRIORITY_DOT[priority]}
        ${priority === "high" ? "priority-dot-high" : ""}
        ${size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5"}`}
      />
      {PRIORITY_LABEL[priority]}
    </span>
  );
}
