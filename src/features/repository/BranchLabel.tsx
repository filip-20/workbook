import { BiGitBranch } from "react-icons/bi";

export default function BranchLabel(props: {branch: string}) {
  return <span className="bg-primary text-white fs-5 rounded mx-2 px-2 py-1"><BiGitBranch /> {props.branch}</span>
}