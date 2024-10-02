import Header from '../header/header'
import AddTaskForm from '../add-task-form/add-task-form'
import TaskList from '../task-list/task-list'
import { TaskProgresses } from '../../shared/types'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { useTaskList } from '../../hooks/useTaskList'

import '../../assets/style.css'
import '../../assets/reset.css'

const progresses = [
  TaskProgresses.PLAN,
  TaskProgresses.PROGRESS,
  TaskProgresses.DONE,
]

export default function TodoApp() {
  const { tasks, addTask, deleteTask, changeTask } = useTaskList()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <Header />
        <AddTaskForm addTask={addTask} />
        {progresses.map((progress) => (
          <TaskList
            key={progress}
            progress={progress}
            tasks={tasks.filter((task) => task.progress === progress)}
            deleteTask={deleteTask}
            changeTask={changeTask}
          />
        ))}
      </div>
    </DndProvider>
  )
}
