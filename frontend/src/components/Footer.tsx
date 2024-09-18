const Footer = () => {
    return (
        <div className="bg-blue-800 py-10">
            <div className=" mx-10 flex flex-col items-center md:flex-row md:justify-between md:items-center">
                <span className="text-lg text-white font-bold tracking-tight mb-4 md:mb-0">
                    EasyTrip.com
                </span>
                <span className="text-white font-bold tracking-tight flex flex-col gap-4 md:flex-row md:gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    );
};

export default Footer;

