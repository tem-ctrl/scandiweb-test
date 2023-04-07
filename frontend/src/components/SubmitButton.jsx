
const SubmitButton = ({ text, form, id = '', handleclick = () => null }) => {

  return (
    <button className="button" id={`${id}`} type='submit' form={form} onClick={handleclick}>{text}</button>
  )
}

export default SubmitButton
