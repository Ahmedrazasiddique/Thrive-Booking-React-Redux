import React from "react";
import { Collapse } from "reactstrap";
import { Card, CardHeader, CardTitle, CardBody, Col } from "reactstrap";
import classnames from "classnames";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../../../src/assets/scss/plugins/extensions/editor.scss";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import TagModal from "./TagModal";
import PreviewTemplate from "./PreviewTemplate";
import { Eye, RefreshCcw, Tag, Save, Plus, Minus } from "react-feather";
import { connect } from "react-redux";
import { updateEmailTemplateData } from "../../../../actions/emailTemplateAction";
import Loader from "../../../../../src/components/Loader/Loader";

class ClientTemplates extends React.Component {
  state = {
    collapseID: "",
    editorState: EditorState.createEmpty(),
    status: "Closed",
  };

  onEntered = (id) => {
    if (id === this.state.collapseID) this.setState({ status: "Opened" });
  };
  onEntering = (id) => {
    if (id === this.state.collapseID) this.setState({ status: "Opening..." });
  };

  onExited = (id) => {
    if (id === this.state.collapseID) this.setState({ status: "Closed" });
  };

  onExiting = (id) => {
    if (id === this.state.collapseID) this.setState({ status: "Closing..." });
  };

  constructor(props) {
    super(props);
    this.state = {
      ClientEmailTemplateData: {},
      guestUserCheckOut: false,
      openTagModal: false,
      ModalOpenPreview: false,
      Tags: this.props.Tags
        ? this.props.Tags
        : ["tag 1", "tag 2", "tag 3", "tag 4", "tag 5", "tag 6"],
      editorState: EditorState.createEmpty(),
      id: "",
      isEditorChangeEventCalled: false,
      defaultPreviewClick: false,
    };
  }

