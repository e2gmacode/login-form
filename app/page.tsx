'use client';

import Image from 'next/image';
import { useEffect, useState, MouseEvent } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { auth, db } from './firebase/config';

export default function Home() {
  // ローディング
  const [isLoading, setIsLoading] = useState(true);

  // ユーザー名
  const [userName, setUserName] = useState('');
  // メールアドレス
  const [email, setEmail] = useState('');
  // プロフィールアイコン
  const [icon, setIcon] = useState(1);
  // 生年月日
  const [birthday, setBirthday] = useState('');
  // 性別
  const [sex, setSex] = useState('m');

  // ルーター
  const router = useRouter();

  // ログアウト処理
  const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await signOut(auth).then(() => {
      // ログアウト後、ログイン画面へ
      router.push('/sign-in');
    });
  };

  // 初回レンダリング時
  useEffect(() => {
    // ログイン状態をチェック
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        // ユーザー情報を取得
        const userDocumentRef = doc(db, 'users', currentUser.uid);
        getDoc(userDocumentRef).then((documentSnapshot) => {
          if (documentSnapshot !== undefined) {
            setEmail(currentUser.email!);
            setIcon(documentSnapshot.data()!.icon);
            setUserName(documentSnapshot.data()!.name);
            setBirthday(documentSnapshot.data()!.birthday);
            setSex(documentSnapshot.data()!.sex);
          }
          setIsLoading(false);
        });
      } else {
        // 未認証の場合、ログイン画面へ
        router.push('/sign-in');
      }
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <main className={styles.main}></main>
      ) : (
        <main className={styles.main}>
          <div className={styles.base}>
            <h3>ようこそ</h3>

            <span className={styles.user}>
              <div className={styles.icon}>
                {icon === 1 && (
                  <img width={48} height={44} src="/icon_business_man01.png" alt="男1" />
                )}
                {icon === 2 && (
                  <img width={48} height={44} src="/icon_business_man07.png" alt="男2" />
                )}
                {icon === 3 && (
                  <img width={48} height={44} src="/icon_business_woman01.png" alt="女1" />
                )}
                {icon === 4 && (
                  <img width={48} height={44} src="/icon_business_woman02.png" alt="女2" />
                )}
              </div>
              <div className={styles.name}>{userName} さん</div>
            </span>

            <label>メールアドレス</label>
            <div className={styles.confirm}>{email}</div>

            <label>生年月日</label>
            <div className={styles.confirm}>{birthday}</div>

            <label>性別</label>
            <div className={styles.confirm}>{sex === 'm' ? '男性' : '女性'}</div>

            <button type="button" onClick={handleLogout}>
              ログアウト
            </button>
          </div>
        </main>
      )}
    </>
  );
}
