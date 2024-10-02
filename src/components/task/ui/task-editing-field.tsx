import { IconButton, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import CheckIcon from '@mui/icons-material/Check'

import styles from '../task.module.scss'

type TaskEditingFieldProps = {
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSave: () => void
}

export function TaskEditingField({
  value,
  handleChange,
  handleSave,
}: TaskEditingFieldProps) {
  return (
    <div className={styles.taskEditingFieldContainer}>
      <TextField
        value={value}
        onChange={handleChange}
        variant="standard"
        label="Имя задачи"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton color="primary" onClick={handleSave}>
                <CheckIcon />
              </IconButton>
            ),
          },
        }}
        fullWidth
      />
    </div>
  )
}
