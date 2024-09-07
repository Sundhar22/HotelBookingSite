  import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
  import { UseAppContext } from "./context/AppContext";
  import Layout from "./layout/Layout";
  import AddHotel from "./pages/hotel";
  import MyHotels from "./pages/myHotels";
  import Register from "./pages/register";
  import SignIn from "./pages/SignIn";
  import EditHotel from "./pages/editHotel";
  import Search from "./pages/Search";

  function App() {
    const { isLogin } = UseAppContext();
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout children={<p>HomePage</p>} ></Layout>}></Route>
          <Route path="/register" element={<Layout children={<Register />} ></Layout>}></Route>
              <Route path="/sign-in" element={<Layout children={<SignIn />} ></Layout>}></Route>
          <Route path="/search" element={<Layout children={<Search />} ></Layout>}></Route>
          {
            isLogin && (

              <>

                <Route path="/add-hotel" element={<Layout children={<AddHotel />} ></Layout>}></Route>
                <Route path="/edit-hotel/:hotelId" element={<Layout children={<EditHotel />} ></Layout>}></Route>
                <Route path="/my-hotels" element={<Layout children={<MyHotels />} ></Layout>}></Route></>

            )
          }

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
