
import { useState } from "react"
import { addToDeleteList, removeFromDeleteList } from "../utils/utils"
import { PROPERTY_MAP } from "../utils/constants"

const ProductCard = ({ sku, name, price, type, property }) => {
  const [checked, setChecked] = useState(false)

  // Add/remove product if checked/unchecked
  const handleChange = (e) => {
    let state = e.target.checked
    setChecked(state)
    state ? addToDeleteList(sku, type) : removeFromDeleteList(sku, type)
  }

  // Set property to be displayed on product card: Size, Weight or Dimensions
  const setCustomProperty = (productType, value) => {
    let [label, unit] = PROPERTY_MAP[productType.toLowerCase()].cardLabel
    return `${label} ${value} ${unit}`
  }


  return (
    <div className={checked ? 'product product-checked' : 'product'}>
      <div className='product-checkbox'>
        <label className='switch'>
          <input
            type='checkbox'
            className='delete-checkbox'
            onChange={handleChange}
          />
          <div className='slider'></div>
        </label>
      </div>
      <div className='product-desc'>
        <p className="product-desc-sku">{sku}</p>
        <p className="product-desc-name">{name}</p>
        <p className="product-desc-price">{price} $</p>
        <p className="product-desc-other">{setCustomProperty(type, property)}</p>
      </div>
    </div>
  )
}

export default ProductCard
