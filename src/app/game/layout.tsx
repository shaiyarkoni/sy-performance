import type { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] min-w-0 flex-col overflow-x-clip">
      {children}
    </div>
  );
}
