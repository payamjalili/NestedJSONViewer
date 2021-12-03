import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import NodeItem from '../node-item/node-item';
import getJSON from '../../services/get-json';
import './tree.css';

function Tree() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getJSON().then((response) => setItems(response));
  }, []);

  if (items === null)
    return (
      <div className='loading-container'>
        {' '}
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );

  if (items.length === 0) return <p className='text-empty'>JSON is empty</p>;

  return (
    <ul id='tree'>
      {items.map(function (item, index) {
        return <NodeItem item={item} />;
      })}
    </ul>
  );
}

export default Tree;
