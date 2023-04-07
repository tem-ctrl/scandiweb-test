import { Link } from "react-router-dom"

const LinkButton = ({ text, path }) => {

  return (
    <Link className="button-link link" to={path}><button className="button">{text}</button></Link>
  )
}

export default LinkButton
