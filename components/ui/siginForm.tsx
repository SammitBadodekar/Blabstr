"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type FormType = "signin" | "signup";

const SiginForm = ({ formType }: { formType: FormType }) => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const { data: session } = useSession();
  console.log(session?.user);

  if (session?.user) {
    axios.put("/api/users/signup", session.user);
    router.push("/");
  }

  const mutation = useMutation(() => {
    return axios.put("/api/users/signup", userInput);
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formType === "signin" && userInput.email && userInput.password) {
      const { email, password } = userInput;
      const user = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log(user);
      if (!user?.url) toast.error("Invalid Credentials");
    } else if (
      formType === "signup" &&
      userInput.name &&
      userInput.password &&
      userInput.email
    ) {
      mutation.mutate();

      if (mutation.isError) toast.error("Account already exists");
      if (mutation.isSuccess) {
        toast.success("Successfully created account");
        router.push("/signin");
      }

      console.log(mutation.data);
    } else toast.error("Fill all details");
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-2">
      <form
        className=" flex flex-col items-center justify-center gap-4 p-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        {formType === "signup" && (
          <input
            type="text"
            className=" min-w-0 rounded-lg border-2 border-darkGray bg-transparent p-2"
            placeholder="Full Name"
            value={userInput.name}
            onChange={(e) =>
              setUserInput((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        )}
        <input
          type="email"
          className=" min-w-0 rounded-lg border-2 border-darkGray bg-transparent p-2"
          placeholder="Email"
          value={userInput.email}
          onChange={(e) =>
            setUserInput((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
        <input
          type="password"
          className=" min-w-0 rounded-lg border-2 border-darkGray bg-transparent p-2"
          placeholder="Password"
          value={userInput.password}
          onChange={(e) =>
            setUserInput((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
        <button
          type="submit"
          className=" mt-4 rounded-lg bg-lightGray p-2 px-14 font-semibold dark:bg-darkGray md:w-full"
        >
          {mutation.isLoading
            ? "Loading..."
            : formType === "signup"
            ? "Create Account"
            : "Signin"}
        </button>
      </form>
      <p className=" -my-3 text-xl font-semibold">or</p>
      <button
        className=" flex items-center gap-2 rounded-md bg-extraLightGray p-2 font-bold shadow-xl dark:bg-lightTheme dark:text-darkTheme md:w-full"
        onClick={() => signIn("google")}
      >
        <FcGoogle />
        {formType === "signup" ? "SignUp" : "Signin"} with Google
      </button>
      <p>
        {formType === "signup"
          ? "Already have an account, "
          : "Don't have an Account , "}

        <Link
          href={formType === "signup" ? "/signin" : "/signup"}
          className="text-blue-500 underline dark:text-blue-300"
        >
          {formType === "signup" ? "Signin" : "signup"}
        </Link>
      </p>
    </div>
  );
};
export default SiginForm;
