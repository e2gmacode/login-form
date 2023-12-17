'use client';

/* eslint-disable object-curly-newline */
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import styles from './page.module.css';

/**
 * サインプアップ画面
 *
 * @param void
 * @returns JSX.Element
 */
const SignUp = () => {
  // ユーザー名
  const [username, setUserNmae] = useState('');
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

    await createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential.user.uid);
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <h3>サインアップ画面</h3>
        <label htmlFor="email">ユーザー名</label>
        <input
          type="username"
          placeholder="氏名"
          id="username"
          onChange={(e) => setUserNmae(e.target.value)}
        />

        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          placeholder="メールアドレス"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="rePassword">パスワード（再入力）</label>
        <input
          type="password"
          placeholder="パスワード"
          id="rePassword"
          onChange={(e) => setRePassword(e.target.value)}
        />

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
          placeholder="1900/01/01"
          onChange={(e) => setBirthday(e.target.value)}
        />
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

        <button type="button" onClick={handleRegister}>
          登録
        </button>
      </div>
    </main>
  );
};

export default SignUp;
