import React from 'react';
import Uncheck from './Unchecked'; // Assuming Uncheck is the component to display each card

function SearchResults({ results, onClose }) {
  return (
    <div className="search-results">
      <button className="close-btn" onClick={onClose}>Close</button>
      <div className="tiles-container">
        {results.map((result) => (
          <Uncheck
            key={result.id}
            {...result}
            // Add other necessary props like toggleView, onUnsave, updateItem, onDelete if needed
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
