import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainContainer from "./MainContainer"
import LoginPage from "./LoginPage"
import RegisterPage from "./RegisterPage"
import Error from "./Error"
import { withAuth } from "./Auth"

export default function App() {
  return (
    <>
    <Router>
        <Routes>
            {/* <Route path="/books" element={withAuth(<MainContainer />)} /> */} 
            <Route path="/books" element={<MainContainer />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    </Router>
    </>
  )
}
