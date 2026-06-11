import { useEffect, useId, useRef, useState } from 'react';
import type { NavLink } from '../../lib/nav';

interface MobileNavProps {
  navLinks: NavLink[];
  discordUrl: string;
}

export default function MobileNav({ navLinks, discordUrl }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm font-medium text-ink hover:bg-surface-hover"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Close' : 'Menu'}
      </button>

      {open && (
        <nav
          id={menuId}
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full border-b border-border bg-surface-elevated px-4 py-4 shadow-md"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  className="block text-sm font-medium text-ink-muted hover:text-brand-500"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg bg-mod px-4 py-2 text-sm font-semibold text-white hover:bg-mod-700"
              >
                Join Discord
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
