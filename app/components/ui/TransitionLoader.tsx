"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import BrandLoader from "./BrandLoader";

const MIN_LOADER_MS = 2400;
const EXIT_FADE_MS = 220;

export default function TransitionLoader() {
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(pathname === "/");
  const pendingHrefRef = useRef<string | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const initialLoadHandledRef = useRef(false);

  useEffect(() => {
    if (initialLoadHandledRef.current) return;
    initialLoadHandledRef.current = true;

    if (pathname !== "/") {
      setVisible(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setVisible(false);
    }, MIN_LOADER_MS);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.href);
      const nextPathname = url.pathname;

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      const skipLoaderForProductDetail =
        pathname === "/products" && nextPathname.startsWith("/products/");
      const skipLoaderForWorkDetail =
        pathname === "/works" && nextPathname.startsWith("/works/");

      if (skipLoaderForProductDetail || skipLoaderForWorkDetail) {
        return;
      }

      event.preventDefault();

      if (navigationTimerRef.current) {
        window.clearTimeout(navigationTimerRef.current);
      }

      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }

      pendingHrefRef.current = `${url.pathname}${url.search}${url.hash}`;
      setVisible(true);

      navigationTimerRef.current = window.setTimeout(() => {
        if (pendingHrefRef.current) {
          router.push(pendingHrefRef.current);
        }
      }, MIN_LOADER_MS);
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [pathname, router]);

  useEffect(() => {
    if (!pendingHrefRef.current) return;

    exitTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      pendingHrefRef.current = null;
    }, EXIT_FADE_MS);

    return () => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (navigationTimerRef.current) {
        window.clearTimeout(navigationTimerRef.current);
      }

      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden={visible ? "false" : "true"}
      className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(244,129,32,0.14),transparent_26%),radial-gradient(circle_at_82%_15%,rgba(0,90,114,0.16),transparent_22%),linear-gradient(180deg,#020d14_0%,#022331_34%,#003045_68%,#003951_100%)] px-6 text-white transition duration-500 ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),transparent_22%,transparent_78%,rgba(0,0,0,0.14)),radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_46%)]" />
      <BrandLoader />
    </div>
  );
}
