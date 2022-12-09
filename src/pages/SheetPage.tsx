import { useEffect, useRef, useState } from "react";
import {  Button, ButtonGroup, ButtonToolbar, Container, Dropdown } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { MdMenuBook, MdSettings } from "react-icons/md";
import { authSelectors } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { makeRepoLink, parseFilepath, parseGithubUrlPath } from "./RepoPage";
import Sheet from "../features/sheet/Sheet";
import Pathbar from "../features/repository/Pathbar";
import Err404Page from "./Err404Page";
import BranchLabel from "../features/repository/BranchLabel";
import LoginPage from "./LoginPage";
import SheetSettingsModal, { SettingTab } from "../features/sheet/modals/SheetSettingsModal";
import MergeSheetModal from "../features/sheetStorage/github/MergeSheetModal";
import { GithubFileLocation, openSheet } from "../features/sheetStorage/github/githubStorage";
import SaveIndicator from "../features/sheetStorage/SaveIndicator";
import MergeButton from "../features/sheetStorage/github/MergeButton";
import SaveErrorModal from "../features/sheetStorage/github/SaveErrorModal";
import { BiRedo, BiUndo } from "react-icons/bi";
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import UndoRedoButtonGroup from "../features/sheet/UndoRedo";

function SheetPage() {
  const authState = useAppSelector(authSelectors.authState);
  const user = useAppSelector(authSelectors.user);
  const location = useLocation();
  const params = useParams();
  const { owner, repo } = params;
  const repoParams = parseGithubUrlPath(params['*'] || '');

  const ghLocation = useRef<GithubFileLocation | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let lastLoaded: GithubFileLocation | undefined = undefined
    if (ghLocation.current !== undefined && JSON.stringify(ghLocation.current) !== JSON.stringify(lastLoaded)) {
      lastLoaded = {...ghLocation.current};
      dispatch(openSheet(ghLocation.current));
    }
  }, [ghLocation, dispatch]);

  const [settingsTab, setSettingsTab] = useState<SettingTab>('NONE')
  const [mergeSheetModal, setMergeSheetModal] = useState(false);

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
      ghLocation.current = { owner, repo, path: path, ref: branch };
      return (
        <Container fluid className="w-100 m-0 p-0" style={{ minHeight: 'calc(100vh - var(--workbook-nav-height))', background: 'white' }}>

          <MergeSheetModal show={mergeSheetModal} onClose={() => setMergeSheetModal(false)} />
          <SheetSettingsModal tab={settingsTab} onClose={() => setSettingsTab('NONE')} />
          <SaveErrorModal />

          <div style={{top: '0px', position: 'sticky', zIndex: 999, background: 'white'}} className="p-3 border-bottom d-flex align-items-center flex-wrap">
            <div style={{ fontSize: '1.5rem' }}>
              <MdMenuBook />
              <BranchLabel branch={branch} />
              <Pathbar style={{ color: 'white !important' }} owner={owner} path={path} branch={branch} repoName={repo} makeLink={makeRepoLink} />
            </div>
            <div><SaveIndicator style={{ marginLeft: '1rem' }} /></div>
            <div style={{ flexGrow: '1' }}></div>
            <ButtonToolbar className="d-inline-block">
              <UndoRedoButtonGroup />
              <ButtonGroup className="me-2">
                <MergeButton />
              </ButtonGroup>
              <ButtonGroup>
                <Dropdown>
                  <Dropdown.Toggle title="Workbook settings" variant="secondary">
                    <MdSettings />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setSettingsTab('KATEX_MACROS')}>Katex macros</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
          <div className="m-3 h-100">
            <Sheet />
          </div>
        </Container>
      )
    }
  }
}

export default SheetPage;