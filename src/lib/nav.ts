export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/learning", label: "Learning" },
  { href: "/code-of-conduct", label: "Code of Conduct" },
];
