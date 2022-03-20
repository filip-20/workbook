import { useEffect, useRef, useState } from "react";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { githubApi } from "../services/githubApi/endpoints/repos"
import { githubApiErrorMessage } from "../services/githubApi/errorMessage";

import { selectUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadSheet } from "../store/sheetSlice";
import { parseFilepath, parseGithubUrlPath } from "./RepoPage";
import Sheet from "./Sheet/Sheet";
import SheetCommitter from "./Sheet/SheetCommitter";
import { Base64 } from 'js-base64';

import styles from './SheetPage.module.css'

function SheetPage() {
  const user = useAppSelector(selectUser);
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
                setBody2 (<Container><Alert variant="danger">Obsah súboru sa nepodarilo dekódovať</Alert></Container>)
              }
              if (content) {
                console.log('loading file');
                //console.log(data);
                dispatch(loadSheet({ json: content, fileInfo: { owner, repo, branch, path, sha: data.sha } }))
                fileChanged.current = false;
              }
            }
            const body = (
              <Card className={`shadow-lg ${styles.sheetContainer}`}>
                <Card.Header>
                  <SheetCommitter />
                </Card.Header>
                <Card.Body>
                  <Sheet />
                </Card.Body>
              </Card>
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
        <Container>
          {body}
        </Container>
      )
    }
  }
}

export default SheetPage;