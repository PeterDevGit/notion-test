import React, {Component} from "react";
import {validateHandle} from "../utils/validation";

import './Textarea.scss';

class Textarea extends Component{
    static defaultProps = {
        initialization: () => {},
        value: '',
        name: '',
        label: '',
        placeholder: '',
        validation: {},
        errorField: ''
    }

    state = {
        inputValue: '',
        errorText: null
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {errorField} = this.props;
        if(prevProps.errorField !== errorField){
            this.setState({
                errorText: errorField
            })
        }
    }

    onChangedValue = (e) => {
        const {onChanged} = this.props;
        this.setState({
            inputValue: e.target.value
        })
        onChanged(e);
    }

    onBlurInput = () => {
        const {inputValue} = this.state;
        const {validation} = this.props;
        const resultValidate = validateHandle(validation, inputValue);

        this.setState({
            errorText: resultValidate.errorMessage
        });
    }

    render() {
        const {errorText, inputValue} = this.state;
        const {name, label, validation, placeholder} = this.props;

        return(
            <div className="text-area-block">
                <label htmlFor={name}>
                    {label}
                    { validation.required && <span className="required-input">*</span>}
                </label>

                <textarea
                    className={errorText && 'error'}
                    name={name}
                    value={inputValue}
                    placeholder={placeholder}
                    onBlur={this.onBlurInput}
                    onChange={ (e) => this.onChangedValue(e) }
                />

                { errorText && <span className="error-message">{errorText}</span> }
            </div>
            );
    }
}

export default Textarea;