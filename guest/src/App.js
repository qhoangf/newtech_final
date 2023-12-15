import "./App.css"
import Header from "./app/components/common/header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import About from "./app/components/notification/Notification"
import Footer from "./app/components/common/footer/Footer"
import Home from "./app/components/home/Home"
function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/notification' component={About} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App