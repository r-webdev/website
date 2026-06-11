import { describe, expect, it } from 'vitest';
import { createTestContainer } from '../../test/createTestContainer';
import ValueCards from './ValueCards.astro';

describe('ValueCards', () => {
  it('renders all four value cards', async () => {
    const container = await createTestContainer();
    const html = await container.renderToString(ValueCards, { props: {} });

    expect(html).toContain("What we're about");
    expect(html).toContain('Learn');
    expect(html).toContain('Help');
    expect(html).toContain('Connect');
    expect(html).toContain('Belong');
  });
});
