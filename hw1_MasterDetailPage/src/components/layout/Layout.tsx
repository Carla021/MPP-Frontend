import Footer from "../footer/Footer"
import { Header } from "../header/Header"

import './Layout.css'

const Layout = ({children}: any) => {

  return (
    <div className="layout-container">
        <Header />

        {children}

        <Footer/>
    </div>
  )
}

export default Layout