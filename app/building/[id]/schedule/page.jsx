'use client'

import { useSearchParams } from "@node_modules/next/navigation"

const SchedulePage = () => {
    const params = useSearchParams()
    const roomNumber = params.get('roomNumber')
    return (
        <div>
            Schedule : {roomNumber}
        </div>
    )
}

export default SchedulePage