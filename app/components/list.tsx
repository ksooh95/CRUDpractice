'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const list = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const listFetchData = async () => {
            try {
                const response = await fetch('/api/post/list', {
                    method: 'GET',
                });
                const data = await response.json();
                setList(data);
            } catch (err) {
                console.error('에러:', err);
            }
        };

        listFetchData();
    }, []);
    return (
       
    );
};

export default list;
