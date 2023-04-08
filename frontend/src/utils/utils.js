import axios from 'axios'
import * as yup from 'yup'
import { API_URLS, PROPERTY_MAP, ERRORS, FIXED_ATTRIBUTES } from './constants'

/**
 * Retrieve the skus of selected products for deletion
 * @returns {Object} types as keys, lists of skus as value
 */
function getToDeleteList() {
  let list = sessionStorage.getItem('toDeleteList')
  return list ? JSON.parse(list) : { 'dvd': [], 'book': [], 'furniture': [] }
}

/**
 * Save list of products to delete
 * @param {Object} list 
 */
function saveToDeleteList(list) {
  let jsonList = JSON.stringify(list)
  sessionStorage.setItem('toDeleteList', jsonList)
}

/**
 * Add selected product to deletion list
 * @param {String} sku Product SKU
 * @param {String} type Product type
 */
export function addToDeleteList(sku, type) {
  let key = type.toLowerCase()
  let toDeleteObject = getToDeleteList()
  !toDeleteObject[key].includes(sku) && toDeleteObject[key].push(sku)
  saveToDeleteList(toDeleteObject)
}

/**
 * remove unselected product from deletion list
 * @param {String} sku Product SKU
 * @param {String} type Product type
 */
export function removeFromDeleteList(sku, type) {
  let key = type.toLowerCase()
  let toDeleteObject = getToDeleteList()
  let newArray = toDeleteObject[key].includes(sku)
    ? toDeleteObject[key].filter((item) => item !== sku)
    : toDeleteObject[key]
  toDeleteObject[key] = newArray
  saveToDeleteList(toDeleteObject)
}

/**
 * Retrieve the skus of selected products for deletion
 * directly from the DOM
 * @returns {Object} types as keys, lists of skus as value
 */
function getSelected() {
  let products = document.querySelectorAll('.product')
  let toDelete = { 'dvd': [], 'book': [], 'furniture': [] }
  products.forEach(product => {
    let type = product.lastChild.lastChild.textContent
    let sku = product.lastChild.firstChild.textContent
    let checked = product.firstChild.firstChild.firstChild.checked
    if (checked) {
      if (type.startsWith('Size')) {
        toDelete.dvd.push(sku)
      } else if (type.startsWith('Weight')) {
        toDelete.book.push(sku)
      } else {
        toDelete.furniture.push(sku)
      }
    }
  })
  return toDelete
}

/**
 * Send request to delete selected products
 */
export function deleteSelected() {
  // let delList = getToDeleteList()
  let delList = getSelected()

  if (delList.dvd.length > 0 || delList.book.length > 0 || delList.furniture.length > 0) {
    // axios.delete(`${API_URLS.delete}`, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    //   data: { ...delList }
    // })
    axios.post(`${API_URLS.delete}`, { ...delList }, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then((res) => {
        sessionStorage.clear()
        window.location.reload()
        console.log(res.data)
      })
      .catch(err => {
        window.location.reload()
        sessionStorage.clear()
        console.log("Couldn't delete selected data:", err)
      })
  }
}

/**
 * Create default form values base on product type
 * @param {String} productType 
 * @returns {Object} Customized default form values
 */
export function setDefaultFormValues(productType) {
  let fixedValues = { sku: '', name: '', price: 0 }
  let keys = PROPERTY_MAP[productType].attributes
  let otherValues = Object.fromEntries(keys.map((_, i) => [keys[i], 0]))
  return { ...fixedValues, type: productType, ...otherValues }
}

/**
 * Dynamically generate form schema based on product type
 * @param {String} productType 
 * @returns {yup.Object} FormSchema
 */
export function createFormSchema(productType) {

  let allowedProductTypes = ['dvd', 'book', 'furniture']
  let requiredPositiveNumber = yup.number().positive(ERRORS.required)
    .required(ERRORS.required).typeError(ERRORS.type)
    .transform(value => value ? Number(value) : 0)
  let requiredString = yup.string().required(ERRORS.required).typeError(ERRORS.type)

  let fixedSchema = {
    sku: requiredString, // automatically generated
    name: requiredString,
    price: requiredPositiveNumber,
    type: yup.string().oneOf(allowedProductTypes)
  }
  let specialSchema = PROPERTY_MAP[productType].attributes
    .reduce((acc, curVal) => ({ ...acc, [curVal]: requiredPositiveNumber }), {})
  let formSchema = yup.object().shape({ ...fixedSchema, ...specialSchema })
  return formSchema
}

/**
 * Prepare received data for displaying on the hompage
 * @param {Object} data data received from API
 * @returns {Object} prepared data
 */
export function prepareData(data) {
  let newData = Object.fromEntries(Object.entries(data).filter(elt => FIXED_ATTRIBUTES.includes(elt[0])))
  let propertyMap = {
    dvd: String(data['size']),
    book: String(data['weight']),
    furniture: `${String(data['height'])}x${String(data['width'])}x${String(data['length'])}`
  }
  newData['property'] = propertyMap[data.type.toLowerCase()]
  return newData
}

export function sanitizeData(data) {
  data.type = data.type.toLowerCase()
  let attributes = FIXED_ATTRIBUTES.concat(PROPERTY_MAP[data.type].attributes)
  return Object.fromEntries(Object.entries(data).filter(p => attributes.includes(p[0])))
}


/**
 * Automatically generate unique SKU for each new product
 * @param {Object[]} data - list of available products
 * @param {String} productType - DVD, Book or Furniture 
 * @returns {String} Generated SKU of length 9 in capital letters with or without numbers
 */
export function generateSKU(data, productType) {
  let skuList = data && data.length > 0 ? data.reduce((acc, curVar) => [...acc, curVar.sku], []) : []
  let charactersList = []
  for (let i = 65; i <= 90; i++) {
    charactersList.push(String.fromCharCode(i))
  }
  for (let i = 0; i <= 9; i++) {
    charactersList.push(i)
  }
  let sku = PROPERTY_MAP[productType.toLowerCase()].skuInitials

  do {
    for (let i = 0; i <= 5; i++) {
      let randomChar = charactersList[Math.floor(Math.random() * charactersList.length)]
      sku += randomChar
    }
  } while (skuList.includes(sku))

  return sku
}
