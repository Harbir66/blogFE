/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const BlogPostContext = createContext({});

export function BlogPostProvider({ children }) {
  const [allBlogsData, setAllBlogsData] = useState(null);
  return (
    <BlogPostContext.Provider value={{ allBlogsData, setAllBlogsData }}>
      {children}
    </BlogPostContext.Provider>
  );
}

BlogPostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
