import { DeleteUserForm } from "../components/DeleteUserForm";
import { PasswordResetForm } from "../components/PasswordResetForm";
import { UpdatePasswordForm } from "../components/UpdatePasswordForm";
import { UpdateEmailForm } from "../components/UpdateEmailForm";

export const Profile = () => {
  return (
    <>
      <DeleteUserForm />
      <PasswordResetForm />
      <UpdatePasswordForm />
      <UpdateEmailForm />
    </>
  );
};
