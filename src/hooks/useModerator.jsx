import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useModerator = () => {
  const axiosPrivate = useAxiosPrivate();
  const { user } = useAuth();

  const { data: isModerator, isPending } = useQuery({
    queryKey: ["isModerator", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPrivate.get(`users/admin?email=${user?.email}`);
      return res?.data?.moderator;
    },
  });
  return { isModerator, isPending };
};

export default useModerator;