  toggleModalPreview = () => {
    this.setState((prevState) => ({
      ModalOpenPreview: !prevState.ModalOpenPreview,
    }));
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      openTagModal: !prevState.openTagModal,
    }));
  };

  handleSwitchChange = (event) => {
    this.setState({
      guestUserCheckOut: this.state.guestUserCheckOut ? false : true,
    });
  };
  componentDidMount() {
    this.setState({
      ClientEmailTemplateData: this.props.ClientEmailTemplateData,
    });
  }

  toggleCollapse = (collapseID) => {
    this.setState((prevState) => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : "",
    }));
    this.setState({
      guestUserCheckOut: this.state.guestUserCheckOut ? false : true,
    });
  };
  onEditorStateChange = (editorState) => {
    this.setState({ isEditorChangeEventCalled: true });
    this.setState({ defaultPreviewClick: true });

    if (editorState.getCurrentContent().hasText()) {
      this.setState({
        editorState,
        ClientEmailTemplateData: this.props.ClientEmailTemplateData,
      });
    } else {
      this.setState({
        editorState: EditorState.createEmpty(),
        ClientEmailTemplateData: this.props.ClientEmailTemplateData,
      });
    }
  };

  onSave = (parameter) => (event) => {
    event.preventDefault();
    this.setState({ isShowLoader: true });
    var html = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    console.log(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    );
    console.log("id", parameter);
    var object = {};
    object.message = html;
    object.id = parameter;
    this.props.updateEmailTemplateData(object);
  };
  componentDidUpdate(prevProps, prevSate) {
    if (this.props !== prevProps) {
      if (this.props.IsDataSubmitedSuccessfully) {
        this.setState({ isShowLoader: false });
      }
    }
  }

  onResetTemplate = (parameter) => (event) => {
    this.setState({
      editorState: EditorState.createWithContent(
        ContentState.createFromBlockArray(htmlToDraft(parameter))
      ),
    });
  };

  render() {
    const { ClientEmailTemplateData } = this.state;
    const data = [];
    data.push(ClientEmailTemplateData);

    const { editorState } = this.state;
    const accordionShadowItems = data.map((ClientEmailTemplateData) => {
      return (
        <div>
          <Loader isShowLoader={this.state.isShowLoader}></Loader>
          <Card
            className="collapse-border-item collapse-margin"
            className={classnames({
              "collapse-collapsed":
                this.state.status === "Closed" &&
                this.state.collapseID === ClientEmailTemplateData.id,
              "collapse-shown":
                this.state.status === "Opened" &&
                this.state.collapseID === ClientEmailTemplateData.id,
              closing:
                this.state.status === "Closing..." &&
                this.state.collapseID === ClientEmailTemplateData.id,
              opening:
                this.state.status === "Opening..." &&
                this.state.collapseID === ClientEmailTemplateData.id,
            })}
          >
            <CardHeader key={ClientEmailTemplateData.id}>
              <Col sm="6">
              <h4>
              {ClientEmailTemplateData.subject}
                  </h4>
               
              </Col>
              <Col sm="6">
                <label
                  className="react-toggle-wrapper d-flex justify-content-end flex-wrap"
                  style={{ cursor: "pointer" }}
                >
                  {this.state.guestUserCheckOut ? (
                    <Minus
                      size={24}
                      onClick={() =>
                        this.toggleCollapse(ClientEmailTemplateData.id)
                      }
                    ></Minus>
                  ) : (
                    <Plus
                      size={24}
                      onClick={() =>
                        this.toggleCollapse(ClientEmailTemplateData.id)
                      }
                    ></Plus>
                  )}
                </label>
              </Col>
            </CardHeader>
            <Collapse
              isOpen={ClientEmailTemplateData.id === this.state.collapseID}
              onEntering={this.onEntering}
              onEntered={this.onEntered}
              onExiting={this.onExiting}
              onExited={this.onExited}
            >
              <CardBody>
                <Editor
                  toolbarClassName="demo-toolbar-absolute"
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  //editorState={editorState.getCurrentContent().hasText()?editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(ClientEmailTemplateData.message?ClientEmailTemplateData.message:"<p>test</p>")))}
                  editorState={
                    !this.state.isEditorChangeEventCalled
                      ? EditorState.createWithContent(
                          ContentState.createFromBlockArray(
                            htmlToDraft(
                              ClientEmailTemplateData.message
                                ? ClientEmailTemplateData.message
                                : ""
                            )
                          )
                        )
                      : editorState
                  }
                  onEditorStateChange={this.onEditorStateChange}
                  toolbar={{
                    options: ["inline", "blockType", "fontSize", "fontFamily"],
                    inline: {
                      options: [
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "monospace",
                      ],
                      bold: { className: "bordered-option-classname" },
                      italic: { className: "bordered-option-classname" },
                      underline: { className: "bordered-option-classname" },
                      strikethrough: { className: "bordered-option-classname" },
                      code: { className: "bordered-option-classname" },
                    },
                    blockType: {
                      className: "bordered-option-classname",
                    },
                    fontSize: {
                      className: "bordered-option-classname",
                    },
                    fontFamily: {
                      className: "bordered-option-classname",
                    },
                  }}
                />
              </CardBody>
              <br />
              
              <Col className="d-flex justify-content-end flex-wrap" sm="12">
                <Tag
                  size={23}
                  className="mr-1"
                  id="tag1"
                  onClick={this.toggleModal}
                />
                <TagModal
                  Tags={this.state.Tags}
                  toggleModal={this.toggleModal}
                  ModalOpen={this.state.openTagModal}
                ></TagModal>

                <RefreshCcw
                  className="mr-1"
                  onClick={this.onResetTemplate(
                    ClientEmailTemplateData.message
                  )}
                  id="refresh2"
                  size={23}
                />

                <Save
                  className="mr-1"
                  onClick={this.onSave(ClientEmailTemplateData.id)}
                  id={ClientEmailTemplateData.id}
                  size={23}
                />

                <Eye
                  onClick={this.toggleModalPreview}
                  id="view1"
                  className="mr-1"
                  size={23}
                />

                <PreviewTemplate
                  template={this.state.editorContentHtml}
                  // PreviewTemplateData={ClientEmailTemplateData.message}
                  PreviewTemplateData={
                    !this.state.defaultPreviewClick
                      ? ClientEmailTemplateData.message
                      : draftToHtml(
                          convertToRaw(
                            this.state.editorState.getCurrentContent()
                          )
                        )
                  }
                  toggleModalPreview={this.toggleModalPreview}
                  ModalOpenPreview={this.state.ModalOpenPreview}
                ></PreviewTemplate>
              </Col>
              <br />
            </Collapse>
          </Card>
        </div>
      );
    });

    return (
      <div className="collapse-bordered vx-collapse accordion-icon-rotate collapse-border">
        {accordionShadowItems}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    IsDataSubmitedSuccessfully: state.emailTemplate.IsDataSubmitedSuccessfully,
    IsError: state.emailTemplate.IsError,
  };
};
const actionMethods = {
  updateEmailTemplateData: updateEmailTemplateData,
};

export default connect(mapStateToProps, actionMethods)(ClientTemplates);
