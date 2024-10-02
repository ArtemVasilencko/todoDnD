import { Typography } from '@mui/material'

import styles from '../task-list.module.scss'

type TaskListHeaderProps = {
  title: string
  count: number
  isOver: boolean
}

export function TaskListHeader({ title, count, isOver }: TaskListHeaderProps) {
  return (
    <Typography
      className={
        isOver ? styles.taskListHeaderTransparent : styles.taskListHeader
      }
      fontSize="small"
    >
      {title} ({count})
    </Typography>
  )
}
