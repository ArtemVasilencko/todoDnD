import Header from './header'
import AddTaskForm from './add-task-form'
import TaskList from './task-list'
import { ChangeTaskProps, TaskProgresses, TaskType } from '../types/types'
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from 'usehooks-ts'

import '../assets/style.css'

export default function TodoApp() {
  const [tasks, setTasks] = useLocalStorage<TaskType[]>('tasks', [])

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

  function deleteTask(taskId: string) {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  function changeTask({ taskId, fieldName, value }: ChangeTaskProps) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, [fieldName]: value } : task
      )
    )
  }

  return (
    <div className="container">
      <Header />
      <AddTaskForm addTask={addTask} />
      <TaskList
        progress={TaskProgresses.PLAN}
        tasks={tasks.filter((task) => task.progress === TaskProgresses.PLAN)}
        deleteTask={deleteTask}
        changeTask={changeTask}
      />
      <TaskList
        progress={TaskProgresses.PROGRESS}
        tasks={tasks.filter(
          (task) => task.progress === TaskProgresses.PROGRESS
        )}
        deleteTask={deleteTask}
        changeTask={changeTask}
      />
      <TaskList
        progress={TaskProgresses.DONE}
        tasks={tasks.filter((task) => task.progress === TaskProgresses.DONE)}
        deleteTask={deleteTask}
        changeTask={changeTask}
      />
    </div>
  )
}
