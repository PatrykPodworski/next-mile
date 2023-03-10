import Link from "next/link";

const Users = () => (
  <div className="flex flex-col justify-center items-center h-screen mb-2">
    <p className="text-xl font-bold text-blue-500">This is user list view.</p>
    <Link href={"/"}>Back to index</Link>
  </div>
);

export default Users;
