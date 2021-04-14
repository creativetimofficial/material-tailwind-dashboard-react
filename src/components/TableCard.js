import React from 'react';
import Team1 from '../img/team-1-800x800.jpg';
import Team2 from '../img/team-2-800x800.jpg';
import Team3 from '../img/team-3-800x800.jpg';
import Team4 from '../img/team-4-470x470.png';
import Image from '@material-tailwind/react/Image';

export default function CardTable() {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-xl bg-white p-4">
                <div className="rounded-xl px-6 py-8 bg-gradient-to-tr from-purple-500 to-purple-700 shadow-xl -mt-12">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="text-xl text-white">Card Table</h3>
                        </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto pt-6 pb-4 px-2">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Project
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Budget
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Status
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Users
                                </th>
                                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                    Completion
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    Argon Design System
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    $2,500 USD
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>{' '}
                                    pending
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full border-2 border-white">
                                            <Image
                                                src={Team1}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team2}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team3}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team4}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex items-center">
                                        <span className="mr-2">60%</span>
                                        <div class="relative w-full">
                                            <div class="overflow-hidden h-2 flex rounded bg-red-200">
                                                <div
                                                    class="flex justify-center items-center rounded text-xs font-medium bg-red-500 text-white"
                                                    style={{ width: '60%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    Black Dashboard Sketch
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    $1,800 USD
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2"></i>{' '}
                                    completed
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full border-2 border-white">
                                            <Image
                                                src={Team1}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team2}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team3}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team4}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex items-center">
                                        <span className="mr-2">100%</span>
                                        <div class="relative w-full">
                                            <div class="overflow-hidden h-2 flex rounded bg-green-200">
                                                <div
                                                    class="flex justify-center items-center rounded text-xs font-medium bg-green-500 text-white"
                                                    style={{ width: '100%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    React Material Dashboard
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    $4,400 USD
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <i className="fas fa-circle fa-sm text-teal-500 mr-2"></i>{' '}
                                    on schedule
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full border-2 border-white">
                                            <Image
                                                src={Team1}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team2}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team3}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team4}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex items-center">
                                        <span className="mr-2">90%</span>
                                        <div class="relative w-full">
                                            <div class="overflow-hidden h-2 flex rounded bg-teal-200">
                                                <div
                                                    class="flex justify-center items-center rounded text-xs font-medium bg-teal-500 text-white"
                                                    style={{ width: '90%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                            <tr>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    React Material Dashboard
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    $2,200 USD
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <i className="fas fa-circle fa-sm text-blue-gray-900 mr-2"></i>{' '}
                                    completed
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex">
                                        <div className="w-10 h-10 rounded-full border-2 border-white">
                                            <Image
                                                src={Team1}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team2}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team3}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                        <div className="w-10 h-10 rounded-full border-2 border-white -ml-4">
                                            <Image
                                                src={Team4}
                                                rounded
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                    <div className="flex items-center">
                                        <span className="mr-2">100%</span>
                                        <div class="relative w-full">
                                            <div class="overflow-hidden h-2 flex rounded bg-green-200">
                                                <div
                                                    class="flex justify-center items-center rounded text-xs font-medium bg-green-500 text-white"
                                                    style={{ width: '100%' }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
