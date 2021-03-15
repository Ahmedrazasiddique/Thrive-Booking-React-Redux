import React , { useState, useEffect }from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Button,
  Label,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  CustomInput,
  Media,
  Form
} from "reactstrap";
import Select from "react-select";
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DropzoneAccept from "../../../components/Dropzone/DropzoneAccept"
import "../../../../src/assets/scss/plugins/extensions/dropzone.scss"
import SweetAlert from 'react-bootstrap-sweetalert';
import ErrorSpan from "../../../components/Extra/ErrorSpan"
import { Link,Chrome,Tag} from "react-feather"
import "../../../../src/assets/scss/style.scss"
import img from "../../../../src/assets/img/portrait/small/avatar-s-11.jpg"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSeoData,updateSeoData } from "../../../actions/seoAction";
import Loader  from "../../../../src/components/Loader/Loader"

const SEO = (props) => {

  const [SeoData, setSeoData] = useState({});
  const[isShowLoader , setIsShowLoader] =useState(false);
  
  useEffect(() => {
    if(!props.seoSuccess)
    props.getSeoData(1);
  });
  const handleInputChange = (e) => {
  
    let value = { [e.target.name]: e.target.value } ;
    value = {
        ...SeoData,
        ...value,
    };
    setSeoData( {[e.target.name]: e.target.value} )
   // console.log(inputs);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    setIsShowLoader(true);
    const formData = new FormData(event.target);
    formData.append('business_id', 1);
 
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
  props.updateSeoData(formData)

}
useEffect(() => {

  if(props.IsDataSubmitedSuccessfully)
  {setIsShowLoader(false);
    toast.success("My Thrive Link Updated Successfully");
  }

  if(props.IsError)
  { 
    setIsShowLoader(false);
    toast.error("something went wrong");
  }}
  ,);

  useEffect(() => {

    if(props.seoSuccess)
    {
    setSeoData(props.SeoData)
    setIsShowLoader(false);
    }
    else
    {
      setIsShowLoader(true);
    }

  },[props.SeoData]);

  return (
    <Card>
       <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
        </CardHeader>
    <CardBody>
      
  <Loader isShowLoader={isShowLoader}></Loader>
         
                <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm="6">
                  <Col sm="12">
                    <Label for="googleAnalyticsCode">Google Analytics Code <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Input
                       className="form-control"
                        type="text"
                        name="google_analytics_code"
                        id="googleAnalyticsCode"
                        placeholder="Analytics Code"
                        value={SeoData.google_analytics_code}
                        onChange={handleInputChange}
                      />
                      <div className="form-control-position">
                        <Chrome size={15} />
                      </div>
                    

                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <Label for="pageMetaTag">Page/Meta Tag <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Input
                        className="form-control"
                        type="text"
                        name="meta_tag"
                        id="pageMetaTag"
                        placeholder="Type Page/Meta Tag"
                        value={SeoData.meta_tag}
                        onChange={handleInputChange}
                      />
                      <div className="form-control-position">
                        <Tag size={15} />
                      </div>
                  
                    </FormGroup>
                  </Col>
                  <Col sm="12">
                    <Label for="ogTagType">Og Tag Type <ErrorSpan></ErrorSpan></Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Input
                       className="form-control"
                        type="text"
                        name="og_tag_type"
                        id="ogTagType"
                        placeholder="Type Og Tag Type"
                        value={SeoData.og_tag_type}
                        onChange={handleInputChange}
                      />
                      <div className="form-control-position">
                        <Tag size={15} />
                      </div>
                    
                    </FormGroup>
                  </Col>

                
                  <Col sm="12">
                  <Media>
                  <Media className="mr-1" left href="#">
            <Media
              className="rounded-circle"
              object
              src={SeoData.og_tage_image}
              alt="User"
              height="86"
              width="86"
            />
          </Media>
          <Media className="mt-25" body>
            <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline
              >
                Upload Og Tag Image
                <Input type="file" name="og_tage_image"  id="uploadImg" hidden />
              </Button.Ripple>
             
            </div>
            <p className="text-muted mt-50">
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p>
          </Media>
        </Media>
                  </Col>

                  </Col>

                  <Col sm="6">
                  <Row>
                  <Col sm="12">
                    <Label for="metaDescription">Meta Description</Label>
                    <FormGroup className="has-icon-left position-relative">
                     
                    <textarea name="meta_description"  onChange={handleInputChange} value={SeoData.meta_description} id="metaDescription" class="form-control textAreaCss"></textarea>
                     
                    </FormGroup>
                  </Col>
                  <br/>
                  </Row>
                  <Row>
                    
                  <Col sm="12">
                    <Label for="ogTagUrl">Og Tag URL</Label>
                    <FormGroup className="has-icon-left position-relative">
                      <Input
                       className="form-control"
                        type="text"
                        name="og_tag_url"
                        id="ogTagUrl"
                        placeholder="Type Og Tag Url"
                        value={SeoData.og_tag_url}
                        onChange={handleInputChange}
                      />
                      <div className="form-control-position">
                        <Link size={15} />
                      </div>
                    </FormGroup>
                  </Col>
          
                  </Row>
                 

                  </Col>
                
                
                  <Col className="d-flex justify-content-end flex-wrap" sm="12">
            <Button.Ripple className="mr-1" color="primary">
              Save Changes
            </Button.Ripple>
           
          </Col>
                </Row>
              </Form>
           
        
       

          <ToastContainer />
        </CardBody>
         </Card>
  );
};


const mapStateToProps = (state) => {
 
  return {
    SeoData: state.seo.data,
    seoSuccess:state.seo.seoSuccess,
    IsDataSubmitedSuccessfully:state.seo.IsDataSubmitedSuccessfully,
    IsError:state.seo.IsError
  };
};

const actionMethods = {
  getSeoData: getSeoData,
  updateSeoData:updateSeoData
};

export default connect(mapStateToProps, actionMethods)(SEO);

