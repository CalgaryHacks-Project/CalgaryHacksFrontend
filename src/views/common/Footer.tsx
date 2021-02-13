import React, { Component } from 'react'
import './Footer.css'
import '../../css/style.css'

export default class Footer extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="container h-100">
                    <div className="row align-items-center justify-content-center h-100">
                        <div className="col-auto ">
                            <span className="footer-text">
                                &copy; Copyright
                    </span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

interface Props { }
interface State { }