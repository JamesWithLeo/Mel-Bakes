import React from 'react';
import './ProductNavigations.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


function ProductNavigations() {
  return (
    <div id='container'>
      <div id='filterWrapper'>
        <FontAwesomeIcon icon={faFilter} fontSize={20} className='icon'/>
        <button id='filterButton'>Filter</button>
      </div>
    </div>
  );
}
export default ProductNavigations;