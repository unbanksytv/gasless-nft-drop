import { screen } from '@testing-library/react';
import { appRender } from 'test-utils';

import Home from '@/pages/index';

describe('home', () => {
  it('renders Home', () => {
    expect.hasAssertions();
    appRender(<Home />);

    expect(document.title).toBe('Create Next App');
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /welcome to next\.js!/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Vercel Logo');
  });

  it('calls /hello api with mock data', async () => {
    expect.hasAssertions();
    appRender(<Home />);

    await expect(screen.findByText('/hello')).resolves.toBeInTheDocument();
    await expect(
      screen.findByText('MOCK_NAME', { exact: false }),
    ).resolves.toBeInTheDocument();
  });
});
