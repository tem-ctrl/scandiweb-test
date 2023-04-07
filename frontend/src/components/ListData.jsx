import { ProductCard, LinkButton } from '.'
import { PAGES } from '../utils/constants'

const ListData = ({ data }) => {
  const isData = data.length > 0
  return (
    <main className={`main home ${!isData && 'home-empty'}`}>
      {
        isData
          ? data.map(elt => (
            <ProductCard key={`${elt.type}-${elt.sku}`} {...elt} />
          ))
          : <>
            <h2 className='home-empty-title'>No product found !</h2>
            <LinkButton text='Add New Product' path={PAGES.addProductPage} />
          </>
      }
    </main>
  )
}

export default ListData
