import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { data: role, isLoading:roleLoading } = useQuery({
    queryKey: ["role", user?.email],
     enabled: !!user?.email,
    queryFn: async () => {
      // if (user?.email) return {role:"user"};
      const res= await axiosPublic.get(`/user/${user.email}`);
      return res.data.role;
    },
  });
  return [role, roleLoading];
};
export default useRole;
