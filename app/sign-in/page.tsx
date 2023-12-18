'use client';

import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

/**
 * サインプアップ画面
 *
 * @param void
 * @returns JSX.Element
 */
const SignIn = () => {
  // メールアドレス
  const [email, setEmail] = useState('');
  // パスワード
  const [password, setPassword] = useState('');

  // エラーメッセージ
  const [message, setMessage] = useState<string[]>();

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
      // バリデートチェックを通過したら、認証情報登録を行う
    }
  };

  return (
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

        <button type="button" onClick={handleLogin}>
          ログイン
        </button>
      </form>
    </main>
  );
};

export default SignIn;
