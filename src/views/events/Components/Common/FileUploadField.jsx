import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import PropTypes from "prop-types";

class FileUploadField extends Component {

    state = {
        fileName: ""
    };

    upload = React.createRef();

    onFileChange = ({ target }) => {
        const { files } = target || {};
        const { name } = files[0] || {};

        this.setState({
            fileName: name
        }, () => {
            const { onChange } = this.props;
            onChange(files[0]);
        })
    }
    render() {
        const { accept, placeholder } = this.props;
        const { fileName } = this.state;

        return (
            <div className="file-upload-field">
                <input 
                    type="file" 
                    className="hidden"
                    ref={(ref) => this.upload = ref}
                    onChange={this.onFileChange.bind(this)}
                    accept = { accept }
                />
                <InputGroup>
                    <Input placeholder = { placeholder ? placeholder : "Choose File" } value = { fileName }/>
                    <InputGroupAddon addonType="append"><Button className="btn-app-secondary" onClick={() => { this.upload.click() }}>Browse</Button></InputGroupAddon>
                </InputGroup>
            </div>
        )
    }
}


FileUploadField.propTypes = {
    accept: PropTypes.any,
    onChange: PropTypes.func,
    placeholder: PropTypes.any
};

export default FileUploadField;