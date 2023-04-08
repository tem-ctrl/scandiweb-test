import { toast } from "react-toastify"

export const PROPERTY_MAP = {
  dvd: {
    property: 'size',
    attributes: ['size'],
    skuInitials: 'JVC',
    cardLabel: ['Size:', '(MB)']
  },
  book: {
    property: 'weight',
    attributes: ['weight'],
    skuInitials: 'GGW',
    cardLabel: ['Weight:', '(KG)']
  },
  furniture: {
    property: 'dimensions',
    attributes: ['height', 'width', 'length'],
    skuInitials: 'TR1',
    cardLabel: ['Dimension:', '']
  }
}

export const FIXED_ATTRIBUTES = ['sku', 'name', 'price', 'type']

export const TOAST_OPTIONS = {
  autoClose: 2000,
  type: toast.TYPE.ERROR,
  hideProgressBar: true,
  position: toast.POSITION.TOP_CENTER,
  pauseOnHover: false,
  pauseOnFocusLoss: false
}

export const ERRORS = {
  required: 'Please submit required data',
  type: 'Please provide the data of indicated type'
}

export const PAGES = {
  homePage: '/',
  addProductPage: '/add-product'
}

export const API_URLS = {
  // Production endpoints
  // get: 'https://gtemgoua-scandiweb-test.000webhostapp.com/api/',
  // post: 'https://gtemgoua-scandiweb-test.000webhostapp.com/api/add-product',
  // delete: 'https://gtemgoua-scandiweb-test.000webhostapp.com/api/mass-delete',

  // Development endpoints
  get: 'http://localhost:80',
  post: 'http://localhost:80/add-product',
  delete: 'http://localhost:80/mass-delete'
}
