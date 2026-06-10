// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Resource } from '../../schemas/resource';
import ResourceSearch from './ResourceSearch';

const mockResources: Resource[] = [
  {
    id: 'css-tricks',
    title: 'CSS Tricks',
    url: 'https://css-tricks.com',
    description: 'CSS articles',
    category: 'css',
    tags: ['layout'],
    featured: true,
  },
  {
    id: 'mdn-html',
    title: 'MDN HTML',
    url: 'https://developer.mozilla.org',
    description: 'HTML reference',
    category: 'html',
    tags: ['docs'],
    featured: false,
  },
];

describe('ResourceSearch', () => {
  it('filters resources by query', () => {
    render(<ResourceSearch resources={mockResources} />);

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'css' } });

    expect(screen.getByText('CSS Tricks')).toBeInTheDocument();
    expect(screen.queryByText('MDN HTML')).not.toBeInTheDocument();
  });

  it('filters resources by category', () => {
    render(<ResourceSearch resources={mockResources} />);

    fireEvent.change(screen.getByLabelText('Filter by category'), {
      target: { value: 'html' },
    });

    expect(screen.getByText('MDN HTML')).toBeInTheDocument();
    expect(screen.queryByText('CSS Tricks')).not.toBeInTheDocument();
  });

  it('shows admin-gold featured badge', () => {
    render(<ResourceSearch resources={mockResources} />);

    const badge = screen.getByText('Featured');
    expect(badge).toHaveClass('text-admin');
    expect(badge).toHaveClass('bg-admin/20');
  });
});
