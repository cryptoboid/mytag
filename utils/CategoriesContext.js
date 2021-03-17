import React, { createContext } from 'react';
import CategoriesGrouper from '../models/CategoriesGrouper';

export const CategoriesContext = createContext();

export function CategoriesContextProvider(props) {
    const categories = new CategoriesGrouper();

    return (
        <CategoriesContext.Provider value={categories}>
            {props.children}
        </CategoriesContext.Provider>
    )
}