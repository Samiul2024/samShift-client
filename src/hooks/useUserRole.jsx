import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: role = null,
        isPending,
        isError,
        error,
        refetch
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !!user?.email && !loading, // only run when user is ready
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data.role;
        },
        staleTime: 5 * 60 * 1000, // cache for 5 minutes
    });

    return {
        role,
        isLoading: isPending || loading,
        isError,
        error,
        refetch
    };
};

export default useUserRole;