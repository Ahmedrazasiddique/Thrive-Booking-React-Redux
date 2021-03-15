import React from "react"
import {Collapse} from "reactstrap"
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Button,
    Label,
    Col,
    Row,UncontrolledTooltip
  } from "reactstrap";
  import classnames from "classnames"
  import { EditorState, convertToRaw, ContentState } from 'draft-js';
  import { Editor } from 'react-draft-wysiwyg';
  import draftToHtml from 'draftjs-to-html';
  import htmlToDraft from 'html-to-draftjs';
  
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../../../src/assets/scss/plugins/extensions/editor.scss"
import Prism from "prismjs"
import "prismjs/components/prism-jsx.min"
import Toggle from "react-toggle"
import TagModal from "./TagModal"
import PreviewTemplate from "./PreviewTemplate"
import { Eye,RefreshCcw,Tag,Save,Plus,Minus} from "react-feather"
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSmsTemplateData,updateSmsTemplateData } from "../../../../actions/smsTemplateAction";
import Loader  from "../../../../../src/components/Loader/Loader"


class ClientSmsTemplate extends React.Component {

  state = { collapseID: "", editorState: EditorState.createEmpty(), status: "Closed"
 }



 
  onEntered = id => {
    if (id === this.state.collapseID) this.setState({ status: "Opened" })
  }
  onEntering = id => {
    if (id === this.state.collapseID) this.setState({ status: "Opening..." })
  }

  onExited = id => {
    if (id === this.state.collapseID) this.setState({ status: "Closed" })
  }

  onExiting = id => {
    if (id === this.state.collapseID) this.setState({ status: "Closing..." })
  }
  toggleModal = () => {
    this.setState(prevState => ({
        openTagModal: !prevState.openTagModal
      }))
  }

 constructor(props)
 {
    super(props);
    const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
    const contentBlock = htmlToDraft(html);
  //  if (contentBlock) 
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
     
    

    this.state = {
        clientSmsTemplateData: {},
        guestUserCheckOut:false,
        openTagModal:false,
        ModalOpenPreview:false,
        Tags:["tag 1", "tag 2", "tag 3","tag 4", "tag 5", "tag 6"],
        editorState: EditorState.createEmpty(),
        id:"",
     }
   
 }
 onEditorStateChange = (editorState) => {
  this.setState({
    editorState,
  });
};
 toggleModalPreview = () => {
  this.setState(prevState => ({
    ModalOpenPreview: !prevState.ModalOpenPreview
    }))
}

  handleSwitchChange = (event) => {
    this.setState({guestUserCheckOut:this.state.guestUserCheckOut?false:true})
}
    openModal= (event) => {
        this.setState({openTagModal:this.state.openTagModal?false:true})   
}

onSave = (parameter) => (event) => {
  event.preventDefault();
  this.setState({isShowLoader:true});
  var html=draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
  console.log("id",parameter);
  var object ={}
  object.sms_message=html;
  object.id=parameter;
  this.props.updateSmsTemplateData(object);
}
componentDidUpdate(prevProps,prevSate)
{
  if(this.props!=prevProps)
  {
    if(this.props.IsDataSubmitedSuccessfully){
      this.setState({isShowLoader:false});
    }
  }
}
 componentDidMount()
 {

     this.setState({clientSmsTemplateData:this.props.clientSmsTemplateData})
    
 }

