'use client';

import { useState } from 'react';

export default function Write() {
    const [title, setTitle] = useState<string | number>();
    const [txt, setTxt] = useState<string | number>();
    const [nickname, setNickName] = useState<string>('');
    const [password, setPassword] = useState<number>(0);

    return (
        <div className="write">
            <div className="container">
                <div className="session">
                    <input type="text" placeholder="닉네임" />
                    <input type="password" placeholder="비밀번호" />
                </div>
                <div className="write_body">
                    <input type="text" placeholder="제목" />
                    <textarea name="" id="" placeholder="내용"></textarea>
                </div>
                <div className="btn_wrap">
                    <button>작성</button>
                </div>
            </div>
        </div>
    );
}
