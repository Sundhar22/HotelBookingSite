import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface props {
    children: React.ReactNode;
}

const Layout = ({ children }: props) => {

    return (
        <div className="flex flex-col min-h-screen ">
            <Header />
            <Hero />
            {(window.location.pathname === "/" || window.location.pathname === "/search") && <SearchBar />}
            <div className="container mx-auto py-10  px-6 flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )


}

export default Layout;