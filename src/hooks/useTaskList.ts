import { useLocalStorage } from 'usehooks-ts'
import { ChangeTaskProps, TaskProgresses, TaskType } from '../shared/types'
import { v4 as uuidv4 } from 'uuid'

export function useTaskList() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>('tasks', [])

  function deleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  function changeTask({ taskId, fieldName, value }: ChangeTaskProps) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, [fieldName]: value } : task
      )
    )
  }

  function addTask(taskName: string) {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        name: taskName,
        isEditing: false,
        progress: TaskProgresses.PLAN,
      },
    ])
  }

  return { tasks, deleteTask, changeTask, addTask }
}
