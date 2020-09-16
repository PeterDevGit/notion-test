import React, {Component} from "react";

import labelImg from './img/load-label-image.png';

import './InputFile.scss';
import {validateHandle} from "../utils/validation";

class InputFile extends Component{
    static defaultProps = {
        initialization: () => {},
        id: '',
        value: '',
        name:'',
        label: '',
        validation: {},
        errorField: ''
    }

    state = {
        errorText:'',
        countFiles: 0,
        inputValue: ''
    }

    componentDidMount() {
        const { value, name, initialization, validation, errorField } = this.props;
        initialization(value, validation, name);

        if(value){
            this.setState({
                inputValue: value
            })
        }
        if(errorField){
            this.setState({
                errorText: errorField
            })
        }
    }

    onChangedValue = (e) => {
        const {onChanged, validation} = this.props;
        const count = e.target.files;
        const resultValidate = validateHandle(validation, count);

        this.setState({
            inputValue: e.target.files,
            countFiles: count.length,
            errorText: resultValidate.errorMessage
        })
        onChanged(e);
    }

    render() {
        const {countFiles, errorText} = this.state;
        const {type, name, label, id} = this.props;

        return(
            <span className="load-file-input">

                <label htmlFor={id}>
                    <img src={labelImg} alt="load file" />
                    <span>{label}</span>
                </label>
                <span className="count-files">{countFiles} files attached</span>

                <input
                    type={type}
                    name={name}
                    id={id}
                    multiple
                    onChange={ (e) => this.onChangedValue(e) }

                />
                { errorText && <span className="error-message">{errorText}</span> }
            </span>
        );
    }
}

export default InputFile;