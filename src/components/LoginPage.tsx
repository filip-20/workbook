import { Button } from "react-bootstrap"
import { BsGithub } from "react-icons/bs"

import config from '../config.json';

export interface LoginPageProps {
  msg?: string,
  readirectTo?: string,
}

export function getLoginUrl(redirect?: string) {
  const { clientId } = config.githubApi;
  const backendUrl = encodeURIComponent(`${config.auth.backendUrl}${redirect ? `?redirect=${redirect}` : ''}`);
  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${backendUrl}&scope=repo`;
}

export default function LoginPage(props: LoginPageProps) {
  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--workbook-nav-height))'}}>
    <div style={{ width: '300px', margin: 'auto'}}>
      {props.msg && <><p>{props.msg}</p><hr /></>}
      <Button className="w-100" variant="dark" href={getLoginUrl(props.readirectTo)}><BsGithub color="white" /> Prihlásiť sa pomocou github</Button>
    </div>
    </div>
  )
}