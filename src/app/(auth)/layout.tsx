import { getServerSession } from "next-auth";
import { FC, ReactNode } from "react";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default AuthLayout;
