import React from "react";
import { Typography } from "@material-tailwind/react";

export function VehicleQueueCard({ vehicle, index }) {
    const isFirstThree = index < 3;
    const cardBgColor = isFirstThree ? "bg-green-100" : "bg-blue-gray-50/70";
    const textColor = isFirstThree ? "text-green-900" : "text-blue-gray-700";
    const borderColor = isFirstThree ? "border-green-300" : "border-transparent";

    return (
        <div className={`p-2.5 rounded-lg ${cardBgColor} border ${borderColor} shadow-sm`}>
            <div className="flex items-center gap-3">
                <Typography className={`font-bold text-lg ${textColor}`}>
                    #{index + 1}
                </Typography>
                <div>
                    <Typography variant="small" className="font-bold text-blue-gray-800">
                        {vehicle.licensePlate}
                    </Typography>
                    <Typography variant="small" className="text-blue-gray-500">
                        {vehicle.userFullName}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default VehicleQueueCard;