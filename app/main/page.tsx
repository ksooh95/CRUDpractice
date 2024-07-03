import React from 'react';
import List from '@/app/components/list';
import Link from 'next/link';

export default function Main() {
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
                    <List />
                    <div className="btn_wrap">
                        <Link href="/write">글작성</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
