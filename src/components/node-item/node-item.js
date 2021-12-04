import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolder,
  faFolderOpen,
  faFile,
  faTimes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Tooltip from './../tooltip/tooltip';
import './node-item.css';

function NodeItem(props) {
  const [isShow, setShow] = useState(false);

  const item = props.item;
  const removeNode = props.removeNode;
  const addNode = props.addNode;
  let children;
  let hasChild;
  let cssClass = 'node-item hide';

  if (item.children && item.children.length > 0) {
    hasChild = true;
    cssClass += ' has-child';
    children = (
      <ul className='node-children'>
        {item.children.map(function (item, index) {
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

  const handleToggle = () => {
    setShow(!isShow);
  };

  return (
    <li className={`${cssClass} ${isShow === true ? 'show-children' : ''}`}>
      <div className='node-content'>
        <div className='node-actions'>
          <div className='action-item' onClick={() => addNode(item.id)}>
            <Tooltip tooltipText='Add child'>
              <FontAwesomeIcon icon={faPlus} className='icon-plus' />
            </Tooltip>
          </div>
          <div className='action-item' onClick={() => removeNode(item.id)}>
            <Tooltip tooltipText='Remove node'>
              <FontAwesomeIcon icon={faTimes} className='icon-remove' />
            </Tooltip>
          </div>
        </div>
        <div className='node-name' onClick={handleToggle}>
          <div className='node-icon'>
            {hasChild ? (
              isShow ? (
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  className='icon-folder-open'
                />
              ) : (
                <FontAwesomeIcon icon={faFolder} className='icon-folder' />
              )
            ) : (
              <FontAwesomeIcon icon={faFile} className='icon-file' />
            )}
          </div>
          <div className='node-text'>{item.name}</div>
        </div>
      </div>
      {children}
    </li>
  );
}

export default NodeItem;
