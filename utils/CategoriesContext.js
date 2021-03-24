import React, { createContext, useRef } from 'react'

import CategoriesGrouper from '../models/CategoriesGrouper'

export const CategoriesContext = createContext()

export function CategoriesContextProvider (props) {
  const categories = useRef(new CategoriesGrouper())

  return (
    <CategoriesContext.Provider value={categories.current}>
      {props.children}
    </CategoriesContext.Provider>
  )
}
