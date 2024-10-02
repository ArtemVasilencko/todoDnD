import { useDrop } from 'react-dnd'
import { ChangeTaskProps, TaskProgresses, TaskType } from '../types/types'
import { Task } from './task'
import { TaskListHeader } from './task-list-header'
import { ItemTypes } from '../utils/constants'

type TaskListProps = {
  progress: TaskProgresses
  tasks: TaskType[]
  deleteTask: (id: string) => void
  changeTask: ({ taskId, fieldName, value }: ChangeTaskProps) => void
}

const titles = {
  [TaskProgresses.PLAN]: 'ПЛАН',
  [TaskProgresses.PROGRESS]: 'В РАБОТЕ',
  [TaskProgresses.DONE]: 'ГОТОВО',
}

export default function TaskList({
  progress,
  tasks,
  deleteTask,
  changeTask,
}: TaskListProps) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      drop: (task: TaskType) => {
        changeTask({
          taskId: task.id,
          fieldName: 'progress',
          value: progress,
        })
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [tasks]
  )

  return (
    <div ref={drop} style={{ padding: '15px 0' }}>
      <TaskListHeader
        title={titles[progress]}
        count={tasks.length}
        isOver={isOver}
      />
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          changeTask={changeTask}
        />
      ))}
    </div>
  )
}
