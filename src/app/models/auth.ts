export interface LoginPayload {
  model: string;
  password: string;
  userName: string;
  version: string;
}

export interface RegisterPayload {
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserInfo {
  id: string;
  firstname: string;
  lastname: string;
  teams: string[];
  username: string;
  email: string;
  enabled: boolean;
  type: string;
}
