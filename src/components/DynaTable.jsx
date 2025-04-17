import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';



function DynaTable({columns, data}) {

   

    const table = useReactTable({data, columns,
        getCoreRowModel: getCoreRowModel(),
    })

  return (
    <div className='flex justify-center py-3 '>
      <table className='table-auto w-[80%]'>
        <thead className='text-cyan-500 '>
            {table.getHeaderGroups().map(headerGroup=>(
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header)=>(
                        <th key={header.id}>
                            {header.column.columnDef.header }
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody className=''>
            {table.getRowModel().rows.map((row, rowIndex)=>(
                <tr key={rowIndex} className='border-y- border-sky-600'>
                    {row.getVisibleCells().map(cell=>(
                        <td key={cell.id} className=' py-2 text-center text-indigo-200 '>
                            {["photo", "flag"].includes(cell.column.id) ? (
                    // Verifica si la celda es una URL de imagen y renderízala
                    <img src={cell.getValue()}  className="w-8 h-8 mr-2 rounded-full" />
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext()) // De lo contrario, renderiza el valor por defecto
                  )}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default DynaTable