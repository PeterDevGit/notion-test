import React, {Component} from "react";

import './Sunmit.scss';

class Submit extends Component{
    static defaultProps = {
        handleSubmit: () => {},
        type: '',
        label:'',
    }

    render() {
        const {type, label, handleSubmit} = this.props;

        return(
            <button
                type={type}
                onClick={handleSubmit}
            >{label}</button>
        );
    }
}

export default Submit;