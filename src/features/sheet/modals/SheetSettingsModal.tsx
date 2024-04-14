import { markdown } from "@codemirror/lang-markdown";
import { useState } from "react";
import { Alert, Button, Form, Modal, Row } from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { sheetActions, sheetSelectors, SheetSettings } from "../slice/sheetSlice";
import katex from "katex";
import React from "react";

export type SettingTab = 'NONE' | 'KATEX_MACROS' | 'github';

export interface SheetSettingTabProps {
  settings: SheetSettings,
  onSave: (newSettings: SheetSettings) => void
}

export interface SheetSettingsModalProps {
  tab: SettingTab,
  onClose: () => void,
}

type TabsInfo = {
  [key in SettingTab]: {
    title: string, // menu entry name
    tabComponent: (props: SheetSettingTabProps) => JSX.Element,
  }
}

export const tabsInfo: TabsInfo = {
  'NONE': { title: '', tabComponent: () => <></> },
  'KATEX_MACROS': { title: 'Katex macros', tabComponent: KatexMacrosTab },
  'github': { title: 'Github settings', tabComponent: GithubSettingsTab }
}

function copyObj(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

export default function SheetSettingsModal(props: SheetSettingsModalProps) {
  const { tab, onClose } = props;
  const tabInfo = tabsInfo[tab];

  const settings = useAppSelector(sheetSelectors.sheetSettings);

  const dispatch = useAppDispatch();

  //console.log('render ', settings)

  const handleSave = (s: SheetSettings) => {
    if (JSON.stringify(settings) !== JSON.stringify(s)) {
      dispatch(sheetActions.updateSettings(s))
    }
    onClose();
  }

  return (
    <Modal show={tab !== 'NONE'} size="lg" fullscreen="sm-down" onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Current workbook settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {React.createElement(tabInfo.tabComponent, { settings: copyObj(settings), onSave: handleSave })}
      </Modal.Body>
    </Modal>
  )
}

function KatexMacrosTab(props: SheetSettingTabProps) {
  const [macrosDef, setMacrosDef] = useState(props.settings.katexMacros || '')
  const [err, setErr] = useState<string | undefined>(undefined);

  const handleSave = () => {
    let m = {};
    try {
      katex.renderToString(macrosDef, {
        globalGroup: true,
        macros: m,
      });

      setErr(undefined);
      console.log(m)
      props.settings.katexMacros = macrosDef;
      props.onSave(props.settings);

    } catch (err) {
      if (err instanceof katex.ParseError) {
        const msg = `${(err as katex.ParseError).name}: ${(err as katex.ParseError).message}`
        const errLine = (macrosDef.substring(0, err.position).match(/\n/g) || []).length + 1
        setErr(`Chyba na riadku ${errLine}: ${msg}`);
      } else {
        setErr(`Chyba`);
      }
    }
  }

  return (
    <>
      <h5>Katex macros</h5>
      <CodeMirror
        value={props.settings.katexMacros}
        onChange={(value) => setMacrosDef(value)}
        extensions={[markdown()]}
      />
      <hr />
      {err !== undefined && <Alert variant="danger">{err}</Alert>}
      <Button disabled={macrosDef === props.settings.katexMacros} className="float-end" variant="success" onClick={handleSave}>Save</Button>
    </>
  )
}

function GithubSettingsTab(props: SheetSettingTabProps) {
  const [editBranch, setEditBranch] = useState(props.settings.github?.editBranch || '')
  const [handinBranch, setHandinBranch] = useState(props.settings.github?.handinBranch || '')

  const handleSave = () => {
      props.settings.github = {
        editBranch, handinBranch
      }
      props.onSave(props.settings);
  }

  return (
    <>
      <h5>Github settings</h5>
      <Form>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label>Editing branch</Form.Label>
            <Form.Control type="text" value={editBranch} onChange={e => setEditBranch(e.target.value)} />
            <Form.Label>Hand in branch</Form.Label>
            <Form.Control type="text" value={handinBranch} onChange={e => setHandinBranch(e.target.value)} />
          </Form.Group>
        </Row>
        <Button variant="success" type="submit" onClick={handleSave}>Save</Button>
      </Form>
    </>
  )
}