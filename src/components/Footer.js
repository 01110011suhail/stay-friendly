import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2026 RoomBooking. All rights reserved.</p>
      <p>Contact us: info@roombooking.com</p>
    </FooterContainer>
  );
};

export default Footer;