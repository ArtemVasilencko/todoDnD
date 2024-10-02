import { Box, IconButton, Typography } from '@mui/material'
import { ChangeTaskProps, TaskProgresses, TaskType } from '../../shared/types'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { ChangeEvent, useState } from 'react'

import { TaskEditingField } from './ui/task-editing-field'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../shared/constants'

import MenuIcon from '@mui/icons-material/Menu'

type TaskProps = {
  task: TaskType
  deleteTask: (id: string) => void
  changeTask: ({ taskId, fieldName, value }: ChangeTaskProps) => void
}

export function Task({ task, deleteTask, changeTask }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(task.name)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TASK,
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  function handleSave() {
    changeTask({ taskId: task.id, fieldName: 'name', value })
    toggleIsEditing()
  }

  function toggleIsEditing() {
    setIsEditing(!isEditing)
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      style={{
        opacity: isDragging ? 0.3 : 1,
        fontSize: 25,
        fontWeight: 'bold',
      }}
    >
      {isEditing ? (
        <TaskEditingField
          value={value}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      ) : (
        <>
          <Box display="flex" alignItems="center" ref={drag}>
            <MenuIcon style={{ cursor: 'move' }} />
            <Typography>{task.name}</Typography>
          </Box>
          <Box>
            {task.progress !== TaskProgresses.DONE && (
              <IconButton onClick={toggleIsEditing} color="primary">
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={() => deleteTask(task.id)} color="warning">
              <DeleteIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  )
}
