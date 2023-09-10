"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { LiaSpinnerSolid } from "react-icons/lia";
import { toast } from "react-hot-toast";
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

  const pushUser = async () => {
    toast(() => (
      <span className=" animate-spin">
        <LiaSpinnerSolid />
      </span>
    ));
    try {
      const response = await axios.put("/api/users/signup", session?.user);
      if (response.data === "Created New Account") {
        router.push("/setup-profile");
      }
    } catch (error) {
      if (!session?.user?.image) {
        router.push("/setup-profile");
      } else router.push("/home");
    }
  };

  if (session?.user) {
    pushUser();
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formType === "signin" && userInput.email && userInput.password) {
      const { email, password } = userInput;
      const user = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!user?.url) toast.error("Email or password is incorrect");
    } else if (
      formType === "signup" &&
      userInput.name &&
      userInput.password &&
      userInput.email
    ) {
      toast
        .promise(axios.put("/api/users/signup", userInput), {
          loading: "Creating new account...",
          success: <p>Successfully created account</p>,
          error: (
            <p>
              Account with email <b>"{userInput.email}"</b> already exists
            </p>
          ),
        })
        .then((resp) => {
          if (resp.data === "Created New Account") {
            router.push("/signin");
          }
        });
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
          {formType === "signup" ? "Create Account" : "Sign in"}
        </button>
      </form>
      <p className=" -my-3 text-xl font-semibold">or</p>
      <button
        className=" flex items-center gap-2 rounded-md bg-extraLightGray p-2 font-bold shadow-xl dark:bg-lightTheme dark:text-darkTheme md:w-full"
        onClick={() => signIn("google")}
      >
        <FcGoogle />
        {formType === "signup" ? "Sign Up" : "Sign in"} with Google
      </button>
      <p>
        {formType === "signup"
          ? "Already have an account, "
          : "Don't have an Account , "}

        <Link
          href={formType === "signup" ? "/signin" : "/signup"}
          className="text-blue-500 underline dark:text-blue-300"
        >
          {formType === "signup" ? "Sign in" : "sign up"}
        </Link>
      </p>
    </div>
  );
};
export default SiginForm;
