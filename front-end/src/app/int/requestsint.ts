export interface SendRegisterRequest {
  name: string;
  lastName: string;
  phone: string;
  user: string;
  password: string;
}

export interface SendLoginRequest {
  user: string;
  password: string;
}

export interface SendEmail {
  name: string;
  email: string;
  message: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  user: string;
}

export interface CheckProfileInfo {
  name: string;
  lastname: string;
  phone: string;
  user: string;
}

export interface ChaneProfileInfo {
  name: string;
  lastname: string;
  phone: string;
  user: string;
  password?: string;
}

export interface AddTask {
  title: string;
  deadline: string;
  priority: string;
  description: string;
  user?: string;
}

export interface ChangeTaskTatus {
  taskid: number;
  status: string;
}

export interface EditTaskInformation {
  title: string;
  deadline: string;
  description: string;
  priority: string;
  taskId: number | null;
}
