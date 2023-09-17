import { useGetUsersQuery } from "../api/getUsers";

export const Users = () => {
  const {
    data: data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  // const test = () => {
  //   res = await useGetUsersQuery();
  // };
  if (isSuccess) {
    console.log(data);
    return <div>Yay</div>;
  }

  return <div>Users</div>;
};
