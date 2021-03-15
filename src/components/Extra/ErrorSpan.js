import React from "react"
import "../../assets/scss/style.scss"

class ErrorSpan extends React.Component {
    render() {
        return (
            <span className="RequiredMark">*</span>
        )
    }
}

export default ErrorSpan;