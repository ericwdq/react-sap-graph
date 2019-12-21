import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Icon, Button } from 'fundamental-react';

export default function WelcomePage(props) {
  return (
    <div className="home-welcome-page">
      <header className="app-header">
        <img src={require('../../images/sap-logo.svg')} className="sap-logo" alt="logo" />
        <h1 className="app-title">
          Welcome to React and SAP Graph App {'  '}
          <a href="https://www.graph.sap" rel="noopener noreferrer" target="_blank">
            graph.sap
          </a>
        </h1>
      </header>
      <div className="app-intro">
        <h3>To get started:</h3>
        <ul>
          <li>
            Edit component <code>src/features/home/WelcomePage.js</code> for this page.
          </li>
          <li>
            Edit component <code>src/features/home/App.js</code> for the root container layout.
          </li>
          <li>
            To see examples, access:&nbsp;
            <Link to="/examples">/examples</Link>
          </li>
        </ul>
        <br />
        <Alert style={{ margin: '10px', display: 'none' }} dismissible type="error">
          <Icon glyph="message-error" />
          Testing fundamental styles &nbsp;&nbsp;
          <a className="fd-link" href="/#learn">
            Learn More
          </a>
        </Alert>
        <Button
          option="emphasized"
          onClick={() => {
            props.history.push(`/examples`);
          }}
        >
          Go to examples
        </Button>
        <br />
        <br />
        <a
          className="fd-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://sap.github.io/fundamental-styles/getting-started.html"
        >
          Fundamental Styles v0.3.0
        </a>
        <br />
        <br />
        <a
          className="fd-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://sap.github.io/fundamental-react/home"
        >
          Fundamental React v0.7.1
        </a>
      </div>
    </div>
  );
}
