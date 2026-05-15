/**
 * cn — class name utility
 *
 * Combines clsx (conditional classes) with tailwind-merge (dedup Tailwind classes).
 * Usage: cn('px-4', isActive && 'bg-sky', 'px-8')  → 'bg-sky px-8'
 * The last px wins — no duplicate Tailwind properties.
 */
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
