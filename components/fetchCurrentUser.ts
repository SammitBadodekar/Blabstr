"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export const fetchCurrentUser = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      const user = axios.get(`/api/users/${session.user.email}`);
      console.log(user);
    }
  }, [session?.user]);
};
