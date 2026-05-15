/**
 * Badge
 * Small tech-stack pill used on project and experience cards.
 * color prop accepts a hex string that tints the background.
 */
import { cn } from '@/utils/cn'

export default function Badge({ children, color, className }) {
  const style = color
    ? {
        backgroundColor: `${color}14`,   // hex + 14 = ~8% opacity
        borderColor: `${color}30`,
        color: color,
      }
    : {}

  return (
    <span
      className={cn('tag-pill', className)}
      style={style}
    >
      {children}
    </span>
  )
}
