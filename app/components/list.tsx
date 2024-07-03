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

    console.log('list : ', list);

    return (
        <div className="bo_body">
            <Link href="/">
                <span className="bob_1">1</span>
                <span className="bob_2">제목</span>
                <span className="bob_3">작성자</span>
                <span className="bob_4">작성일</span>
            </Link>
        </div>
    );
};

export default list;
