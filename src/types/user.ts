export type User = {
  id: string;
  name: string;
  email: string;
  /** String kosong bila akun tidak punya student_profile. */
  npm: string;
  /** String kosong bila akun tidak punya student_profile. */
  faculty: string;
};
