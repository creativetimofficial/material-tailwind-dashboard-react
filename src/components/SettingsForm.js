import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';

export default function SettingsForm() {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-20 shadow rounded-xl bg-white border-0 px-4">
                <div className="rounded-xl bg-gradient-to-tr from-purple-500 to-purple-700 mb-10 px-8 py-10 -mt-10 shadow-xl">
                    <div className="text-center flex justify-between">
                        <h6 className="text-white text-2xl">My account</h6>
                        <Button color="lightBlue" size="sm" ripple="light">
                            Settings
                        </Button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                            User Information
                        </h6>
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-6/12 pr-4 mb-10">
                                <Input
                                    type="text"
                                    color="purple"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 pl-4 mb-10">
                                <Input
                                    type="email"
                                    color="purple"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 pr-4 mb-10">
                                <Input
                                    type="text"
                                    color="purple"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 pl-4 mb-10">
                                <Input
                                    type="email"
                                    color="purple"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>

                        <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                            Contact Information
                        </h6>
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-12/12 mb-10">
                                <Input
                                    type="text"
                                    color="purple"
                                    placeholder="Address"
                                />
                            </div>
                            <div className="w-full lg:w-4/12 pr-4 mb-10">
                                <Input
                                    type="text"
                                    color="purple"
                                    placeholder="City"
                                />
                            </div>
                            <div className="w-full lg:w-4/12 px-4 mb-10">
                                <Input
                                    type="text"
                                    color="purple"
                                    placeholder="Country"
                                />
                            </div>
                            <div className="w-full lg:w-4/12 pl-4 mb-10">
                                <Input
                                    type="text"
                                    color="purple"
                                    placeholder="Postal Code"
                                />
                            </div>
                        </div>

                        <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                            About Me
                        </h6>
                        <div className="flex flex-wrap mt-10">
                            <div className="w-full lg:w-12/12">
                                <div
                                    className="relative w-full"
                                    style={{ height: '120px' }}
                                >
                                    <textarea
                                        placeholder=" "
                                        className="w-full h-full leading-normal shadow-none outline-none focus:outline-none focus:ring-0 px-0 md-input bg-transparent border-none md-input-purple-500"
                                        style={{ resize: 'none' }}
                                    />
                                    <label className="text-gray-400 absolute left-0 -top-0.5 h-full w-full border border-t-0 border-l-0 border-r-0 border-b border-gray-300 pointer-events-none">
                                        <span className="absolute top-0 transition-all duration-300">
                                            Message
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
