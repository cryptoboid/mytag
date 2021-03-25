import React, { createContext, useRef } from 'react'

import TagsCollection from '../models/TagsCollection'

export const TagsContext = createContext()

export function TagsContextProvider (props) {
  const tags = useRef(new TagsCollection())

  return (
    <TagsContext.Provider value={tags.current}>
      {props.children}
    </TagsContext.Provider>
  )
}
