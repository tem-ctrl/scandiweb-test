import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, AddProductPage } from './pages'
import { Header, Footer } from './components'
import { ToastContainer } from 'react-toastify'
import { PAGES } from './utils/constants'
import 'react-toastify/dist/ReactToastify.min.css'
import './sass/main.scss'


const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={PAGES.homePage} element={<HomePage />} />
        <Route path={PAGES.addProductPage} element={<AddProductPage />} />
      </Routes>
      <Footer />
      <ToastContainer limit={1} />
    </Router>
  )
}

export default AppRoutes
