import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUp from '../sign-up/page';

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
});
