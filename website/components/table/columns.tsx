import type { TableSchema } from "@fairspec/metadata"
import { getColumns } from "@fairspec/metadata"
import type { ColumnDef } from "@tanstack/react-table"
import { formatCell } from "./formatters.tsx"

export function createColumnDefs(schema: TableSchema): ColumnDef<Record<string, any>>[] {
  const columns = getColumns(schema)

  return columns.map(column => {
    const isPrimaryKey = schema.primaryKey?.includes(column.name)

    return {
      accessorKey: column.name,
      header: () => (
        <div className={isPrimaryKey ? "font-bold" : ""}>
          {column.property.title ?? column.name}
          {column.required && <span className="text-red-500 ml-1">*</span>}
        </div>
      ),
      cell: ({ getValue }) => (
        <div className={isPrimaryKey ? "font-medium" : ""}>
          {formatCell(getValue(), column, schema.missingValues)}
        </div>
      ),
    }
  })
}
