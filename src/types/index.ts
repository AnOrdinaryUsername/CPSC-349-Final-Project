export interface Project {
  date: Date;
  name: string;
  priorityLevel: number;
  tasks: Array<Task>;
}

export interface Task {
  isCompleted: boolean;
  description: string;
  image?: string;
  imageAlt?: string;
}
