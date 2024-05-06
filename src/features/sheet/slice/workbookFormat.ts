import { SheetFile } from "./sheetSlice";

export function serializeWorkbook(workbook: SheetFile) {
  return JSON.stringify(workbook, null, 2)
}

export function deserializeWorkbook(workbook: string)
  : { result: 'success', sheetFile: SheetFile }
  | { result: 'error', message: string } {
  let sheetFile;
  try {
    sheetFile = JSON.parse(workbook);
    if (typeof sheetFile !== 'object') {
      return {
        result: 'error',
        message: `Parsed JSON has to be object, it is ${typeof sheetFile}`
      }
    }
  } catch (e) {
    const syntaxErr = e as SyntaxError
    return {
      result: 'error',
      message: `JSON parse failed: ${syntaxErr}`
    }
  }
  const { passed, error } = testSheetIntegrity(sheetFile);
  if (passed) {
    return { result: 'success', sheetFile }
  } else {
    return {
      result: 'error',
      message: error!
    }
  }
}

export function testSheetIntegrity(sheet: SheetFile): { passed: boolean, error?: string } {
  let error = undefined;

  /* test keys and types of sheet object */
  const reqKeys: { [key: string]: string } = {
    'cells': 'object',
    'cellsOrder': 'object',
  }
  /* optional keys */
  const optKeys: { [key: string]: string } = {
    /* now unused --> */
    'idCounter': 'number',
    'editedCellId': 'number',
    'firstCellId': 'number',
    'lastCellId': 'number',
    /* <-- */
    'versionNumber': 'number',
    'settings': 'object',
  }

  /* check for presence of required keys */
  for (const [key] of Object.entries(reqKeys)) {
    if (!(key in sheet)) {
      error = `Chýba kľúč '${key}'`;
      break;
    }
  }
  if (error) return { passed: false, error };

  for (const [key, value] of Object.entries(sheet)) {
    const keyType = key in reqKeys ? 'REQUIRED' : (key in optKeys ? 'OPTIONAL' : 'UNKNOWN')
    if (keyType === 'REQUIRED' || keyType === 'OPTIONAL') {
      const expectedType = keyType === 'REQUIRED' ? reqKeys[key] : optKeys[key]
      if (typeof value !== expectedType) {
        error = `Kľúč '${key}' je nesprávneho typu`;
        break;
      }
    } else {
      error = `Neznámi Kľúč '${key}'`;
      break;
    }
  }
  if (error) return { passed: false, error };

  /* TODO? Cell and CellComment keys test */

  /* cellsOrder has no duplicates */
  if (new Set(sheet.cellsOrder).size !== sheet.cellsOrder.length) {
    error = 'Poradie buniek obsahuje duplicitné hodnoty';
  }
  if (error) return { passed: false, error };

  /* cellsOrder contains only existing cell ids */
  for (const id of sheet.cellsOrder) {
    if (!(id in sheet.cells)) {
      error = 'Poradie buniek obsahuje neexistujúce id';
      break;
    }
  }
  if (error) return { passed: false, error };

  return { passed: true }
}