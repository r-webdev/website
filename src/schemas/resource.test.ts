import { describe, expect, it } from 'vitest';
import { ResourceSchema } from './resource';

describe('ResourceSchema', () => {
  it('accepts valid resource data', () => {
    const result = ResourceSchema.safeParse({
      id: 'mdn',
      title: 'MDN',
      url: 'https://developer.mozilla.org',
      category: 'html',
      tags: ['docs'],
      featured: true,
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid category', () => {
    const result = ResourceSchema.safeParse({
      id: 'bad',
      title: 'Bad',
      url: 'https://example.com',
      category: 'invalid',
      tags: [],
      featured: false,
    });

    expect(result.success).toBe(false);
  });
});
