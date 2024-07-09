import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout children={<p>HomePage</p>} ></Layout>}></Route>
        <Route path="/search" element={<Layout children={<p>SearchPage</p>} ></Layout>}></Route>
        <Route path="/" element={<Layout children={<p>HomePage</p>} ></Layout>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
