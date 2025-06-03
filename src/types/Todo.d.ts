export interface Todo {
  id: number;
  todo: string;
  date_created: string;
  deadline?: string;
  is_completed: 0 | 1;
}
