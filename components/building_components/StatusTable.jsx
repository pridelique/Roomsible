import { status } from "@data";
import React from "react";
import StatusLabel from "./StatusLabel";

function StatusTable() {
  return (
    <div className="flex flex-col lg:flex-row max-w-xl w-fit gap-2 gap-x-6 mb-4">
      <div className="flex gap-6 justify-center items-center">
        {status.slice(0, 3).map((item) => (
          <StatusLabel {...item} key={item.statusEng} />
        ))}
      </div>
      <div className="flex gap-6 justify-center items-center">
        {status.slice(3, 5).map((item) => (
          <StatusLabel {...item} key={item.statusEng} />
        ))}
      </div>
    </div>
  );
}

export default StatusTable;
