import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, NotFound, Favorites } from '../pages';
import Compare from '../pages/Compare/Compare';

const AppRouter = () => {
return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);
};

export default AppRouter;