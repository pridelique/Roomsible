import faqs from "@data/faqs";
import React, { useState } from "react";

function DocsFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">คำถามที่พบบ่อย</h1>
      </div>
      <div className="space-y-3 ml-10 max-[460px]:ml-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`transition-all duration-200 border border-gray-200 rounded-xl bg-white shadow-sm ${
              openIndex === index ? "ring-2 ring-blue-200" : ""
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full px-5 py-4 text-left font-medium text-gray-800 focus:outline-none"
              aria-expanded={openIndex === index}
            >
              <span className="flex-1">{faq.question}</span>
              <span
                className={`ml-4 transition-transform duration-200 text-gray-400 ${
                  openIndex === index ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                {/* Minimal chevron icon */}
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M6 10l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={openIndex === index ? "rotate-180 origin-center transition-transform" : ""}
                  />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 px-5 ${
                openIndex === index ? "max-h-40 py-2" : "max-h-0 py-0"
              }`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DocsFAQ;