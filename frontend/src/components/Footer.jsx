import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  const year = new Date().getFullYear()
  const faClassName = 'footer-icon'
  return (
    <footer className='footer'>
      <h2 className='footer-title'>Scandiweb Test Assignment</h2>
      <div className='footer-links'>
        <Link to='https://linkedin.com/in/temgoua' target='_blank' className='footer-link'>
          <FaLinkedin className={faClassName} />
        </Link>
        <Link to='https://github.com/tem-ctrl' target='_blank' className='footer-link'>
          <FaGithub className={faClassName} />
        </Link>
        <Link to='https://wa.me/237651331062' target='_blank' className='footer-link'>
          <FaWhatsapp className={faClassName} />
        </Link>
      </div>
      <p className='footer-copyright'>© {year} Gilbert Temgoua</p>
    </footer>
  )
}

export default Footer
