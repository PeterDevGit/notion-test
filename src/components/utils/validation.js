const validatePattern = (type, typeValue ,value) => {
    switch (type) {
        case 'required': {
            const result = value.length;
            return {
                value,
                error: !result,
                errorMessage: result ? '' : 'This field in required'
            }
        }
        case 'number': {
            const pattern = /^\d+$/;
            const result = pattern.test(String(value).toLowerCase());
            return {
                value,
                error: !result,
                errorMessage: result ? '' : 'Please enter only number'
            }
        }
        case 'maxNumber': {
            const result = (value > 0) && (value <= typeValue);
            return {
                value,
                error: !result,
                errorMessage: result ? '' : 'Please enter number from 1 to 99'
            }
        }
        case 'maxLength': {
            const result = value.length < typeValue;
            return {
                value,
                error: !result,
                errorMessage: result ? '' : 'Max length ' + typeValue
            }
        }
        case 'maxFileSize': {
            let data = {}
            for(let key = 0;  key < value.length;  key++ ){
                const fileSize = ((value[key].size/1024)/1024).toFixed(4);
                const result = fileSize > typeValue;
                    data = {
                        value,
                        error: result,
                        errorMessage: result ? `Max file size ${typeValue}MB` : ''
                    }
                    if(result){
                        break;
                    }
            }
            return data;
        }
        default: return { value, error: false, errorMessage: 'Error' }
    }
}

const validateHandle = (optionsValidate, value) => {
    let errors = {};
    if(Object.keys(optionsValidate).length){
        for(const key in optionsValidate){
            const result = validatePattern(key, optionsValidate[key], value);
            if(result.error){
                errors = result;
                break;
            }
        }
    }
    return errors
}

const validateSubmit = (allFields) => {
    let errorsInfo = {
        error: false,
        errorMassage: {}
    };
    if(Object.keys(allFields).length){
        for(const keyField in allFields){

            const fields = allFields[keyField];
            if(fields.validation && Object.keys(fields.validation).length){
                for(const key in fields.validation){
                    const result = validatePattern(key, fields.validation[key], fields.value);
                    if(result.error){
                        errorsInfo.error = true;
                        errorsInfo.errorMassage[keyField] = result.errorMessage;
                        break;
                    }
                }
            }
        }
    }
    return errorsInfo
}

export {
    validateHandle,
    validatePattern,
    validateSubmit
}