import { IconButton, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'

type AddTaskFormProps = {
  addTask: (name: string) => void
}

export default function AddTaskForm({ addTask }: AddTaskFormProps) {
  const [taskName, setTaskName] = useState('')

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setTaskName(e.target.value)
  }

  function handleAddTask(e: FormEvent) {
    e.preventDefault()
    addTask(taskName)
    setTaskName('')
  }

  return (
    <form onSubmit={handleAddTask}>
      <TextField
        variant="standard"
        label="Имя новой задачи"
        onChange={handleChange}
        value={taskName}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                type="submit"
                color="primary"
                disabled={!taskName.trim().length}
              >
                <AddIcon />
              </IconButton>
            ),
          },
        }}
        sx={{ marginBottom: '20px' }}
        fullWidth
      />
    </form>
  )
}
