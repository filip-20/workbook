import { useEffect, useRef, useState } from "react";
import { Alert, ButtonGroup, ButtonToolbar, Container, Dropdown, Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { githubApi } from "../api/githubApi/endpoints/repos"
import { githubApiErrorMessage } from "../api/githubApi/errorMessage";
import { MdMenuBook, MdSettings } from "react-icons/md";
import { authSelectors } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { makeRepoLink, parseFilepath, parseGithubUrlPath } from "./RepoPage";
import Sheet from "../features/sheet/Sheet";
import SheetCommitter from "../features/sheet/SheetCommitter";
import { Base64 } from 'js-base64';

import Pathbar from "../features/repository/Pathbar";
import { sheetActions } from "../features/sheet/sheetSlice";
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

  // state of workbook file loading from github
  const loadState = useRef<'not-loaded' | 'loaded' | 'decode-fail'>('not-loaded');
  const [sheetBody, setSheetBody] = useState(<></>);

  const [loadTrigger, loadResult, lastPromiseInfo] = githubApi.useLazyReposGetContentQuery();

  const loading = <div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div>
  const loadFail = (msg?: String) => <Alert variant="danger">Načítanie hárku zlyhalo.{msg && <> ({msg})</>}</Alert>

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadState.current === 'not-loaded' && loadResult.isSuccess) {
      const { data } = loadResult;
      if (!('content' in data)) {
        loadState.current = 'decode-fail'
        setSheetBody(loadFail())
      } else {
        let content;
        try {
          content = Base64.decode(data.content);
        } catch (e) { }
        if (content) {
          loadState.current = 'loaded';
          const { owner, path, repo, ref } = lastPromiseInfo.lastArg;
          dispatch(sheetActions.loadSheet({ json: content, fileInfo: { owner, repo, branch: ref!!, path, sha: data.sha } }))
          setSheetBody(<Sheet />);
        } else {
          loadState.current = 'decode-fail';
          setSheetBody(loadFail('Base64 decode failed'));
        }
      }
    }
  }, [loadResult, loadState])

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
      const loadArgs = { owner, repo, path: pathURIEncode(path), ref: branch };
      if (JSON.stringify(lastPromiseInfo.lastArg) !== JSON.stringify(loadArgs)) {
        console.log('loading workbook');
        loadTrigger(loadArgs);
      }

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
            {loadResult.isLoading && loading}
            {loadResult.isError && loadFail(githubApiErrorMessage(loadResult.error))}
            {loadResult.isSuccess && sheetBody}
          </div>
        </Container>
      )
    }
  }
}

export default SheetPage;