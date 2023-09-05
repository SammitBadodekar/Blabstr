import FeaturedAccount from "./featuredAccount";

const FeaturedTab = () => {
  return (
    <aside className=" hidden h-screen flex-col overflow-y-scroll border-l-2 p-2 md:col-start-9  md:col-end-13 md:flex  lg:col-start-9 lg:col-end-13">
      <h1>Who to follow</h1>
      <FeaturedAccount />
      <FeaturedAccount />
      <FeaturedAccount />
      <FeaturedAccount />
    </aside>
  );
};
export default FeaturedTab;
