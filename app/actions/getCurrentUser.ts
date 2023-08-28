import getSession from "@/app/actions/getSession";
import prismaClient from "@/app/libs/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prismaClient.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (e) {
    return null;
  }
};
export default getCurrentUser;
