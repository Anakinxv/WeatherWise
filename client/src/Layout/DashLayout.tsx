import { Outlet } from "react-router-dom";

function DashLayout() {
  return (
    <main className="container mx-auto h-screen w-full max-w-7xl p-4">
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">sidebar</div>
        <div className="col-span-3 relative z-10 bg-white rounded-lg shadow-md p-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default DashLayout;
