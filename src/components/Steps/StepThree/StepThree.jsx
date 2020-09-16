import React, {Component} from "react";
import Input from "../../Input/Input";
import Textarea from "../../Textarea/Textarea";
import InputFile from "../../InputFile/InputFile";
import Submit from "../../Submit/Submit";
import {validateSubmit} from "../../utils/validation";

import './StepThree.scss';

class StepThree extends Component{
    constructor(props){
        super(props);
        this.state= {
            company_name: '',
            numberPeople:'',
            businessArea:'',
            descriptionText:'',
            inputFile:'',
            errorField:{}
        }
        this.allFields = {}
    }


    changeInput = (event) => {
        const type = event.target.type;
        const fieldName = event.target.name;
        let value = ''
        if(type === 'file'){
            value = event.target.files
        }else {
            value = event.target.value
        }
        this.allFields[fieldName].value = value;
    }

    initialization = (value, validation, nameField) => {
        this.allFields[nameField] = { value, validation }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const resultValidateForm = validateSubmit(this.allFields);
        if(!resultValidateForm.error){
            console.log('Log: ', this.allFields)
        }else {
            this.setState({
                errorField: {...resultValidateForm.errorMassage}
            })
        }
    }

    render() {
        const {errorField} = this.state;

        return(
            <React.Fragment>
                <span className="two-input-row">
                    <span className="company-name form-input">
                        <Input
                            label="Your company name"
                            placeholder="Type text"
                            type="text"
                            name="companyName"
                            validation={{
                                maxLength: 100
                            }}
                            initialization={this.initialization}
                            errorField={errorField && errorField.companyName}
                            onChanged={ inputName => this.changeInput(inputName) }
                        />
                    </span>

                    <span className="number-people form-input">
                        <Input
                            label="Number of people"
                            placeholder="1-99"
                            name="numberPeople"
                            type="text"
                            validation={{
                                required: true,
                                number: true,
                                maxNumber: 99,
                            }}
                            initialization={this.initialization}
                            errorField={errorField && errorField.numberPeople}
                            onChanged={ inputName => this.changeInput(inputName) }
                        />
                    </span>
            </span>

            <span className="input-full-row form-input">
                <Input
                    label="Business area"
                    placeholder="Design, Marketing, Development, etc."
                    name="businessArea"
                    type="text"
                    validation={{
                        required: true,
                        maxLength: 100
                    }}
                    initialization={this.initialization}
                    errorField={errorField && errorField.businessArea}
                    onChanged={ inputName => this.changeInput(inputName) }
                />
            </span>

            <span className="input-full-row form-input">
                <Textarea
                    label="Description"
                    placeholder="Type text"
                    name="descriptionText"
                    validation={{
                        required: true,
                        maxLength: 10
                    }}
                    initialization={this.initialization}
                    errorField={errorField && errorField.descriptionText}
                    onChanged={ inputName => this.changeInput(inputName) }
                />
            </span>

            <span className="input-full-row form-input">
                <InputFile
                    label="Add file as attachment"
                    id="load_files"
                    type="file"
                    name="input_load_files"
                    validation={{
                        maxFileSize: 1
                    }}
                    initialization={this.initialization}
                    errorField={errorField && errorField.descriptionText}
                    onChanged={ inputName => this.changeInput(inputName) }
                />
            </span>

            <span className="input-full-row">
                <Submit
                    type="submit"
                    label="Submit"
                    handleSubmit = {this.handleSubmit}
                />
            </span>

            </React.Fragment>
        );
    }
}

export default StepThree;