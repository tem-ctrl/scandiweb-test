import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useFetch } from '../utils/hooks'
import { setDefaultFormValues, createFormSchema, sanitizeData, generateSKU } from '../utils/utils'
import { PAGES, TOAST_OPTIONS, PROPERTY_MAP, API_URLS } from '../utils/constants'


const AddProductForm = () => {

  const [sku, setSku] = useState('')
  const { data, isLoading, isFetching } = useFetch()
  const [defaultValues, setDefaultValues] = useState({})
  const [productType, setProductType] = useState('dvd')
  const [formSchema, setFormSchema] = useState(createFormSchema(productType))
  const navigate = useNavigate()// eslint-disable-next-line
  const { register, getValues, setValue, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(formSchema)
  })

  const notify = (message) => {
    toast.error(message, TOAST_OPTIONS)
    toast.clearWaitingQueue()
  }

  // Generate sku upon product type change
  useEffect(() => {
    let newSku = sku
    if (!isLoading && !isFetching) {
      newSku = generateSKU(data.data, productType)
    }
    setValue('sku', newSku)
    setSku(newSku)  // eslint-disable-next-line
  }, [productType, data])

  // Generate form schema on product type change
  useEffect(() => {
    let newSchema = createFormSchema(productType)
    let newDefaults = setDefaultFormValues(productType)
    setDefaultValues(newDefaults)
    setFormSchema(newSchema) // eslint-disable-next-line
  }, [productType])

  const onSubmit = (event) => {
    event.preventDefault()
    let submitData = sanitizeData(getValues())
    formSchema.validate(submitData)
      .then(() => {
        axios.post(API_URLS.post, { ...submitData }, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
          .then((res) => {
            navigate(PAGES.homePage)
            console.log(res.data)
          })
          .catch((error) => console.log(error))
      })
      .catch(err => {
        notify(err.message)
      })
  }

  return (
    <form onSubmit={onSubmit} id='product_form' >
      <p className='required'>All fields are required !</p>

      <label className='label'>
        <span className='label-text'>SKU:</span>
        <div className='label-body'>
          <input {...register('sku')} type='text' id='sku' className='label-input' placeholder='Enter product SKU' />
          <span className='label-body-desc'>Automatically generated!</span>
        </div>
      </label>

      <label className='label'>
        <span className='label-text'>Name:</span>
        <div className='label-body'>
          <input {...register('name')} type='text' id='name' placeholder='Enter product name' className='label-input' />
        </div>
      </label>

      <label className='label'>
        <span className='label-text'>Price ($):</span>
        <div className='label-body'>
          <input {...register('price')} type='number' step='any' id='price' className='label-input' />
        </div>
      </label>

      <label className='label'>
        <span className='label-text'>Type Switcher:</span>
        <div className='label-body'>
          <select {...register('type')} id='productType' onChange={(e) => setProductType(e.target.value.toLocaleLowerCase())} className='label-input'>
            <option value='DVD' id='DVD'>DVD</option>
            <option value='Book' id='Book'>Book</option>
            <option value='Furniture' id='Furniture'>Furniture</option>
          </select>
          <span className='label-body-desc'>{`Please, provide ${PROPERTY_MAP[productType.toLowerCase()].property}`}</span>
        </div>
      </label>

      {
        productType.toLowerCase() === 'dvd' &&
        <label className='label'>
          <span className='label-text'>Size (MB):</span>
          <div className='label-body'>
            <input {...register('size')} type='number' step='any' id='size' className='label-input' />
          </div>
        </label>
      }
      {
        productType.toLowerCase() === 'book' &&
        <label className='label'>
          <span className='label-text'>Weight (kg):</span>
          <div className='label-body'>
            <input {...register('weight')} type='number' step='any' id='weight' className='label-input' />
          </div>
        </label>
      }
      {
        productType.toLowerCase() === 'furniture' && <>
          <label className='label'>
            <span className='label-text'>Height (CM):</span>
            <div className='label-body'>
              <input {...register('height')} type='number' step='any' id='height' className='label-input' />
            </div>
          </label>

          <label className='label'>
            <span className='label-text'>Width (CM):</span>
            <div className='label-body'>
              <input {...register('width')} type='number' step='any' id='width' className='label-input' />
            </div>
          </label>

          <label className='label'>
            <span className='label-text'>Length (CM):</span>
            <div className='label-body'>
              <input {...register('length')} type='number' step='any' id='length' className='label-input' />
            </div>
          </label>
        </>
      }
    </form >
  )
}

export default AddProductForm
