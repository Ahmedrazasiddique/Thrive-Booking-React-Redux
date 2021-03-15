import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from 'jodit-react';



class TextEditor extends Component {
    
    constructor(props) {
        super(props);
        const { value } = props;
        this.state = {
            content: value
        }
    }
    
    shouldComponentUpdate() {
        return false
    }

    render () {
        const { content } = this.state;
        const { onChange } = this.props;
        return (
            <div className="textarea-wrapper gutter-25">
                <JoditEditor
                        
                    config= {{
                        readonly: false,
                        uploader: {
                            insertImageAsBase64URI: true
                        },
                        filebrowser: {
                            ajax: {
                                url: 'connector/index.php',
                                process (resp) {
                                    console.log({
                                        resp
                                    });
                                    // return {
                                    //     resp.files || [], // {array} The names of files or folders
                                    //     path: resp.path, // {string} Real relative path
                                    //     baseurl: resp.baseurl, // {string} Base url for filebrowser
                                    //     error: resp.error, // {int}
                                    //     msg: resp.msg // {string}
                                    // };
                                },
                                uploader: {
                                    url: 'connector/index.php?action=upload'
                                },
                                // it defaults but still show their
                                create: {
                                    data: {action: 'create'}
                                },
                                move: {
                                    data: {action: 'move'}
                                },
                                remove: {
                                    data: {action: 'remove'}
                                },
                                items: {
                                    data: {action: 'items'}
                                },
                                folder: {
                                    data: {action: 'folder'}
                                }
                            },
                        },
                        toolbarAdaptive:false,
                        buttons: ['paragraph', '|', 'bold', 'underline', 'italic', '|', 'ul', 'ol', 'link', '|', 'indent', 'outdent', 'align', '|', 'undo', 'redo' ],
                        showXPathInStatusbar: false,
                        showWordsCounter: false,
                    }}
                    value={content}
                    onBlur={newContent => {
                        console.log({
                            newContent
                        })
                        this.setState({
                            'content': newContent
                        }, onChange(newContent));
                    }}   
                >
                </JoditEditor>
            </div>
        )
    }
}

TextEditor.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
}


export default TextEditor;