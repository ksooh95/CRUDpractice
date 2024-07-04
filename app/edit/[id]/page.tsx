'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Write() {
    const [title, setTitle] = useState<string | number>();
    const [txt, setTxt] = useState<string | number>();
    const [nickname, setNickName] = useState<string>();
    const date: string = new Date().toISOString();
    const params = useParams();
    const id: any = params?.id;
    const [detail, setDetail] = useState();
    const router = useRouter();

    // 내가 고칠꺼 불러오기
    useEffect(() => {
        const editDetailFetchData = async () => {
            try {
                const response = await fetch(`/api/post/detail?id=${id}`, {
                    method: 'GET',
                });
                const data = await response.json();
                setDetail(data);
            } catch (error) {
                console.log('catch에서 잡힌 에러 :', error);
            }
        };
        editDetailFetchData();
    }, []);

    console.log(detail);

    //수정하기
    const editBtn = async () => {
        try {
            const response = await fetch(`/api/post/edit?id=${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, txt, nickname, date }),
            });
            if (response.ok) {
                console.log('수정완료요~');
                router.push('/');
            } else {
                console.log('수정 실패 !');
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
                        defaultValue={detail?.nickname}
                    />
                </div>
                <div className="write_body">
                    <input
                        type="text"
                        placeholder="제목"
                        onChange={(e) => {
                            setTitle(e.currentTarget.value);
                        }}
                        defaultValue={detail?.title}
                    />
                    <textarea
                        name=""
                        id=""
                        placeholder="내용"
                        onChange={(e) => {
                            setTxt(e.currentTarget.value);
                        }}
                        defaultValue={detail?.txt}
                    ></textarea>
                </div>
                <div className="btn_wrap">
                    <button onClick={editBtn}>수정</button>
                </div>
            </div>
        </div>
    );
}
