import React from "react";
import { Image } from "react-bootstrap";
import { authSelectors } from "../store/authSlice"
import { useAppSelector } from "../store/hooks"

export interface UserAvatarProps {
  className?: string,
  style?: React.CSSProperties,
  username?: string,
}

export default function UserAvatar(props: UserAvatarProps) {
  const user = useAppSelector(authSelectors.user)
  const avatarUrl = props.username ? `https://github.com/${props.username}.png` : user?.avatarUrl;
  return <Image roundedCircle src={avatarUrl} className={props.className} style={props.style} />
}