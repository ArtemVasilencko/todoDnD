import { Typography } from '@mui/material'

type TaskListHeaderProps = {
  title: string
  count: number
  isOver: boolean
}

export function TaskListHeader({ title, count, isOver }: TaskListHeaderProps) {
  return (
    <Typography
      color="gray"
      textAlign="center"
      style={{ padding: 10, fontSize: '12px', opacity: isOver ? 0.5 : 1 }}
    >
      {title} ({count})
    </Typography>
  )
}
