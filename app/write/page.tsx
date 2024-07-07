'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Write() {
    const [title, setTitle] = useState<string | number>();
    const [txt, setTxt] = useState<string | number>();
    const [nickname, setNickName] = useState<string>('');
    const [password, setPassword] = useState<string | number>(0);
    const date: string = new Date().toISOString();
    // console.log(date);
    const router = useRouter();

    const writeBtn = async () => {
        try {
            const response = await fetch('/api/post/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, txt, nickname, password, date }),
            });
            if (response.ok) {
                console.log('전송완료요~');
                router.push('/');
            } else {
                console.log('오류여');
            }
        } catch (error) {
            console.log('catch에서 잡힌 에러 :', error);
        }
    };

    return (
        <div className="write">
            <div className="container">
                <div className="session">
                    <input
                        type="text"
                        placeholder="닉네임"
                        onChange={(e) => {
                            setNickName(e.currentTarget.value);
                        }}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        onChange={(e) => {
                            setPassword(e.currentTarget.value);
                        }}
                    />
                </div>
                <div className="write_body">
                    <input
                        type="text"
                        placeholder="제목"
                        onChange={(e) => {
                            setTitle(e.currentTarget.value);
                        }}
                    />
                    <textarea
                        name=""
                        id=""
                        placeholder="내용"
                        onChange={(e) => {
                            setTxt(e.currentTarget.value);
                        }}
                    ></textarea>
                </div>
                <div className="btn_wrap">
                    <button onClick={writeBtn}>작성</button>
                </div>
            </div>
        </div>
    );
}
