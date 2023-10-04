import axios from "axios";
import { useQuery } from "react-query";
import FeaturedAccount from "./featuredAccount";

const FeaturedTab = () => {
  const { isLoading, error, data } = useQuery("featured account", () =>
    axios.get("/api/featuredUsers/getAll")
  );
  return (
    <aside className=" hidden h-screen w-full flex-col overflow-y-scroll border-l-2 p-2  lg:col-start-9  lg:col-end-13 lg:flex">
      <div className=" rounded-2xl bg-slate-200 p-2 dark:bg-slate-800">
        <h1 className=" p-2 text-xl font-extrabold">Who to follow</h1>
        {data?.data.map((user: any) => {
          return <FeaturedAccount user={user} key={user.id} />;
        })}
      </div>
    </aside>
  );
};
export default FeaturedTab;
