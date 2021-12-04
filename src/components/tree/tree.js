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

  const removeNode = (id) => {
    const result = window.confirm('Do you really want to Remove this node?');
    if (result === true) setItems(recursiveRemoveNodeById(items, id));
  };

  const recursiveRemoveNodeById = (list, id) => {
    return list
      .map((item) => {
        return { ...item };
      })
      .filter((item) => {
        if ('children' in item) {
          item.children = recursiveRemoveNodeById(item.children, id);
        }
        return item.id !== id;
      });
  };

  const addNode = (parentId) => {
    var nodeTitle = window.prompt("Please enter node's title");
    if (nodeTitle !== null && nodeTitle !== '') {
      const newNodeId = getBiggestId(items, parentId);
      let newArray = [...items];

      newArray.forEach(function iter(a) {
        if (a.id === parentId) {
          if (!a.children) a.children = [];
          a.children.push({ name: nodeTitle, id: newNodeId + 1, children: [] });
        }
        Array.isArray(a.children) && a.children.forEach(iter);
      });

      setItems(newArray);
    }
  };

  const getBiggestId = (list) => {
    return items
      .flatMap((elem) => elem.children)
      .reduce((r, elem) => (r = r > elem.id ? r : elem.id), 0);
  };

  if (items === null)
    return (
      <div className='loading-container'>
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );

  if (items.length === 0) return <p className='text-empty'>JSON is empty</p>;

  return (
    <ul id='tree'>
      {items.map(function (item, index) {
        return (
          <NodeItem
            item={item}
            removeNode={removeNode}
            addNode={addNode}
            key={item.id}
          />
        );
      })}
    </ul>
  );
}

export default Tree;
