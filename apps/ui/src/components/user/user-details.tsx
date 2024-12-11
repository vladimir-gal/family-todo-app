"use client";

import { getUserQuery } from "@/services/user/query";
import { toast } from "design-library";
import { FC } from "react";

export type UserDetailsProps = {
  id: string;
};

const UserDetails: FC<UserDetailsProps> = (props) => {
  const { data, error } = getUserQuery(props.id).useOnClient();

  if (error) {
    toast.error(error.message);
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UserDetails;
