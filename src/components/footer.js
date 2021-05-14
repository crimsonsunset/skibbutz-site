import React from "react"
import { FaFacebookSquare, FaInstagram } from "react-icons/fa"
import Link from "./link"
import styled from "styled-components"
import * as foot from "@data/footer.js"

const FooterStyling = styled.footer`
  background: #f8f9fa;
  margin: auto;
  text-align: center;
  padding-top: 2rem;
  
  .footer__content{
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    max-width: 960px;
    padding: 30px;
  }
  
  a, a:hover {
    color: inherit;
  }

  ul {
    color: rgba(0, 0, 0, 0.5);
    -webkit-padding-start: 0;
    padding: 0;

    & > li {
      list-style: none;

      a, a:hover {
        color: inherit;
      }
    }
  }
`

let SocialLink = ({ Icon, link }) => (
  <Link to={link} className="mr-2">
    <Icon size={30} />
  </Link>
)

let FooterLink = ({ to, children }) => (
  <li>
    <Link to={to}>
      {children}
    </Link>
  </li>
)

let Footer = () => (
  <FooterStyling>
    <div className='footer__content'>
      {foot.footer.map(item => (
        <div
          key={item.name}
          className="footer__section">
          <h5>{item.name}</h5>
          <ul>
            {item.dropdownItems.map(dropdownItem => (
              <FooterLink
                key={dropdownItem.name}
                to={dropdownItem.url}>{dropdownItem.name}</FooterLink>
            ))}
          </ul>
        </div>
      ))}
      <div className="footer__section">
        <h5>Let's Get Social!</h5>
        <SocialLink Icon={FaFacebookSquare} link='https://facebook.com'/>
        <SocialLink Icon={FaInstagram} link='https://instagram.com' />
      </div>
    </div>
  </FooterStyling>
)

export default Footer
