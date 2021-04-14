import Icon from '@material-tailwind/react/Icon';

export default function StatusCard({
    color,
    icon,
    title,
    amount,
    percentage,
    percentageIcon,
    persentageColor,
    date,
}) {
    return (
        <div className="w-full px-5 mb-10">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 xl:mb-0 shadow">
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap border-b border-gray-200 pb-4">
                        <div className="relative w-auto -mt-10 flex-initial h-full">
                            <div
                                className={`h-24 w-24 p-3 text-center grid items-center shadow-xl rounded-lg bg-gradient-to-tr from-${color}-500 to-${color}-700`}
                            >
                                <Icon
                                    family="font-awesome"
                                    name={icon}
                                    size="3xl"
                                    color="white"
                                />
                            </div>
                        </div>

                        <div className="relative w-full pl-4 max-w-full flex-grow flex-1 mb-2 text-right">
                            <h5 className="text-gray-500 font-light tracking-wide text-sm mb-1">
                                {title}
                            </h5>
                            <span className="text-2xl text-gray-900">
                                {amount}
                            </span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-700 pt-4">
                        <span
                            className={`text-${persentageColor}-500 font-light mr-2`}
                        >
                            <Icon family="font-awesome" name={percentageIcon} />
                            &nbsp;{percentage}%
                        </span>
                        <span className="font-light whitespace-nowrap">
                            {date}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
