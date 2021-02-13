import React, { Component } from 'react';

import Header from '../common/Header';
import Footer from '../common/Footer';
// import "../src/css/style.css";
// import "../src/views/home/home.css";

import { ToastContainer, toast } from 'react-toastify';
export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Header/>
        <main>
          <div className="container main">
            test
            </div>
        </main>
        <Footer />
      </div>
    )
  }
}

interface Props {}
interface State {}