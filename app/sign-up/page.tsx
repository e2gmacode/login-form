'use client';

/* eslint-disable object-curly-newline */
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { createUserWithEmailAndPassword, AuthError, signOut } from 'firebase/auth';
import { auth, db } from '@/app/firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

/**
 * サインプアップ画面
 *
 * @param void
 * @returns JSX.Element
 */
const SignUp = () => {
  // ユーザー名
  const [userName, setUserName] = useState('');
  // メールアドレス
  const [email, setEmail] = useState('');
  // パスワード
  const [password, setPassword] = useState('');
  // パスワード（再入力）
  const [rePassword, setRePassword] = useState('');
  // プロフィールアイコン
  const [icon, setIcon] = useState(1);
  // 生年月日
  const [birthday, setBirthday] = useState('');
  // 性別
  const [sex, setSex] = useState('m');
  // 利用規約の同意
  const [agree, setAgree] = useState<boolean>(false);

  // ルーター
  const router = useRouter();

  // エラーメッセージ
  const [message, setMessage] = useState<string[]>();

  // バリデート
  const validate = () => {
    const msg = [];
    let check = false;
    // ユーザー名
    if (userName === '') {
      msg.push('ユーザー名を入力してください');
      check = true;
    } else {
      msg.push('');
    }

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

    // パスワード（再入力）
    if (password !== rePassword) {
      msg.push('パスワードが一致しません');
      check = true;
    } else {
      msg.push('');
    }

    // 生年月日
    const regex2 = /^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
    if (birthday === '') {
      msg.push('生年月日を入力してください');
      check = true;
    } else if (!regex2.test(birthday)) {
      msg.push('yyyy/MM/ddの形式で入力してください');
      check = true;
    } else {
      msg.push('');
    }

    // 利用規約の同意
    if (!agree) {
      msg.push('利用規約の同意が必要です');
      check = true;
    } else {
      msg.push('');
    }

    setMessage(msg);
    return check;
  };

  // プロフィールアイコン変更時
  const handleChangeIcon = (iconNum: number) => {
    setIcon(iconNum);
  };

  // 性別変更時
  const handleChangeSex = (event: ChangeEvent<HTMLInputElement>) => {
    setSex(event.target.value);
  };

  // 登録ボタンクリック時
  const handleRegister = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // バリデート
    if (!validate()) {
      // バリデートチェックを通過したら、認証情報登録を行う
      await createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
          const userDocumentRef = doc(db, 'users', credential.user.uid);
          setDoc(userDocumentRef, {
            name: userName,
            icon,
            birthday,
            sex,
          }).then(() => {
            // 登録が終わったら、サインアウトする
            signOut(auth);
            // ログイン画面へ
            router.push('/sign-in');
          });
        })
        .catch((e: Error) => {
          const authError = e as AuthError;
          // const errorCode = authError.code;
          const errorMessage = authError.message;

          if (errorMessage === 'auth/weak-password') {
            alert('このパスワードでは、弱すぎます。');
          } else if (errorMessage === 'auth/email-already-in-use') {
            alert('すでに登録されているメールアドレスです');
          } else {
            alert(errorMessage);
          }
        });
    }
  };

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h3>サインアップ画面</h3>
        <label htmlFor="email">ユーザー名</label>
        <input
          type="username"
          value={userName}
          placeholder="氏名"
          id="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        {message !== undefined && message[0] !== '' ? (
          <span className={styles.err_message}>{message[0]}</span>
        ) : (
          ''
        )}

        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          value={email}
          placeholder="メールアドレス"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {message !== undefined && message[1] !== '' ? (
          <span className={styles.err_message}>{message[1]}</span>
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
        {message !== undefined && message[2] !== '' ? (
          <span className={styles.err_message}>{message[2]}</span>
        ) : (
          ''
        )}

        <label htmlFor="rePassword">パスワード（再入力）</label>
        <input
          type="password"
          value={rePassword}
          placeholder="パスワード"
          id="rePassword"
          onChange={(e) => setRePassword(e.target.value)}
        />
        {message !== undefined && message[3] !== '' ? (
          <span className={styles.err_message}>{message[3]}</span>
        ) : (
          ''
        )}

        <label htmlFor="icon">プロフィールアイコン</label>
        <div className={styles.icons}>
          <div className={icon === 1 ? styles.icon_active : styles.icon}>
            <Image
              width={48}
              height={44}
              src="/icon_business_man01.png"
              alt="男1"
              onClick={() => handleChangeIcon(1)}
            />
          </div>
          <div className={icon === 2 ? styles.icon_active : styles.icon}>
            <Image
              width={48}
              height={44}
              src="/icon_business_man07.png"
              alt="男2"
              onClick={() => handleChangeIcon(2)}
            />
          </div>
          <div className={icon === 3 ? styles.icon_active : styles.icon}>
            <Image
              width={48}
              height={44}
              src="/icon_business_woman01.png"
              alt="女1"
              onClick={() => handleChangeIcon(3)}
            />
          </div>
          <div className={icon === 4 ? styles.icon_active : styles.icon}>
            <Image
              width={48}
              height={44}
              src="/icon_business_woman02.png"
              alt="女2"
              onClick={() => handleChangeIcon(4)}
            />
          </div>
        </div>

        <label htmlFor="birthday">生年月日</label>
        <input
          type="text"
          name="birthday"
          value={birthday}
          placeholder="1900/01/01"
          onChange={(e) => setBirthday(e.target.value)}
        />
        {message !== undefined && message[4] !== '' ? (
          <span className={styles.err_message}>{message[4]}</span>
        ) : (
          ''
        )}

        <label htmlFor="sex">性別</label>
        <span>
          <input
            type="radio"
            name="man"
            id="man"
            value="m"
            checked={sex === 'm'}
            onChange={handleChangeSex}
          />
          <label className={styles.sex_label} htmlFor="man">
            男性
          </label>
          <input
            type="radio"
            name="woman"
            id="woman"
            value="w"
            checked={sex === 'w'}
            onChange={handleChangeSex}
          />
          <label className={styles.sex_label} htmlFor="woman">
            女性
          </label>
        </span>

        <label>利用規約の同意</label>
        <span>
          <input
            type="checkbox"
            name="agree"
            id="agree"
            checked={agree}
            onClick={() => setAgree(!agree)}
          />
          <label className={styles.agree_label} htmlFor="agree">
            同意する
          </label>
          <Link
            href="https://menherasenpai.notion.site/457df49475494671807673a0a3346451"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.kiyaku}
          >
            ※利用規約はこちら
          </Link>
        </span>
        {message !== undefined && message[5] !== '' ? (
          <span className={styles.err_message}>{message[5]}</span>
        ) : (
          ''
        )}

        <button type="button" onClick={handleRegister}>
          登録
        </button>
      </form>
    </main>
  );
};

export default SignUp;
