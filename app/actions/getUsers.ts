import getSession from "@/app/actions/getSession";
import prismaClient from "@/app/libs/prismadb";

const getUser = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  try {
    const users = await prismaClient.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session?.user?.email as string,
        },
      },
    });
    return users;
  } catch (e) {
    return [];
  }
};
export default getUser;
