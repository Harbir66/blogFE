import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Error, PageNotFound } from './pages';
import { ERROR_ROUTE, HOME_ROUTE } from './constants/routes';
import { BlogPostProvider } from './contexts/CardContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={HOME_ROUTE}
            element={
              <BlogPostProvider>
                <Home />
              </BlogPostProvider>
            }
          />
          <Route path={`${ERROR_ROUTE}/:errorCode?`} element={<Error />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
