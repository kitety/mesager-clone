import { IconType } from "react-icons";
import { FC } from "react";
import button from "@/app/components/Button";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type={"button"}
      onClick={onClick}
      className={
        "inline-flex w-full justify-center rounded-md px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300 hover:ring-gray-500 focus:outline-gray-500"
      }
    >
      <Icon />
    </button>
  );
};
export default AuthSocialButton;
