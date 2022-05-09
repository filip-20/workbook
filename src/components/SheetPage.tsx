import { useEffect, useRef, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { githubApi } from "../services/githubApi/endpoints/repos"
import { githubApiErrorMessage } from "../services/githubApi/errorMessage";
import { MdMenuBook } from "react-icons/md";
import { authSelectors } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { makeRepoLink, parseFilepath, parseGithubUrlPath } from "./RepoPage";
import Sheet from "./Sheet/Sheet";
import SheetCommitter from "./Sheet/SheetCommitter";
import { Base64 } from 'js-base64';

import Pathbar from "./Repo/Pathbar";
import { sheetActions } from "../store/sheetSlice";
import Err404Page from "./Err404Page";
import BranchLabel from "./Repo/BranchLabel";
import LoginPage from "./LoginPage";

function SheetPage() {
  const authState = useAppSelector(authSelectors.authState);
  const user = useAppSelector(authSelectors.user);
  const location = useLocation();
  const params = useParams();
  const { owner, repo } = params;
  const repoParams = parseGithubUrlPath(params['*'] || '');

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
        } catch (e) {}
        if (content) {
          loadState.current = 'loaded';
          const {owner, path, repo, ref} = lastPromiseInfo.lastArg;
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
      const loadArgs = { owner, repo, path, ref: branch };
      if (JSON.stringify(lastPromiseInfo.lastArg) !== JSON.stringify(loadArgs)) {
        console.log('loading workbook');
        loadTrigger(loadArgs);
      }

      return (
        <Container fluid className="w-100 m-0 p-0" style={{ minHeight: 'calc(100vh - var(--workbook-nav-height))', background: 'white' }}>
          <div className="mx-3 p-3 border-bottom" style={{ fontSize: '1.5rem' }}>
            <MdMenuBook />
            <BranchLabel branch={branch} />
            <Pathbar style={{ color: 'white !important' }} owner={owner} path={path} branch={branch} repoName={repo} makeLink={makeRepoLink} />
            <div style={{ display: 'inline-block' }}><SheetCommitter style={{ marginLeft: '1rem' }} /></div>
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