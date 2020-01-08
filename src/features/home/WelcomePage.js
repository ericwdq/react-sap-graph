import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Icon, Button } from 'fundamental-react';

export default function WelcomePage(props) {
  const [list, setList] = useState([]);
  const fetchList = () => {
    fetch(`https://api.graph.sap/b1/Products`, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJkZW1vLmFwaS5ncmFwaC5zYXAiLCJzdWIiOiJkZW1vQGdyYXBoLnNhcCIsImF1ZCI6ImRlbW8uYXBpLmdyYXBoLnNhcCIsImlhdCI6MTU2MzgwMjEyMCwiZXhwIjo0Njg4MDA0NTIwLCJqdGkiOiI5OGMxM2E4MC0xNTQwLTQ3MDUtODg3MC0wYzM1NmQ2MjE0MDMifQ.JohYTPz1_CX0Q79ubkqyIC8NNOZF9cPSS0G89TUKQiDs0P407H6L0rlS6bijOkzek1h7JWno0jOBGoUQSAmSR0WX2abCwh26T3np2UxBkOx6ROkm_mpr-MtsGyOXM_9JPuZYv1nOnuuBYIOg-0zduO5ePuyWN29iEpmaCw1I6XxDp1_hzFAjS8GcKOmV8ilTrPTy_2UFc39qRLnur_bKtQb8-NleYHcv9uXChK3WEvEx7-NbCofKdkf_VVzuKpsDzzn2CvG2pKo3fFU_FLV56PA2D5kiprRz8FJyEUjslWPZCht0awQMRs7ml_e-srP3XykuXWMBBBV15yHNP8HdVA',
        Landscape: 'Development',
      },
      mode: 'cors',
      cache: 'default',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setList(data.value);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchList();
    // console.log(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onClick={evt => {
            evt.preventDefault();
            props.history.push(`/examples`);
          }}
        >
          Go to examples
        </Button>
        <br />
        <br />
        <Button
          option="emphasized"
          onClick={evt => {
            evt.preventDefault();
            props.history.push(`/dkom/sap-graph`);
          }}
        >
          Go to DKOM SAP Graph
        </Button>
        <br />
        <br />
        <h2 className="fd-action-bar__title">Renference:</h2>
        <a
          className="fd-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://sap.github.io/fundamental-styles/getting-started.html"
        >
          🔗 Fundamental Styles v0.3.0
        </a>
        <br />
        <br />
        <a
          className="fd-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://sap.github.io/fundamental-react/home"
        >
          🔗 Fundamental React v0.7.1
        </a>
        {list && list && list.length > 0 ? (
          <ul className="listview" list="list">
            {list.map(item => (
              <li key={item.ID}>{item.name}</li>
            ))}
          </ul>
        ) : (
          <div className="no-items-tip">No items yet.</div>
        )}
      </div>
    </div>
  );
}
