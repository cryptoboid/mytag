import React, { createContext } from 'react';
import ObjectDetector from '../models/ObjectDetector';

export const DetectorContext = createContext();

export function DetectorContextProvider(props) {
    const detector = new ObjectDetector();
    // console.log(detector);

    return (
        <DetectorContext.Provider value={detector}>
            {props.children}
        </DetectorContext.Provider>
    )
}