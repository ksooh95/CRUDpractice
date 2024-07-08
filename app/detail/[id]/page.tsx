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

    const [re, setRe] = useState<any>();
    const [reName, setReName] = useState<string | number>();
    const [reList, setReList] = useState<any>();

    //디테일 데이터 가져오는 fetch
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

    //삭제하기 버튼
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

    //댓글 작성 버튼
    const reBtn = async () => {
        try {
            const response = await fetch('/api/post/re', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postid: id, name: reName, text: re }),
            });
            if (response.ok) {
                console.log('댓글 작성 완료~!');
            } else {
                console.log('댓글 작성 실패');
            }
        } catch (error) {
            console.log('error :', error);
        }
    };

    //댓글 리스트 가져오기
    useEffect(() => {
        const reFetchData = async () => {
            try {
                const response = await fetch(`/api/post/relist?postid=${id}`, {
                    method: 'GET',
                });
                const data = await response.json();
                setReList(data);
            } catch (error) {
                console.log('err :', error);
            }
        };

        reFetchData();
    }, []);

    console.log('detail :', detail);
    console.log('댓글목록 :', reList);

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
                <div className="re_wrap">
                    <div className="re_write">
                        <input
                            type="text"
                            placeholder="닉네임"
                            className="rename_input"
                            onChange={(e) => {
                                setReName(e.currentTarget.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="내용"
                            className="retxt_input "
                            onChange={(e) => {
                                setRe(e.currentTarget.value);
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                reBtn();
                            }}
                        >
                            댓글작성
                        </button>
                    </div>
                    <ul className="re_list">
                        {reList?.map((e: any, i: number) => {
                            return (
                                <li key={i}>
                                    <span className="re1">{e?.name}</span>
                                    <span className="re1">{e?.text}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
