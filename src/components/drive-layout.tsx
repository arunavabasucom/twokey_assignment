import type React from "react";

import { Breadcrumbs } from "./breadcrum";
import { Sidebar } from "./sidebar";

import { useSession } from "next-auth/react";
import { Header } from "./header";


export function DriveLayout({ children }: { children: React.ReactNode }) {
  const { data : session} = useSession();
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
      <Header logo={ session?.user.image} />
        <main className="flex-1 overflow-auto p-4">
          <Breadcrumbs />
          <div className="mt-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
