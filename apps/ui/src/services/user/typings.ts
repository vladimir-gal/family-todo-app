export type User = {
  id: string;
  name: string;
  email: string;
  profiles: Profile[];
};

type Profile = {
  id: string;
  name: string;
  role: string;
  tasks: Task[];
};

type Task = {
  id: string;
  name: string;
  dueDate: string;
};

export type UpdateUser = {
  name: string;
  email: string;
};
