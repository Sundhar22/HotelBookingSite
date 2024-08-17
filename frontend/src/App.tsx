import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import AddHotel from "./pages/hotel";
import Register from "./pages/register";
import SignIn from "./pages/SignIn";
import { UseAppContext } from "./context/AppContext";

function App() {
  const {isLogin} = UseAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout children={<p>HomePage</p>} ></Layout>}></Route>
        <Route path="/register" element={<Layout children={<Register />} ></Layout>}></Route>
        <Route path="/search" element={<Layout children={<p>SearchPage</p>} ></Layout>}></Route>
        <Route path="/sign-in" element={<Layout children={<SignIn />} ></Layout>}></Route>
        {
          isLogin && <Route path="/add-hotel" element={<Layout children={<AddHotel />} ></Layout>}></Route>
        }
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
