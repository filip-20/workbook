import { useState } from "react";
import { ButtonGroup, ButtonToolbar, Container, Dropdown, Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { MdMenuBook, MdSettings } from "react-icons/md";
import { authSelectors } from "../features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { makeRepoLink, parseFilepath, parseGithubUrlPath } from "./RepoPage";
import Sheet from "../features/sheet/Sheet";
import SheetCommitter from "../features/sheet/SheetCommitter";

import Pathbar from "../features/repository/Pathbar";
import Err404Page from "./Err404Page";
import BranchLabel from "../features/repository/BranchLabel";
import LoginPage from "./LoginPage";
import { pathURIEncode } from "../features/repository/RepoExplorer";
import SheetSettingsModal, { SettingTab } from "../features/sheet/SheetSettingsModal";

function SheetPage() {
  const authState = useAppSelector(authSelectors.authState);
  const user = useAppSelector(authSelectors.user);
  const location = useLocation();
  const params = useParams();
  const { owner, repo } = params;
  const repoParams = parseGithubUrlPath(params['*'] || '');

  const [settingsTab, setSettingsTab] = useState<SettingTab>('NONE')

  if ('error' in repoParams) {
    return (<Err404Page />);
  } else if (!user || authState !== "authenticated") {
    return <LoginPage msg="Pre pokračovanie sa musíte prihlásiť" readirectTo={location.pathname} />
  } else {
    const { branch, type, path } = repoParams;
    const { extension } = parseFilepath(path);
    if (type !== 'file' || extension !== 'workbook' || !owner || !repo || !branch) {
      return (<Err404Page />);
    } else {
      return (
        <Container fluid className="w-100 m-0 p-0" style={{ minHeight: 'calc(100vh - var(--workbook-nav-height))', background: 'white' }}>

          <SheetSettingsModal tab={settingsTab} onClose={() => setSettingsTab('NONE')} />

          <div className="p-3 border-bottom d-flex align-items-center flex-wrap">
            <div style={{ fontSize: '1.5rem' }}>
              <MdMenuBook />
              <BranchLabel branch={branch} />
              <Pathbar style={{ color: 'white !important' }} owner={owner} path={path} branch={branch} repoName={repo} makeLink={makeRepoLink} />
            </div>
            <div><SheetCommitter style={{ marginLeft: '1rem' }} /></div>
            <div style={{ flexGrow: '1' }}></div>
            <ButtonToolbar className="d-inline-block">
              <ButtonGroup>
                <Dropdown>
                  <Dropdown.Toggle title="Nastavenia aktuálneho hárku" variant="secondary">
                    <MdSettings />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSettingsTab('KATEX_MACROS')}>Katex makrá</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
          <div className="m-3 h-100">
            <Sheet fileInfo={{owner, repo, path: pathURIEncode(path), branch}} />
          </div>
        </Container>
      )
    }
  }
}

export default SheetPage;