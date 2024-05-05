import React from 'react';


const searchbar = ({ onChange }) => {
    return (
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onChange(e.target.value)}
      />
    );
  };
  
  export default searchbar;