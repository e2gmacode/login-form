import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const signUp = () => (
  <main className={styles.main}>
    <div className={styles.form}>
      <h3>サインアップ画面</h3>
      <label htmlFor="email">ユーザー名</label>
      <input type="username" placeholder="氏名" id="username" />

      <label htmlFor="email">メールアドレス</label>
      <input type="email" placeholder="メールアドレス" id="email" />

      <label htmlFor="password">パスワード</label>
      <input type="password" placeholder="パスワード" id="password" />
      <label htmlFor="rePassword">パスワード（再入力）</label>
      <input type="password" placeholder="パスワード" id="rePassword" />

      <label htmlFor="icon">プロフィールアイコン</label>
      <div className={styles.icons}>
        <div className={styles.icon_active}>
          <Image width={48} height={44} src="/icon_business_man01.png" alt="男1" />
        </div>
        <div className={styles.icon}>
          <Image width={48} height={44} src="/icon_business_man07.png" alt="男2" />
        </div>
        <div className={styles.icon}>
          <Image width={48} height={44} src="/icon_business_woman01.png" alt="女1" />
        </div>
        <div className={styles.icon}>
          <Image width={48} height={44} src="/icon_business_woman02.png" alt="女2" />
        </div>
      </div>

      <label htmlFor="birthday">生年月日</label>
      <input type="text" name="birthday" placeholder="1900/01/01" />
      <label htmlFor="sex">性別</label>
      <span>
        <input type="radio" name="man" id="man" value="m" />
        <label className={styles.sex_label} htmlFor="man">
          男性
        </label>
        <input type="radio" name="woman" id="woman" value="w" />
        <label className={styles.sex_label} htmlFor="woman">
          女性
        </label>
      </span>

      <label>利用規約の同意</label>
      <span>
        <input type="checkbox" name="agree" id="agree" defaultChecked={false} />
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

      <button type="button">登録</button>
    </div>
  </main>
);

export default signUp;
