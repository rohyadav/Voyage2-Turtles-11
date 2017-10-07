import React, {Component} from 'react';
import '../styles/App.css';
import Googlesearch from '../components/Googlesearch';

class App extends Component {
  render() {
    return (
        <div className="App">

          <div className="main">

            <div className="main-top">

              <div className="time">
                11:45 PM
              </div>

              <div className="search-area">
                <div className="search-type">
                  <div className="type-item">Web</div>
                  <div className="type-item">Images</div>
                  <div className="type-item">News</div>
                  <div className="type-item">Videos</div>
                  <div className="type-item">Maps</div>
                </div>
                <Googlesearch />
                {/* <div className="search-box">
                  <div className="box-item">Google</div>
                </div> */}
              </div>

            </div>

          </div>

        </div>        
    );
  }
}

export default App;
