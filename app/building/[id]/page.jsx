"use client";

import { useParams } from "@node_modules/next/navigation";
import Building from "@components/Building";
function BuildingPage() {
  const { id } = useParams();
  return (
    <div>
      <Building id={id} />
    </div>
  )
}

export default BuildingPage