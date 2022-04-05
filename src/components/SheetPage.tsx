import { useEffect, useRef, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { githubApi } from "../services/githubApi/endpoints/repos"
import { githubApiErrorMessage } from "../services/githubApi/errorMessage";
import { MdMenuBook, MdSignalCellular1Bar } from "react-icons/md";
import { authSelectors } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { makeLink, parseFilepath, parseGithubUrlPath } from "./RepoPage";
import Sheet from "./Sheet/Sheet";
import SheetCommitter from "./Sheet/SheetCommitter";
import { Base64 } from 'js-base64';

import Pathbar from "./Repo/Pathbar";
import { sheetActions } from "../store/sheetSlice";
import { BiGitBranch } from "react-icons/bi";
import Err404Page from "./Err404Page";
import BranchLabel from "./Repo/BranchLabel";
import LoginPage from "./LoginPage";

function SheetPage() {
  const authState = useAppSelector(authSelectors.authState);
  const user = useAppSelector(authSelectors.user);
  const params = useParams();
  const { repo } = params;
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
    return <LoginPage msg="Pre pokračovanie sa musíte prihlásiť" readirectTo={window.location.pathname} />
  } else {
    const { branch, type, path } = repoParams;
    const { filename, extension } = parseFilepath(path);
    if (type !== 'file' || extension !== 'workbook' || !repo || !branch) {
      return (<Err404Page />);
    } else {
      const loadArgs = { owner: user.login, repo, path, ref: branch };
      if (JSON.stringify(lastPromiseInfo.lastArg) !== JSON.stringify(loadArgs)) {
        console.log('loading workbook');
        loadTrigger(loadArgs);
      }

      return (
        <Container fluid className="w-100 m-0 p-0" style={{ minHeight: '100%', background: 'white' }}>
          <div className="mx-3 p-3 border-bottom" style={{ fontSize: '1.5rem' }}>
            <MdMenuBook />
            <BranchLabel branch={branch} />
            <Pathbar style={{ color: 'white !important' }} path={path} branch={branch} repoName={repo} makeLink={makeLink} />
            <div style={{ display: 'inline-block' }}><SheetCommitter style={{ marginLeft: '1rem' }} /></div>
          </div>
          <div className="m-3">
            {loadResult.isLoading && loading}
            {loadResult.isError && loadFail(githubApiErrorMessage(loadResult.error))}
            {loadResult.isSuccess && sheetBody}
          </div>
        </Container>
      )
    }
  }
}

/*
function SheetPage() {
  const user = useAppSelector(authSelectors.user);
  const params = useParams();
  const urlPath = params['*'] || '';
  const parsed = parseGithubUrlPath(urlPath);
  const { repo } = params;

  const dispatch = useAppDispatch();
  const fileChanged = useRef(false);
  const [loadTrigger, loadResult, lastPromiseInfo] = githubApi.useLazyReposGetContentQuery();
  const [body2, setBody2] = useState(<></>);

  useEffect(() => {
    if (user?.login && repo && !('error' in parsed)) {
      const owner = user.login;
      const { branch, path } = parsed;
      const { extension } = parseFilepath(path);
      if (extension === 'workbook' && branch) {
        const args = { owner, repo, path, ref: branch };
        if (JSON.stringify(lastPromiseInfo.lastArg) !== JSON.stringify(args)) {
          fileChanged.current = true;
          loadTrigger(args);
        }
      }
      if (fileChanged.current && branch) {
        if (loadResult.isSuccess) {
          const { data } = loadResult;
          if (Array.isArray(data)) {
            setBody2(<Container><Alert variant="danger">Cesta odkazuje na priečinok</Alert></Container>)
          } else if (!('content' in data)) {
            setBody2(<Container><Alert variant="danger">Cesta neodkazuje na súbor</Alert></Container>)
          } else {
            if (fileChanged.current) {
              let content;
              try {
                content = Base64.decode(data.content)
              } catch (e) {
                setBody2(<Container><Alert variant="danger">Obsah súboru sa nepodarilo dekódovať</Alert></Container>)
              }
              if (content) {
                console.log('loading file');
                //console.log(data);
                dispatch(sheetActions.loadSheet({ json: content, fileInfo: { owner, repo, branch, path, sha: data.sha } }))
                fileChanged.current = false;
              }
            }


            const body = (
              <Sheet />
            )
            setBody2(body);
          }
        }
      }
    }
  }, [user, repo, parsed, loadResult]);

  if ('error' in parsed) {
    return (<Container><Alert variant="danger">Chyba URL</Alert></Container>)
  } else {
    const { branch, path } = parsed;
    const { filename, extension } = parseFilepath(path);
    if (extension !== 'workbook' || !repo || !branch) {
      return (<Container><Alert variant="danger">Chyba 404 (TODO jednotna stranka s chybou 404)</Alert></Container>)
    } else if (!user) {
      return (<Container><Alert variant="danger">Chyba autentifikácie</Alert></Container>)
    } else {
      const owner = user.login;
      const args = { owner, repo, path, ref: branch };

      if (JSON.stringify(lastPromiseInfo.lastArg) !== JSON.stringify(args)) {
        fileChanged.current = true
        console.log('refetching');
        loadTrigger(args);
      }

      let body;
      if (loadResult.isLoading) {
        body = <div style={{ width: '100%', textAlign: 'center' }}><Spinner animation="grow" role="status" /></div>
      } else if (loadResult.isError) {
        body = <Alert variant="danger">Načítanie hárku zlyhalo. ({githubApiErrorMessage(loadResult.error)})</Alert>
      } else if (loadResult.isSuccess) {
        body = body2;
      }

      return (
        <Container fluid className="w-100 m-0 p-0" style={{minHeight: '100%', background: 'white'}}>
          <div className="mx-3 p-3 border-bottom" style={{fontSize: '1.5rem'}}>
            <MdMenuBook />
            <span className="bg-primary text-white fs-5 rounded mx-2 px-2 py-1"><BiGitBranch /> {branch}</span>
            <Pathbar style={{ color: 'white !important' }} path={path} branch={branch} repoName={repo} makeLink={makeLink} />
            <div style={{display: 'inline-block'}}><SheetCommitter style={{marginLeft: '1rem'}} /></div>
          </div>
          <div className="m-3">
            {body}
          </div>
        </Container>
      )
    }
  }
}*/

export default SheetPage;