'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Detail() {
    const [detail, setDetail] = useState<any>();
    const params = useParams();
    const id: any = params?.id;
    const router = useRouter();

    useEffect(() => {
        const detailFetchData = async () => {
            try {
                const response = await fetch(`/api/post/detail?id=${id}`, {
                    method: 'GET',
                });
                const data = await response.json();
                setDetail(data);
            } catch (error) {
                console.log('err :', error);
            }
        };

        detailFetchData();
    }, []);

    const deleteBtn = async () => {
        try {
            const response = await fetch(`/api/post/delete?id=${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                console.log('삭제완료요~');
                router.push('/');
            } else {
                console.log('수정 실패 !');
            }
        } catch (error) {
            console.log('catch에서 잡힌 에러 :', error);
        }
    };

    console.log('detail :', detail);

    return (
        <div className="detail">
            <div className="container">
                <div className="detail_content">
                    <div className="d_title">제목 :{detail?.title}</div>
                    <div className="d_date">작성일 : {detail?.date.split('T')[0]}</div>
                    <div className="d_name">작성자 : {detail?.nickname}</div>
                    <div className="d_txt">내용 : {detail?.txt}</div>
                </div>
                <div className="btn_wrap">
                    <Link href="/">목록</Link>
                    <Link href={`/edit/${detail?._id}`}>수정</Link>
                    <button
                        type="button"
                        className="del_btn"
                        onClick={() => {
                            deleteBtn();
                        }}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
}
