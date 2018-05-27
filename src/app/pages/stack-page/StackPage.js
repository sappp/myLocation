import React, { Component } from 'react';

import './StackPage.css';

class StackPage extends Component {
  render() {
    return (
      <div className="StackPage">
        <p>
          simple application built as home task for Welldone.
        </p>
        <p>
          <h3>Stack</h3>
          <div>
            <b>React</b> - main UI library. create-react-app as cli and use of "Presentational and Container components" hierarchy
          </div>
          <div>
            <b>Redux</b> - state managment. using redux-thunk middleware for async actions.
          </div>
          <div>
            <b>react-router</b> - for simple routing, and react-router-redux to add route state to store.
          </div>
          <div>
            <b>Picnic.css</b> - lightweigth css framework using for element styling. the layout of the app built with the new "css-grid" feature.
          </div>
        </p>
      </div>
    );
  }
}

export default StackPage;
