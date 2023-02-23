import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const CardContext = createContext({});

export function CardProvider({ children }) {
  const [allCards, setAllCards] = useState(null);
  return (
    <CardContext.Provider value={{ allCards, setAllCards }}>
      {children}
    </CardContext.Provider>
  );
}

CardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
