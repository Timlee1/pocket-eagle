import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <div>Add navbar</div>
      <main>
        <Outlet />
      </main>
      <div>Add footer</div>
    </>
  );
};
