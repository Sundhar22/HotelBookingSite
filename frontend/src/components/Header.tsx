import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="bg-blue-800 py-6">

            <div className="container flex justify-between mx-auto">
                <span className="font-bold text-white text-3xl tracking-tight">
                    <Link to={'/'}>
                        EasyTrip.com
                    </Link>
                </span>
                <span className="flex space-x-2 ">
                    <Link to={"/register"} className="hover:bg-gray-200 px-5 rounded bg-white font-bold flex items-center text-blue-600">Sign In</Link>
                </span>
            </div>

        </div>
    );
}

export default Header