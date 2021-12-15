import { createEmbeddedApp } from '../../EmbeddedApps';

export interface AppCellProps {
  type: string
}

function AppCell(props: AppCellProps) {
  return createEmbeddedApp(props.type)()
}

export default AppCell;