import { markdown } from "@codemirror/lang-markdown";
import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import CodeMirror from '@uiw/react-codemirror';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { sheetActions, sheetSelectors, SheetSettings } from "../slice/sheetSlice";
import katex from "katex";
import React from "react";

export type SettingTab = 'NONE' | 'KATEX_MACROS';

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
    title: string,
    tabComponent: (props: SheetSettingTabProps) => JSX.Element,
  }
}

const tabsInfo: TabsInfo = {
  'NONE': { title: '', tabComponent: () => <></> },
  'KATEX_MACROS': { title: 'katex makrá', tabComponent: KatexMacrosTab }
}

function copyObj(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

export default function SheetSettingsModal(props: SheetSettingsModalProps) {
  const { tab, onClose } = props;
  const tabInfo = tabsInfo[tab];

  const settings = useAppSelector(sheetSelectors.sheetSettings);

  const dispatch = useAppDispatch();

  console.log('render ', settings)

  const handleSave = (s: SheetSettings) => {
    if (JSON.stringify(settings) !== JSON.stringify(s)) {
      dispatch(sheetActions.updateSettings(s))
    }
    onClose();
  }

  return (
    <Modal show={tab !== 'NONE'} size="lg" fullscreen="sm-down" onHide={() => onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Nastavenia aktuálneho hárku</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {React.createElement(tabInfo.tabComponent, { settings: copyObj(settings), onSave: handleSave})}
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
        const errLine = (macrosDef.substring(0, err.position).match(/\n/g) || []).length + 1
        setErr(`Chyba syntaxe na riadku ${errLine}`);
      } else {
        setErr(`Chyba syntaxe`);
      }
    }
  }

  return (
    <>
      <h5>Katex makrá</h5>
      <CodeMirror
        value={props.settings.katexMacros}
        onChange={(value) => setMacrosDef(value)}
        extensions={[markdown()]}
      />
      <hr />
      {err !== undefined && <Alert variant="danger">{err}</Alert>}
      <Button disabled={macrosDef === props.settings.katexMacros} className="float-end" variant="success" onClick={handleSave}>Uložiť</Button>
    </>
  )
}