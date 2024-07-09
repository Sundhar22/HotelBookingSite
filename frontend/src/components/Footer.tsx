const Footer = () => {
    return (
        <div className="bg-blue-800 py-7">
            <div className="container flex justify-between items-center mx-auto">
                <span className="text-3xl text-white  font-bold tracking-tighter">
                    EasyTrip.com
                </span>

                <span className="text-white font-bold tracking-tighter flex gap-4">
                    <p className="cursor-pointer"> Privacy Policy</p>
                    <p className="cursor-pointer"> Terms of Service</p>
                </span>

            </div>
        </div>
    )
}
export default Footer;