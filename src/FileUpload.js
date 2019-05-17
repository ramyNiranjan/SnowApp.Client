    
import React, { Component } from 'react'
import axios from 'axios'

class FileUpload extends Component {
    constructor(props) {
        super(props);

        this.uploadJustFile = this.uploadJustFile.bind(this);
        this.filesOnChange = this.filesOnChange.bind(this);

        this.state = {
            justFileServiceResponse: 'Click to upload!',
            formServiceResponse: 'Click to upload the form!',
            fields: {}
        }
    }
    uploadJustFile(e) {
        e.preventDefault();
        let state = this.state;

        this.setState({
            ...state,
            justFileServiceResponse: 'Please wait'
        });

        if (!state.hasOwnProperty('files')) {
            this.setState({
                ...state,
                justFileServiceResponse: 'First select a file!'
            });
            return;
        }

        let form = new FormData();


        for (var index = 0; index < state.files.length; index++) {
            var element = state.files[index];
            form.append('file', element);
        }

        axios.post('/api/fileupload', form)
            .then((result) => {
                let message = "Success!"
                if (!result.data.success) {
                    message = result.data.message;
                }
                this.setState({
                    ...state,
                    justFileServiceResponse: message
                });
            })
            .catch((ex) => {
                console.error(ex);
            });
    }
    filesOnChange(sender) {
        let files = sender.target.files;
        let state = this.state;

        this.setState({
            ...state,
            files: files
        });
    }
    render(){
        return(
         <div>
              <form>
                    <h2>Just file</h2>
                    <p><b>{this.state.justFileServiceResponse}</b></p>
                    <input type="file" id="case-one" onChange={this.filesOnChange} />
                    <br />
                    <button type="text" onClick={this.uploadJustFile}>Upload just file</button>
                </form>
         </div>
        );
    }
}

export default FileUpload;