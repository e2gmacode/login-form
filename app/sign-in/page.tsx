'use client';

import { useState, MouseEvent, useEffect } from 'react';
import Link from 'next/link';
import { User, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { auth } from '../firebase/config';

/**
 * ログイン画面
 *
 * @param void
 * @returns JSX.Element
 */
const SignIn = () => {
  // メールアドレス
  const [email, setEmail] = useState('');
  // パスワード
  const [password, setPassword] = useState('');
  // ログインユーザー
  const [user, setUser] = useState<User | null>();

  // ルーター
  const router = useRouter();

  // エラーメッセージ
  const [message, setMessage] = useState<string[]>();
  const [loginMessage, setLoginMessage] = useState<string>('');

  // バリデート
  const validate = () => {
    const msg = [];
    let check = false;

    // メールアドレス
    // eslint-disable-next-line no-useless-escape
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === '') {
      msg.push('メールアドレスを入力してください');
      check = true;
    } else if (!regex.test(email)) {
      msg.push('メールアドレス形式で入力してください');
      check = true;
    } else {
      msg.push('');
    }

    // パスワード
    if (password === '') {
      msg.push('パスワードを入力してください');
      check = true;
    } else if (password.length < 6) {
      msg.push('6桁以上で入力してください');
      check = true;
    } else {
      msg.push('');
    }

    setMessage(msg);
    return check;
  };

  // ログインボタンクリック時
  const handleLogin = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // バリデート
    if (!validate()) {
      // バリデートチェックを通過したら、ログイン処理を行う
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (e) {
        setLoginMessage('メールアドレスまたはパスワードが違います');
      }
    }
  };

  // レンダリング時に実施
  useEffect(() => {
    // ログイン状態をチェック
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <>
      {user ? (
        router.push('/')
      ) : (
        <main className={styles.main}>
          <form className={styles.form}>
            <h3>ログイン画面</h3>

            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              value={email}
              placeholder="メールアドレス"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {message !== undefined && message[0] !== '' ? (
              <span className={styles.err_message}>{message[0]}</span>
            ) : (
              ''
            )}

            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              value={password}
              placeholder="パスワード"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {message !== undefined && message[1] !== '' ? (
              <span className={styles.err_message}>{message[1]}</span>
            ) : (
              ''
            )}

            <Link href="sign-up">※新規登録はこちら</Link>

            {/* ログインエラーメッセージ */}
            {loginMessage !== '' ? (
              <span className={styles.login_err_message}>{loginMessage}</span>
            ) : (
              ''
            )}

            <button type="button" onClick={handleLogin}>
              ログイン
            </button>
          </form>
        </main>
      )}
    </>
  );
};

export default SignIn;
