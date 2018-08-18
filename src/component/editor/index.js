import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.less';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


class MEditor extends Component {
    constructor (props) {
	    super(props)
	    this.state = {
	      editorContent: "",
	    }
	}
	onDraftEditorChange = (editorContent) => {
        let value=draftToHtml(convertToRaw(editorContent.getCurrentContent()));
        // console.log('value',value);
        this.setState({
            editorContent:value
          })
        this.props.onSubmitCh(value);
    }
    
	render () {
         const { editorContent } = this.state;
        //  console.log('props',this.props.ddd);
		 return (
		 	<Editor 
		  		// toolbarClassName={styles.toolbar} 
		  		wrapperClassName="main-wrapper"
		  		editorClassName='main-editor'
		  		// editorState={editorContent}
		  		onEditorStateChange={this.onDraftEditorChange} />
  		)
	}
}

export default MEditor;