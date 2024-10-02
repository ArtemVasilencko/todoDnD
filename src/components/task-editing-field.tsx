import { IconButton, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import CheckIcon from '@mui/icons-material/Check'

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
    <div style={{ width: '100%', padding: '10px' }}>
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