  toggleCollapse = collapseID => {
      this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
      }))
      this.setState({guestUserCheckOut:this.state.guestUserCheckOut?false:true})
    }

    onEditorStateChange = editorState => {
      
        this.setState({
          editorState,
          clientSmsTemplateData:this.props.clientSmsTemplateData
        })
      }
      
  render() {
    const { clientSmsTemplateData } = this.state
    const data=[];
    data.push(clientSmsTemplateData)  
    
    const { editorState } = this.state;

    const accordionShadowItems = data.map(clientSmsTemplateData => {
          return (
          
            <div>
              
  <Loader isShowLoader={this.state.isShowLoader}></Loader>
            <Card className="collapse-border-item collapse-margin" className={classnames({
                "collapse-collapsed":
                  this.state.status === "Closed" &&
                  this.state.collapseID === clientSmsTemplateData.id,
                "collapse-shown":
                  this.state.status === "Opened" &&
                  this.state.collapseID === clientSmsTemplateData.id,
                closing:
                  this.state.status === "Closing..." &&
                  this.state.collapseID === clientSmsTemplateData.id,
                opening:
                  this.state.status === "Opening..." &&
                  this.state.collapseID === clientSmsTemplateData.id
              })}>
              <CardHeader  
              key={clientSmsTemplateData.id}
            >
                  <Col sm="6">
                <CardTitle className="lead collapse-title">
                {clientSmsTemplateData.sms_subject}
              
                 
          
         
                </CardTitle>
                </Col>
                <Col sm="6">
                <label className="react-toggle-wrapper d-flex justify-content-end flex-wrap" style={{cursor:"pointer"}}>
{this.state.guestUserCheckOut? <Minus size={24}    onClick={() => this.toggleCollapse(clientSmsTemplateData.id)} ></Minus>
: <Plus size={24}    onClick={() => this.toggleCollapse(clientSmsTemplateData.id)} ></Plus>
}
</label>     
            </Col>
              </CardHeader>
              <Collapse
                isOpen={clientSmsTemplateData.id === this.state.collapseID}
                onEntering={this.onEntering}
                onEntered={this.onEntered}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <CardBody>  
                    
                    <Editor
                    
                     editorState={editorState.getCurrentContent().hasText()?editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(clientSmsTemplateData.sms_message?clientSmsTemplateData.sms_message:"<p>test</p>")))}
                     onEditorStateChange={this.onEditorStateChange}
            toolbarClassName="demo-toolbar-absolute"
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
           
            toolbar={{
              options: ["inline", "blockType", "fontSize", "fontFamily"],
              inline: {
                options: [
                  "bold",
                  "italic",
                  "underline",
                  "strikethrough",
                  "monospace"
                ],
                bold: { className: "bordered-option-classname" },
                italic: { className: "bordered-option-classname" },
                underline: { className: "bordered-option-classname" },
                strikethrough: { className: "bordered-option-classname" },
                code: { className: "bordered-option-classname" }
              },
              blockType: {
                className: "bordered-option-classname"
              },
              fontSize: {
                className: "bordered-option-classname"
              },
              fontFamily: {
                className: "bordered-option-classname"
              }
            }}
          />
         
          </CardBody>
                <br/>
                <Col className="d-flex justify-content-end flex-wrap" sm="12">
                <Tag size={23} id="tag2"className="mr-1" onClick={this.toggleModal}/>
                <TagModal Tags={this.state.Tags} toggleModal={this.toggleModal} ModalOpen={this.state.openTagModal}></TagModal>
                <UncontrolledTooltip
                  placement="top"
                  target="tag2"
                >
                  Test Tooltip !
                </UncontrolledTooltip>
            
            <RefreshCcw className="mr-1"  id="refresh2" size={23}/>
            <UncontrolledTooltip
                  placement="top"
                  target="refresh2"
                >
                  Test Tooltip !
                </UncontrolledTooltip>
            <Save className="mr-1" onClick={this.onSave(clientSmsTemplateData.id)} id="" size={23} />
            
            <Eye onClick={this.toggleModalPreview} id="preview2" className="mr-1" size={23}/>
            <UncontrolledTooltip
                  placement="top"
                  target="preview2"
                >
                  Test Tooltip !
                </UncontrolledTooltip>
            <PreviewTemplate toggleModalPreview={this.toggleModalPreview} ModalOpenPreview={this.state.ModalOpenPreview}></PreviewTemplate>
           

          </Col>
          <br/>
              </Collapse>
            </Card>
            </div>
          )
        })

    return(
      <div className="collapse-bordered vx-collapse accordion-icon-rotate collapse-border">
      {accordionShadowItems}
    </div>
    )
  }
}
const mapStateToProps = (state) => {
 
  return {
   
    IsDataSubmitedSuccessfully:state.smsTemplate.IsDataSubmitedSuccessfully,
    IsError:state.smsTemplate.IsError,
  
  };
};

const actionMethods = {
  updateSmsTemplateData:updateSmsTemplateData
};

export default connect(mapStateToProps, actionMethods)(ClientSmsTemplate);