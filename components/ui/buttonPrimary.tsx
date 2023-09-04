const ButtonPrimary = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className=" flex items-center justify-center gap-2 rounded-full bg-darkGray p-2 text-xs text-lightTheme dark:bg-extraLightGray dark:text-darkTheme">
      {children}
    </button>
  );
};
export default ButtonPrimary;
