import React, {Component} from "react";

import './RegisterStepsWrapper.scss';
import Steps from "../Steps/Steps";

class RegisterStepsWrapper extends Component{
    render() {
        return(
            <div className="main-wrapper">
                <Steps />
            </div>
        );
    }
}

export default RegisterStepsWrapper;