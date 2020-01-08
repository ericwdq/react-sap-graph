import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useFetchList } from './redux/hooks';

export default function Graph() {
  const { list, fetchList, fetchPending, fetchListError } = useFetchList();

  useEffect(() => {
    // fetchList();
    // console.log(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dkom-graph">
      Component content: DKOM SAP Graph
      <button className="btn-fetch-reddit" disabled={fetchPending} onClick={fetchList}>
        {fetchPending ? 'Fetching...' : 'Fetch api list'}
      </button>
      {fetchListError && (
        <div className="fetch-list-error">Failed to load: {fetchListError.toString()}</div>
      )}
      {list && list.value && list.value.length > 0 ? (
        <ul list="dkom-list">
          {list.map(item => (
            <li key={''}>{''}</li>
          ))}
        </ul>
      ) : (
        <div className="no-items-tip">No items yet.</div>
      )}
    </div>
  );
}

Graph.propTypes = {};
Graph.defaultProps = {};
