import { useDrop } from 'react-dnd'
import { ChangeTaskProps, TaskProgresses, TaskType } from '../../shared/types'
import { Task } from '../task/task'
import { TaskListHeader } from './ui/task-list-header'
import { ItemTypes } from '../../shared/constants'

import styles from './task-list.module.scss'

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
    <div className={styles.taskList} ref={drop}>
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
