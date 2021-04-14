import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import '@material-tailwind/react/tailwind.css';

function App() {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Dashboard />

                <footer className="py-6 px-16 border-t border-gray-200 font-light flex flex-col lg:flex-row justify-between items-center">
                    <p className="text-gray-700 mb-6 lg:mb-0">
                        Copyright &copy; {new Date().getFullYear()} Material
                        Tailwind by{' '}
                        <a
                            href="https://www.creative-tim.com?ref=mtdk"
                            target="_blank"
                            rel="noreferrer"
                            className="text-light-blue-500 hover:text-light-blue-700"
                        >
                            Creative Tim
                        </a>
                    </p>

                    <ul className="list-unstyled flex">
                        <li className="mr-6">
                            <a
                                className="text-gray-700 hover:text-gray-900 font-medium block pb-2 text-sm"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/creativetimofficial/material-tailwind/blob/main/LICENSE.md?ref=mtdk"
                            >
                                MIT License
                            </a>
                        </li>
                        <li className="mr-6">
                            <a
                                className="text-gray-700 hover:text-gray-900 font-medium block pb-2 text-sm"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/creativetimofficial/material-tailwind/blob/main/CONTRIBUTING.md?ref=mtdk"
                            >
                                Contribute
                            </a>
                        </li>
                        <li className="mr-6">
                            <a
                                className="text-gray-700 hover:text-gray-900 font-medium block pb-2 text-sm"
                                target="_blank"
                                rel="noreferrer"
                                href="https://github.com/creativetimofficial/material-tailwind/blob/main/CODE_OF_CONDUCT.md?ref=mtdk"
                            >
                                Code of Conduct
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-gray-700 hover:text-gray-900 font-medium block pb-2 text-sm"
                                target="_blank"
                                rel="noreferrer"
                                href="https://creative-tim.com/contact-us?ref=mtdk"
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
        </>
    );
}

export default App;
