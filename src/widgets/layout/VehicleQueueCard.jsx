import React from "react";
import { Typography } from "@material-tailwind/react";

export function VehicleQueueCard({ vehicle, index }) {
    const isFirstThree = index < 3;
    const cardBgColor = isFirstThree ? "bg-green-100" : "bg-blue-gray-50/70";
    const textColor = isFirstThree ? "text-green-900" : "text-blue-gray-700";
    const borderColor = isFirstThree ? "border-green-300" : "border-transparent";

    return (
        // DEĞİŞİKLİK: Dikey boşluğu azaltmak için padding (p-1.5) küçültüldü.
        <div className={`p-1.5 rounded-md ${cardBgColor} border ${borderColor} shadow-sm`}>
            {/* DEĞİŞİKLİK: Elemanlar arası boşluk (gap-2) azaltıldı. */}
            <div className="flex items-center gap-2">
                {/* DEĞİŞİKLİK: Sıra numarasının fontu (text-md) küçültüldü. */}
                <Typography className={`font-bold text-md ${textColor}`}>
                    #{index + 1}
                </Typography>
                <Typography variant="small" className="font-bold text-blue-gray-800 leading-tight">
                    {vehicle.licensePlate}
                </Typography>

            </div>
        </div>
    );
}

export default VehicleQueueCard; 