"use client";

import { useNavMenu } from "@/hooks/use-navmenu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMenu() {
  const pathname = usePathname();
  const links = useNavMenu();

  return (
    <div className="w-full fixed bottom-0 left-0 bg-white border-t">
      <nav className="flex gap-x-8 justify-center items-center p-2">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className={`flex flex-col items-center space-x-2 text-xs ${
              pathname === link.href ? "text-gray -800" : "text-gray-400"
            }`}
          >
            <link.icon />
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
