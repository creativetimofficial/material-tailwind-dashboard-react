import Image from '@material-tailwind/react/Image';
import H5 from '@material-tailwind/react/Heading5';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import Button from '@material-tailwind/react/Button';
import ProfilePicture from '../img/team-1-800x800.jpg';

export default function ProfileCard() {
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow rounded-xl mt-10">
                <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                        <div className="w-48 px-4 flex justify-center -mt-20">
                            <Image src={ProfilePicture} rounded raised />
                        </div>
                        <div className="w-full px-4 text-center">
                            <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                        22
                                    </span>
                                    <span className="text-sm text-gray-700">
                                        Friends
                                    </span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                        10
                                    </span>
                                    <span className="text-sm text-gray-700">
                                        Photos
                                    </span>
                                </div>
                                <div className="mr-4 p-3 text-center">
                                    <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                        89
                                    </span>
                                    <span className="text-sm text-gray-700">
                                        Comments
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <H5 color="gray">John Smith</H5>
                        <div className="mt-0 mb-2 text-gray-700 font-medium flex items-center justify-center gap-2">
                            <Icon name="place" size="xl" />
                            Los Angeles, California
                        </div>
                        <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                            <Icon name="work" size="xl" />
                            Solution Manager - Creative Tim Officer
                        </div>
                        <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                            <Icon name="account_balance" size="xl" />
                            University of Computer Science
                        </div>
                    </div>
                    <div className="mt-10 pt-2 pb-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full px-4 flex flex-col items-center">
                                <LeadText color="blueGray">
                                    An artist of considerable range, Jenna the
                                    name taken by Melbourne-raised,
                                    Brooklyn-based Nick Murphy writes, performs
                                    and records all of his own music, giving it
                                    a warm, intimate feel with a solid groove
                                    structure. An artist of considerable range.
                                </LeadText>
                                <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <Button
                                        color="lightBlue"
                                        buttonType="link"
                                        ripple="dark"
                                    >
                                        Show more
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
