"use client";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../styles/nprogress.css";
import { usePathname } from "@node_modules/next/navigation";
import { useEffect } from "react";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100, // ปรับความเร็วการเพิ่มความกว้างของแถบ
  minimum: 0.40, // เริ่มแถบที่ความกว้าง 8% เพื่อไม่ให้แถบสั้นเกินไป
});

function NProgressProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300); // จำลองการโหลด

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <>{children}</>;
}

export default NProgressProvider;
