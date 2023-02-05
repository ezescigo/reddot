import { NavBar } from '../src/components/NavBar';
import { findByText, render, screen, } from '@testing-library/react'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '',
      reload: jest.fn()
      // ... whatever else you you call on `router`
    };
  },
}));

describe('NavBar', () => {
  it('renders NavBar component', async () => {
      render(<NavBar />);

    //  findByText("Create Post")
    //  screen.findByText("Create Post");
  });
})