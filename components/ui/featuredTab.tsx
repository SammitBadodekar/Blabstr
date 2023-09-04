import FeaturedAccount from "./featuredAccount";

const FeaturedTab = () => {
  return (
    <aside className="hidden h-screen overflow-y-scroll border-l-2 p-2  md:col-start-9 md:col-end-13 md:grid lg:col-start-9 lg:col-end-13">
      <h1>Who to follow</h1>
      {Array(5).fill(<FeaturedAccount />)}
    </aside>
  );
};
export default FeaturedTab;
