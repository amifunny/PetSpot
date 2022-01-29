import React from "react";
import "./footer.css";

import {Container, Row, Col} from 'react-bootstrap'

function Footer() {

  const githubID = "https://github.com/amifunny/"
  
  return (
  <Container fluid className="footer">
    <Row className="stickyfooter">
      <Col className="align-items-center justify-content-center">
        <div className='my-3'>
          Made with ❤ by 
          <a href={githubID} className="mx-2 footer-link"
          target="_blank">amifunny</a>
        </div>
      </Col>
    </Row>
  </Container>
  );
  
}

export default Footer;
