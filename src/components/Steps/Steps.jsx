import React, {Component} from "react";
import StepThree from "./StepThree/StepThree";

import './Steps.scss';

class Steps extends Component{
    state = {
        activeStep: 3
    }

    render() {
        const {activeStep} = this.state;

        return(
            <div className="form-container">
                <span className="header-block">
                    <h2>Your first project</h2>
                    <span className="steps-indicator">
                        <span className="step-round">1</span>
                        <span className="in-line"/>
                        <span className="step-round">2</span>
                        <span className="in-line"/>
                        <span className={`step-round ${activeStep === 3 ? 'active-step' : ''}`}>3</span>
                    </span>
                </span>

                <span className="form-block">
                    <form action="">
                        <StepThree />
                    </form>
                </span>
            </div>
        );
    }
}


export default Steps;