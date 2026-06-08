// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { navLinks } from '../../lib/nav';
import MobileNav from './MobileNav';

describe('MobileNav', () => {
  it('toggles the mobile menu', () => {
    render(<MobileNav navLinks={navLinks} discordUrl="https://discord.gg/example" />);

    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));

    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learning' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Join Discord' })).toHaveAttribute(
      'href',
      'https://discord.gg/example',
    );
  });
});
