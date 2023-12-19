import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUp from '../sign-up/page';

// useRouterのモック化
const mockedUseRouter = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouter(),
  usePathname: jest.fn().mockReturnValue('/sign-in'),
}));

describe('サインアップ画面のテスト', () => {
  it('表示項目確認（サインアップ画面）', async () => {
    render(<SignUp />);
    expect(screen.getByText('サインアップ画面')).toBeInTheDocument();
  });
  it('表示項目確認（ユーザー名）', async () => {
    render(<SignUp />);
    expect(screen.getByText('ユーザー名')).toBeInTheDocument();
  });
  it('表示項目確認（メールアドレス）', async () => {
    render(<SignUp />);
    expect(screen.getByText('メールアドレス')).toBeInTheDocument();
  });
  it('表示項目確認（パスワード）', async () => {
    render(<SignUp />);
    expect(screen.getByText('パスワード')).toBeInTheDocument();
  });
  it('表示項目確認（パスワード（再入力））', async () => {
    render(<SignUp />);
    expect(screen.getByText('パスワード（再入力）')).toBeInTheDocument();
  });
  it('表示項目確認（プロフィールアイコン）', async () => {
    render(<SignUp />);
    expect(screen.getByText('プロフィールアイコン')).toBeInTheDocument();
  });
  it('表示項目確認（生年月日）', async () => {
    render(<SignUp />);
    expect(screen.getByText('生年月日')).toBeInTheDocument();
  });
  it('表示項目確認（性別）', async () => {
    render(<SignUp />);
    expect(screen.getByText('性別')).toBeInTheDocument();
  });
  it('表示項目確認（利用規約の同意）', async () => {
    render(<SignUp />);
    expect(screen.getByText('利用規約の同意')).toBeInTheDocument();
  });
  it('表示項目確認（登録）', async () => {
    render(<SignUp />);
    expect(screen.getByText('登録')).toBeInTheDocument();
  });
});

describe('バリデートチェックのテスト', () => {
  it('バリデート必須チェック（ユーザー名）', async () => {
    render(<SignUp />);
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.click(registerButton);

    expect(screen.getByText('ユーザー名を入力してください')).toBeInTheDocument();
  });
  it('バリデート必須チェック（メールアドレス）', async () => {
    render(<SignUp />);
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.click(registerButton);

    expect(screen.getByText('メールアドレスを入力してください')).toBeInTheDocument();
  });
  it('バリデート必須チェック（パスワード）', async () => {
    render(<SignUp />);
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.click(registerButton);

    expect(screen.getByText('パスワードを入力してください')).toBeInTheDocument();
  });
  it('バリデート必須チェック（生年月日）', async () => {
    render(<SignUp />);
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.click(registerButton);

    expect(screen.getByText('生年月日を入力してください')).toBeInTheDocument();
  });
  it('バリデート必須チェック（利用規約の同意）', async () => {
    render(<SignUp />);
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.click(registerButton);

    expect(screen.getByText('利用規約の同意が必要です')).toBeInTheDocument();
  });

  it('バリデート形式チェック（メールアドレス）', async () => {
    render(<SignUp />);
    let input = screen.getByRole('textbox', { name: 'メールアドレス' }) as HTMLInputElement;
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.change(input, { target: { value: 'abcdefg' } });
    fireEvent.click(registerButton);

    expect(screen.getByText('メールアドレス形式で入力してください')).toBeInTheDocument();
    // expect(input.value).toBe('abcdefg');
  });
  it('バリデート桁数チェック（パスワード）', async () => {
    render(<SignUp />);
    let input = screen.getByLabelText('パスワード') as HTMLInputElement;
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.change(input, { target: { value: '12345' } });
    fireEvent.click(registerButton);

    expect(screen.getByText('6桁以上で入力してください')).toBeInTheDocument();
  });
  it('バリデート同値チェック（パスワード）', async () => {
    render(<SignUp />);
    let input1 = screen.getByLabelText('パスワード') as HTMLInputElement;
    let input2 = screen.getByLabelText('パスワード（再入力）') as HTMLInputElement;
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.change(input1, { target: { value: '123456' } });
    fireEvent.change(input1, { target: { value: '123457' } });
    fireEvent.click(registerButton);

    expect(screen.getByText('パスワードが一致しません')).toBeInTheDocument();
  });
  it('バリデート形式チェック（生年月日）', async () => {
    render(<SignUp />);
    let input = screen.getByRole('textbox', { name: '生年月日' }) as HTMLInputElement;
    const registerButton = screen.getByRole('button', { name: '登録' });
    fireEvent.change(input, { target: { value: '2001/1/2' } });
    fireEvent.click(registerButton);

    expect(screen.getByText('yyyy/MM/ddの形式で入力してください')).toBeInTheDocument();
  });
});

// describe('デバッグ', () => {
//   render(<SignUp />);
//   let input = screen.getByRole('textbox', { name: 'fuga' }) as HTMLInputElement;
// });
