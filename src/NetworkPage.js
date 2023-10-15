import React, { useState, useEffect, useRef } from 'react';
import {
  Form,
  useActionData,
  useOutletContext
} from 'react-router-dom'

export function NetworkPage(){
    const [currentPage, setCurrentPage] = useOutletContext();
  
    useEffect(() => {
      if (currentPage !== 'Network') {
        setCurrentPage('Network')
      }
    }
    );

    return null;
}