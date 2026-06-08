import { describe, expect, it } from 'vitest';
import { navLinks } from './nav';

describe('navLinks', () => {
  it('includes all v1 routes', () => {
    const hrefs = navLinks.map((link) => link.href);
    expect(hrefs).toContain('/');
    expect(hrefs).toContain('/learning');
    expect(hrefs).toContain('/code-of-conduct');
  });
});
