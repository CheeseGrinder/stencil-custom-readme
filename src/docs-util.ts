export interface ReadmeOptions {
  footer: string;
}

interface ColumnData {
  text: string;
  width: number;
}

interface RowData {
  columns: ColumnData[];
  isHeader?: boolean;
}

export class MarkdownTable {
  private rows: RowData[] = [];

  static new() {
    return new MarkdownTable();
  }

  addHeader(...data: string[]): void {
    this.addRow(data, true);
  }

  addRow(data: string[], isHeader = false) {
    const colData: ColumnData[] = data.map(text => ({
      text: formatText(text),
      width: formatText(text).length,
    }));

    this.rows.push({
      columns: colData,
      isHeader: isHeader,
    });
  }

  toMarkdown(): string[] {
    return createTable(this.rows);
  }
}

function createTable(rows: RowData[]): string[] {
  const content: string[] = [];
  if (rows.length === 0) {
    return content;
  }

  normalizeColumCount(rows);
  normalizeColumnWidth(rows);

  const header = rows.find(row => row.isHeader);
  if (header) {
    const headerRow = createRow(header);
    content.push(headerRow, createBorder(header));
  }
  rows
    .filter(row => !row.isHeader)
    .forEach(row => {
      content.push(createRow(row));
    });

  return content;
}

function formatText(text: string): string {
  return text.replace(/\r?\n/g, '<br> ').replace(/\|/g, '\\|');
}

function normalizeColumCount(rows: RowData[]): void {
  const columnCount = rows.reduce((count, row) => Math.max(count, row.columns.length), 0);

  rows.forEach(row => {
    while (row.columns.length < columnCount) {
      row.columns.push({
        text: '',
        width: 0,
      });
    }
  });
}

function normalizeColumnWidth(rows: RowData[]): void {
  const columnCount = rows[0].columns.length;
  const longestTexts = Array(columnCount)
    .fill('')
    .map((_, idx) => {
      return rows.reduce((length, row) => Math.max(length, row.columns[idx].width), 0);
    });

  rows.forEach((row, rowIdx) => {
    row.columns.forEach((col, colIdx) => {
      rows[rowIdx].columns[colIdx] = {
        text: col.text.padEnd(longestTexts[colIdx], ' '),
        width: longestTexts[colIdx],
      };
    });
  });
}

function createRow(row: RowData): string {
  return row.columns.reduce((text, col) => `${text}${col.text} | `, '| ').trim();
}

function createBorder(row: RowData): string {
  const columns = row.columns.map(
    column =>
      <ColumnData>{
        text: ''.padEnd(column.width, '-'),
        width: column.width,
      },
  );

  return createRow({
    columns,
    isHeader: false,
  });
}
