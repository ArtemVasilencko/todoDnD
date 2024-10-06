export type TaskType = {
  id: string
  name: string
  isEditing: boolean
  progress: TaskProgresses
}

export type ChangeTaskProps = {
  taskId: string
  fieldName: string
  value?: TaskProgresses | string | boolean
}

export enum TaskProgresses {
  PLAN = 'plan',
  PROGRESS = 'progress',
  DONE = 'done',
}
