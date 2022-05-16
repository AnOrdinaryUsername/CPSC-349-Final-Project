export interface Project {
  id: number;
  date: Date;
  name: string;
  priorityLevel: number;
  tasks: Array<Task>;
}

export interface Task {
  id: number;
  isCompleted: boolean;
  description: string;
  image?: string;
  imageAlt?: string;
}
