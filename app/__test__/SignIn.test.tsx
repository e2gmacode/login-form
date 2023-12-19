import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignIn from '../sign-in/page';

// useRouterのモック化
const mockedUseRouter = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => mockedUseRouter(),
  usePathname: jest.fn().mockReturnValue('/'),
}));

// firebase/authのモック化
jest.mock('firebase/auth', () => {
  const authInstance = {
    currentUser: null,
  };
  return {
    getAuth: jest.fn(() => authInstance),
    onAuthStateChanged: jest.fn((authMock, onChangeCallback) => {
      return null;
    }),
  };
});

describe('ログイン画面のテスト', () => {
  it('表示項目確認（ログイン画面）', async () => {
    render(<SignIn />);
    expect(screen.getByText('ログイン画面')).toBeInTheDocument();
  });
  it('表示項目確認（メールアドレス）', async () => {
    render(<SignIn />);
    expect(screen.getByText('メールアドレス')).toBeInTheDocument();
  });
  it('表示項目確認（パスワード）', async () => {
    render(<SignIn />);
    expect(screen.getByText('パスワード')).toBeInTheDocument();
  });
  it('表示項目確認（ログイン）', async () => {
    render(<SignIn />);
    expect(screen.getByText('ログイン')).toBeInTheDocument();
  });
});

describe('バリデートチェックのテスト', () => {
  it('バリデート必須チェック（メールアドレス）', async () => {
    render(<SignIn />);
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    fireEvent.click(loginButton);

    expect(screen.getByText('メールアドレスを入力してください')).toBeInTheDocument();
  });
  it('バリデート必須チェック（パスワード）', async () => {
    render(<SignIn />);
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    fireEvent.click(loginButton);

    expect(screen.getByText('パスワードを入力してください')).toBeInTheDocument();
  });

  it('バリデート形式チェック（メールアドレス）', async () => {
    render(<SignIn />);
    let input = screen.getByRole('textbox', { name: 'メールアドレス' }) as HTMLInputElement;
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    fireEvent.change(input, { target: { value: 'abcdefg' } });
    fireEvent.click(loginButton);

    expect(screen.getByText('メールアドレス形式で入力してください')).toBeInTheDocument();
  });
});
