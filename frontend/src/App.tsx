import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/register";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout children={<p>HomePage</p>} ></Layout>}></Route>
        <Route path="/register" element={<Layout children={<Register />} ></Layout>}></Route>
        <Route path="/search" element={<Layout children={<p>SearchPage</p>} ></Layout>}></Route>
        <Route path="/sign-in" element={<Layout children={<SignIn />} ></Layout>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
