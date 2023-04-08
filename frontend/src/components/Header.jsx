import { useEffect, useState } from 'react'
import { LinkButton, SubmitButton } from '.'
import { deleteSelected } from '../utils/utils'
import { PAGES } from "../utils/constants"
import { useLocation } from 'react-router-dom'

const Header = () => {
  const [isHome, setHome] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setHome(location.pathname === PAGES.homePage)
  }, [location, isHome])

  const massDelete = (e) => {
    e.preventDefault()
    deleteSelected()
  }

  return (
    <header className='header'>
      <h1 className='h1 header-title'>{isHome ? 'Product List' : 'Add Product'}</h1>
      <div className='header-buttons'>
        {isHome
          ? (
            <>
              <LinkButton text='ADD' path={PAGES.addProductPage} />
              <SubmitButton id="delete-product-btn" text='MASS DELETE' form="" handleclick={massDelete} />
            </>
          ) : (
            <>
              <SubmitButton text='Save' form='product_form' />
              <LinkButton text='Cancel' path={PAGES.homePage} />
            </>
          )
        }
      </div>
    </header>
  )
}

export default Header
