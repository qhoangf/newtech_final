import "./AppIndex.css"
import Header from "../app/components/common/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from "../app/components/common/footer/Footer"
import Home from "../app/components/home/Home"
function App() {
  return (
    <>
      <Router>
        <Header />
        <Home />
        <Footer />
      </Router>
    </>
  )
}

export default App
