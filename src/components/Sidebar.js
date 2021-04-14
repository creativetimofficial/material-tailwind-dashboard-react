import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                        href="https://material-tailwind.com?ref=mtd"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                        <H6 color="gray">Material Tailwind</H6>
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white shadow-md mb-4">
                                <Link
                                    className={`flex items-center gap-4 text-sm font-light py-3`}
                                    to="/dashboard"
                                >
                                    <Icon name="dashboard" size="2xl" />
                                    Dashboard
                                </Link>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700">
                                <Link
                                    className={`flex items-center gap-4 text-sm font-light py-3`}
                                    to="/settings"
                                >
                                    <Icon name="settings" size="2xl" />
                                    Settings
                                </Link>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700">
                                <Link
                                    className={`flex items-center gap-4 text-sm font-light py-3`}
                                    to="/tables"
                                >
                                    <Icon name="toc" size="2xl" />
                                    Tables
                                </Link>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700">
                                <Link
                                    className={`flex items-center gap-4 text-sm font-light py-3`}
                                    to="/maps"
                                >
                                    <Icon name="map" size="2xl" />
                                    Maps
                                </Link>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700">
                                <a
                                    href="#login"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="fingerprint" size="2xl" />
                                    Login
                                </a>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700">
                                <a
                                    href="#register"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="list_alt" size="2xl" />
                                    Register
                                </a>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700">
                                <a
                                    href="#landing"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="web" size="2xl" />
                                    Landing Page
                                </a>
                            </li>
                            <li className="px-4 rounded-lg mb-2 text-gray-700">
                                <a
                                    href="#profile"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="account_circle" size="2xl" />
                                    Progile Page
                                </a>
                            </li>
                        </ul>

                        <ul className="flex-col min-w-full flex list-none absolute bottom-0">
                            <li className="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white">
                                <a
                                    href="https://material-tailwind.com/documentation/quick-start"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-4 text-sm font-light py-3"
                                >
                                    <Icon name="description" size="2xl" />
                                    Documentation
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
