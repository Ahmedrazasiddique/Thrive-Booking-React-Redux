import React, { Component } from 'react';
import LoaderStyle from './LoaderStyle'

class Loader extends Component {
    constructor(props) {
        super(props);
      //  this.isLoader = this.isLoader.bind(this);
        this.state = {
            isShowLoader: false
        }
    }

    componentDidMount() {
        
       
    }

    componentDidUpdate(previousProp) {

        //if (this.props.messageSucces) {
        if (previousProp != this.props) {
            this.setState({ isShowLoader: this.props.isShowLoader })
        }
    }


    render() {
        const { isShowLoader } = this.state
        return (
            <>
                {isShowLoader &&
                    <div>
                        {LoaderStyle}
                        <div id="pageloader-overlay" class="visible incoming">
                            <div class="loader-wrapper-outer">
                                <div class="loader-wrapper-inner">
                                    <div class="loader">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>

        );
    }
}
export default Loader;
