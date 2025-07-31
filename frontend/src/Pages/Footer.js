import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import "../Pages/Footer.css";
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { MdEmail } from "react-icons/md";
import { faLocation } from '@fortawesome/free-solid-svg-icons';
function Footer() {
  return (
    <div className="Footer">
      <div className="col1">
        <h4 className='title'>MinT</h4>
        <p className='words'>To learn more about us, utilize the quick links for easy access. If you have any questions or wish to contact us, please use the 'Contact Us' option.</p>
        <a className='facebook' href='https://www.facebook.com/MInT.Ethiopia/'>
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a className='twitter' href='https://twitter.com/MinistryofInno2'>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a className='telegram' href='https://t.me/MinTEthiopia'>
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a className='linkedin' href='https://et.linkedin.com/company/ministry-of-innovation-and-technology-ethiopia'>
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <div className="col2">
        <h5 className='title'>Quick Link</h5>
        <ul>
          <li className="nav-item">
            <Link to="/admin" style={{ color: 'white' }} className='link'>LOGIN</Link>
          </li>
        </ul>
      </div>
  <div className="col3">
  <h5 className='title'>Contact us</h5>
  <ul>
  <li><div className="contact-info">
   <MdEmail className="icon" />
    <p className="email-address"> <a href="mailto:info@mint.gov.et">info@mint.gov.et</a></p>
       </div></li>
       <li><div className='direction'>
       <a className='location' href='https://www.google.com/maps/place/Ministry+of+Science+and+Technology/@9.0238105,38.7528862,780m/data=!3m1!1e3!4m5!3m4!1s0x0:0x2dc416a9b5ac4ac4!8m2!3d9.0238105!4d38.7550749?hl=en-US 000000 Addis Ababa, Ethiopia'>
       <FontAwesomeIcon icon={faLocation} className='iconn'/><p className='address'>LOCATION</p>
       </a>
        </div></li>
       <li></li>
       <li></li>
       </ul>
     </div>
    </div>
  );
}
export default Footer;