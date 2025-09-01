import { ExternalLink } from "@node_modules/lucide-react";
import React from "react";

function DocsContactUs() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center mb-4 gap-3">
        <span className="border-[2.5px] border-red-400 h-12 rounded-full"></span>
        <h1 className="text-3xl font-semibold text-gray-800">ติดต่อเรา</h1>
      </div>
      <div className="bg-white space-y-4 ml-10 max-[460px]:ml-4">
        <p className="text-gray-700 mb-2">
          หากพบปัญหา ข้อเสนอแนะ หรือสอบถามข้อมูลเพิ่มเติม
          สามารถติดต่อทีมงานได้ที่ช่องทางต่อไปนี้
        </p>
        <div className="space-y-2">
          <div>
            <span className="font-semibold text-gray-800">
              Instagram คณะกรรมการนักเรียน:
            </span>{" "}
            <a
              href="https://instagram.com/swkornor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline"
            >
              @swkornor <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div>
            <span className="font-semibold text-gray-800">
              Instagram ชมรม Robotics & AI:
            </span>{" "}
            <a
              href="https://instagram.com/roboticsandai.club"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline"
            >
              @roboticsandai.club <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div>
            <span className="font-semibold text-gray-800">
              แบบฟอร์มติดต่อทีมงาน:
            </span>{" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc-zBY2PS4hhkE91ocSx9zUPsyhoUQ53imXAfzxnA2obYLlrQ/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline"
            >
              กรอกแบบฟอร์ม <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="scale-[0.006] origin-top-left">
            <div>
              <span className="font-semibold text-gray-800">
                Instagram หัวหน้าทีมพัฒนาเว็บไซต์:
              </span>{" "}
              <a
                href="https://instagram.com/porpieng_patcharapon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
              >
                @porpieng_patcharapon <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                Instagram ผู้พัฒนาเว็บไซต์ 1:
              </span>{" "}
              <a
                href="https://instagram.com/belleyyy_cc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
              >
                @belleyyy_cc <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                Instagram ผู้พัฒนาเว็บไซต์ 2:
              </span>{" "}
              <a
                href="https://instagram.com/leamsoftrai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
              >
                @leamsoftrai <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                Instagram คุณแต้วแม่ของตรัย:
              </span>{" "}
              <a
                href="https://instagram.com/traitaw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 hover:underline"
              >
                @traitaw <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocsContactUs;
