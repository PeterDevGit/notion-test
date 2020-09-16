import React, {Component} from "react";
import {validateHandle} from "../utils/validation";

import './Input.scss';

class Input extends Component{
    static defaultProps = {
        initialization: () => {},
        value: '',
        name:'',
        type: '',
        label: '',
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
        const {name, type, label, validation, placeholder} = this.props;

        return(
            <React.Fragment>
                <label htmlFor={name}>
                    {label}
                    { validation.required && <span className="required-input">*</span>}
                </label>

                <input
                    className={errorText && 'error'}
                    name={name}
                    type={type}
                    value={inputValue}
                    placeholder={placeholder}
                    onBlur={this.onBlurInput}
                    onChange={ (e) => this.onChangedValue(e) }
                />
                { errorText && <span className="error-message">{errorText}</span> }
            </React.Fragment>
        );
    }
}

export default Input;