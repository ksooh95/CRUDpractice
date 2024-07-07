'use client';

// import List from '@/app/components/list';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Main() {
    const [list, setList] = useState<any[]>([]);
    const [searchTitle, setSearchTitle] = useState<string>('');
    
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

    const searchBtn = async () => {
        try {
            const response = await fetch(`/api/post/search?title=${searchTitle}`, {
                method: 'GET',
            });
            const data = await response.json();
            setList(data);
            console.log(data);
        } catch (error) {
            console.log('error :', error);
        }
    };

    console.log(list);
    return (
        <div className="main">
            <div className="container">
                <div className="search">
                    <input
                        type="text"
                        onChange={(e) => {
                            setSearchTitle(e.currentTarget.value);
                        }}
                        placeholder="검색어를 입력해주세요"
                        value={searchTitle}
                    />
                    <button
                        onClick={() => {
                            searchBtn();
                            console.log('asd');
                        }}
                    >
                        검색
                    </button>
                </div>
                <div className="board">
                    <div className="bo_head">
                        <span className="boh_1">번호</span>
                        <span className="boh_2">제목</span>
                        <span className="boh_3">작성자</span>
                        <span className="boh_4">작성일</span>
                    </div>
                    {list?.map((e: any, i: number) => {
                        return (
                            <div className="bo_body" key={i}>
                                <Link href={`/detail/${e._id}`}>
                                    <span className="bob_1">{i}</span>
                                    <span className="bob_2">{e.title}</span>
                                    <span className="bob_3">{e.nickname}</span>
                                    <span className="bob_4">{e?.date?.split('T')[0]}</span>
                                </Link>
                            </div>
                        );
                    })}
                    {}
                    <div className="btn_wrap">
                        <Link href="/write">글작성</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
