import { render, screen } from '@testing-library/react';

import RouteLink from './RouteLink';

describe('route link', () => {
  it('should render a <a> tag', () => {
    expect.hasAssertions();
    render(
      <RouteLink href="/MOCK_HREF">
        <div data-testid="children" />
      </RouteLink>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', '/MOCK_HREF');
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });
});
