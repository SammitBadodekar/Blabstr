import axios from "axios";
import { useQuery } from "react-query";
import FeaturedAccount from "./featuredAccount";

const FeaturedTab = () => {
  const { isLoading, error, data } = useQuery("featured account", () =>
    axios.get("/api/featuredUsers/getAll")
  );

  console.log(data?.data);

  return (
    <aside className=" hidden h-screen flex-col overflow-y-scroll border-l-2 p-2 md:col-start-9  md:col-end-13 md:flex  lg:col-start-9 lg:col-end-13">
      <div className=" rounded-2xl bg-slate-200 p-2 dark:bg-slate-800">
        <h1 className=" p-2 text-xl font-extrabold">Who to follow</h1>
        {data?.data.map((user: any) => {
          return <FeaturedAccount user={user} />;
        })}
      </div>
    </aside>
  );
};
export default FeaturedTab;
