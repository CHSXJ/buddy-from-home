import React, { Component } from 'react';
import Header from './components/Header';
import PickingArea from './components/PickingArea';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAtJg4QwXdm2MKRxt9tb9ATlrm6ISd8Id8",
  authDomain: "secret-buddy-d7ca0.firebaseapp.com",
  databaseURL: "https://secret-buddy-d7ca0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "secret-buddy-d7ca0",
  storageBucket: "secret-buddy-d7ca0.appspot.com",
  messagingSenderId: "715396894708",
  appId: "1:715396894708:web:b146e4db979af68561f3a1",
  measurementId: "G-XNNNZ51DPF"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

class App extends Component {

  render() {
    return (
      <div>
        <div id="navbarMenu" class="navbar-menu">
          <div className="container">
            <Header title="" />
          </div>
          <div class="navbar-end">
              <span class="navbar-item">
                  <a class="button is-outlined" href="https://github.com/CHSXJ/buddy-from-home">
                      <span class="icon">
                        <i class="fab fa-github"></i>
                      </span>
                      <span>Source on Github</span>
                  </a>
              </span>
          </div>
        </div>

        <PickingArea app={firebaseApp} />      

      </div>
    );
  }
}
export default App;
