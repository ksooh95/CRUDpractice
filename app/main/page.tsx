'use client';

// import List from '@/app/components/list';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Main() {
    const [list, setList] = useState<any>([]);

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

    console.log('list :', list);
    return (
        <div className="main">
            <div className="container">
                <div className="board">
                    <div className="bo_head">
                        <span className="boh_1">번호</span>
                        <span className="boh_2">제목</span>
                        <span className="boh_3">작성자</span>
                        <span className="boh_4">작성일</span>
                    </div>
                    {list?.map((e: any, i: number) => {
                        <div className="bo_body" key={i}>
                            <Link href="/">
                                <span className="bob_1">{e.title}</span>
                                <span className="bob_2">제목</span>
                                <span className="bob_3">작성자</span>
                                <span className="bob_4">작성일</span>
                            </Link>
                        </div>;
                    })}
                    <div className="btn_wrap">
                        <Link href="/write">글작성</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
