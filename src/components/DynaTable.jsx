import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

function DynaTable({columns, data}) {
  const table = useReactTable({
    data, 
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='w-full overflow-x-auto pb-4'>
      <div className='min-w-[800px] w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl shadow-2xl'>
        <table className='w-full text-left border-collapse'>
          <thead>
            {table.getHeaderGroups().map(headerGroup=>(
              <tr key={headerGroup.id} className='bg-slate-800/80 border-b border-slate-700/50'>
                {headerGroup.headers.map((header)=>(
                  <th key={header.id} className='px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider'>
                    {header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='divide-y divide-slate-800/50'>
            {table.getRowModel().rows.map((row, rowIndex)=>(
              <tr key={rowIndex} className='hover:bg-slate-800/40 transition-colors duration-200'>
                {row.getVisibleCells().map(cell=>(
                  <td key={cell.id} className='px-6 py-4 whitespace-nowrap text-sm text-slate-300'>
                    {["photo", "flag"].includes(cell.column.id) ? (
                      <div className="flex items-center">
                        <img src={cell.getValue()} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-slate-700/50" />
                      </div>
                    ) : (
                      <span className="font-medium text-slate-200">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DynaTable;