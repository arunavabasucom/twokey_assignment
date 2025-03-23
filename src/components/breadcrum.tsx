"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Remove leading slash and split by slash
    const segments = pathname.replace(/^\/+/, "").split("/");

    // If we're at root, just show My Drive
    if (segments.length === 1 && segments[0] === "") {
      return [{ name: "My Drive", href: "/" }];
    }

    // Create breadcrumb items with paths
    const crumbs = [];

    // Always add My Drive as the first item
    crumbs.push({ name: "My Drive", href: "/" });

    // Add each segment with its full path
    let currentPath = "";
    for (let i = 0; i < segments.length; i++) {
      if (segments[i]) {
        currentPath += `/${segments[i]}`;
        crumbs.push({
          name: segments[i],
          href: currentPath,
        });
      }
    }

    return crumbs;
  }, [pathname]);

  return (
    <nav className="flex flex-wrap items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
          <Link
            href={breadcrumb.href}
            className="flex items-center gap-1 text-primary hover:text-primary/90"
          >
            {index === 0 && <Home className="h-4 w-4" />}
            <span className="capitalize">{breadcrumb.name}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
}
