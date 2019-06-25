import React from 'react';
import './App.css';
import axios from 'axios';

interface AppState {
    fileToUplaod: Blob
}

export default class App extends React.Component<any, AppState> {

    handleChange = (files: any) => {
        this.setState({"fileToUplaod": files[0]});
    };

    handleClick = () => {
        this.uplaodFile();
    };

    uplaodFile = () => {
        const formData = new FormData();
        formData.append('file', this.state.fileToUplaod);
        const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.post('http://localhost:3000/upload', formData, config)
            .then(res => {
                console.log('Okejka', res)
            })
            .catch(err => {
                console.log('Error:' ,err);
            })
    };

    render() {
        return (
            <div className="App">
                Import:
                <input type="file" onChange={e => this.handleChange(e.target.files)}/>
                <input type="button" value="Importuj" onClick={() => this.handleClick()}/>
            </div>
        );
    }

}

