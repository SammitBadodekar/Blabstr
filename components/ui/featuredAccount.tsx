import ProfileImage from "./profileImage";

const FeaturedAccount = () => {
  return (
    <div className=" m-2 flex w-fit gap-4">
      <ProfileImage
        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
        size={50}
      />

      <p className=" font-bold">User Name</p>
    </div>
  );
};
export default FeaturedAccount;
