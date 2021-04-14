import Button from '@material-tailwind/react/Button';
import Progress from '@material-tailwind/react/Progress';

export default function TrafficCard() {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-20 shadow rounded-lg px-4">
                <div className="rounded-lg mb-0 px-6 py-4 bg-gradient-to-tr from-purple-500 to-purple-700 shadow-xl -mt-8">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="relative max-w-full">
                            <h3 className="text-xl text-white">Page visits</h3>
                        </div>
                        <div className="relative text-right">
                            <Button color="lightBlue" size="sm" ripple="light">
                                See More
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto pt-6 pb-4 px-2">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead className="thead-light">
                            <tr>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Referral
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Visitors
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left w-56"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    Facebook
                                </th>
                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    1,480
                                </td>
                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex items-center">
                                        <span className="mr-2">60%</span>
                                        <div className="relative w-full">
                                            <Progress color="blue" value="60" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    Google
                                </th>
                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    4,807
                                </td>
                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex items-center">
                                        <span className="mr-2">80%</span>
                                        <div className="relative w-full">
                                            <Progress color="red" value="80" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    Instagram
                                </th>
                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    3,678
                                </td>
                                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex items-center">
                                        <span className="mr-2">75%</span>
                                        <div className="relative w-full">
                                            <Progress
                                                color="indigo"
                                                value="75"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th className="align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    Twitter
                                </th>
                                <td className="align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    2,645
                                </td>
                                <td className="align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex items-center">
                                        <span className="mr-2">30%</span>
                                        <div className="relative w-full">
                                            <Progress
                                                color="lightBlue"
                                                value="30"
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
