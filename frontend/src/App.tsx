import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuroraBackground } from "./components/AuroraBackground/AuroraBackground"
import { Header } from "./components/Header/Header"
import { Landing } from "./pages/Landing/Landing"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { CreateBond } from "./pages/CreateBond/CreateBond"
import { BondDetail } from "./pages/BondDetail/BondDetail"

export function App() {
  return (
    <BrowserRouter>
      <AuroraBackground />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateBond />} />
        <Route path="/bond/:id" element={<BondDetail />} />
      </Routes>
    </BrowserRouter>
  )
}
