"use client";
import DocsBooking from "@components/docs_components/DocsBooking";
import DocsCancel from "@components/docs_components/DocsCancel";
import DocsCheckin from "@components/docs_components/DocsCheckin";
import DocsFAQ from "@components/docs_components/DocsFAQ";
import DocsLogin from "@components/docs_components/DocsLogin";
import React, { useContext, useEffect } from "react";
import { hashContext } from "./layout";
import DocsPenalty from "@components/docs_components/DocsPenalty";
import DocsBookingCondition from "@components/docs_components/DocsBookingCondition";
import DocsCheckinCondition from "@components/docs_components/DocsCheckinCondition";
import { DocsSideBarList } from "@data/DocsSideBar";

function DocsPage() {
  const { hash, setHash } = useContext(hashContext);
  useEffect(() => {
    const container = document.getElementById("docs-content");
    if (!container) return;

    const handleScroll = () => {
      let found = false;
      const containerTop = container.getBoundingClientRect().top + 2;
      // console.log(containerTop);

      for (const { id } of DocsSideBarList) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // console.log(rect.top, rect.bottom);

          if (rect.top <= containerTop && rect.bottom >= containerTop) {
            // 65 = offsetTop (เช่น navbar)
            if (window.location.hash !== `#${id}`) {
              history.replaceState(null, "", `#${id}`);
              setHash(id);
            }
            found = true;
            break;
          }
        }
      }
      if (!found && window.location.hash) {
        history.replaceState(null, "", " ");
        setHash("");
      }
    };
    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {DocsSideBarList.map((item) => (
        <section id={item.id} className="py-8" key={item.id}>
          {item.content}
        </section>
      ))}
    </>
  );
}

export default DocsPage;
