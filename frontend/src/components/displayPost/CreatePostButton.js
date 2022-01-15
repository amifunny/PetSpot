import React from "react";
import "./CreatePostButton.css";

import { Link } from "react-router-dom";

import CreateBtnBg from "../../img/createBtnBg.jpg";

import {Container, Row, Col} from 'react-bootstrap'
import {MdAddToPhotos} from 'react-icons/md'
import {BiHappyHeartEyes} from 'react-icons/bi'

function CreatePostButton() {

  return (
    <Row>
      <Col>
        <Link to='/create-post' style={{textDecoration:'none'}}>
          <div
            className='post-card'
            style={{
              borderColor: "#D3D3D3",
              position: "relative",
            }}
          >
            <div>
              <img 
              className='card-img-top'
              src={CreateBtnBg} />
            </div>
            <div className="create-btn-title my-3 px-1">
              <MdAddToPhotos className="mx-2"/>
              Make post about your pet. 
              <BiHappyHeartEyes className="mx-2"/>

            </div>
          </div>
        </Link>
      </Col>
    </Row>

  );
}

export default CreatePostButton;
