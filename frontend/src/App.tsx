import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HotelDetail from "./components/HotelDetail";
import { UseAppContext } from "./context/AppContext";
import Layout from "./layout/Layout";
import Booking from "./pages/Booking";
import EditHotel from "./pages/editHotel";
import Home from "./pages/Home";
import AddHotel from "./pages/hotel";
import MyBookings from "./pages/myBooking";
import MyHotels from "./pages/myHotels";
import Register from "./pages/register";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";

function App() {
  const { isLogin } = UseAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout children={<Home />} ></Layout>}></Route>
        <Route path="/register" element={<Layout children={<Register />} ></Layout>}></Route>
        <Route path="/sign-in" element={<Layout children={<SignIn />} ></Layout>}></Route>
        <Route path="/search" element={<Layout children={<Search />} ></Layout>}></Route>
        <Route path="/detail/:id" element={<Layout children={<HotelDetail />} ></Layout>}></Route>

        {
          isLogin && (

            <>
              <Route path="/hotel/:id/booking" element={<Layout children={<Booking />} ></Layout>}></Route>

              <Route path="/add-hotel" element={<Layout children={<AddHotel />} ></Layout>}></Route>
              <Route path="/edit-hotel/:hotelId" element={<Layout children={<EditHotel />} ></Layout>}></Route>
              <Route path="/my-hotels" element={<Layout children={<MyHotels />} ></Layout>}></Route>
              <Route path="/my-bookings" element={<Layout children={<MyBookings />} ></Layout>}></Route>

            </>

          )
        }


        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
