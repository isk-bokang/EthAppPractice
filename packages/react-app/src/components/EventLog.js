
import { formatUnits } from '@ethersproject/units';

const txSet = new Set();

export function TokenTxLogs( { state } ) {
    if(state.status ===  'Success')
      txSet.add(state)
    
    console.log(state)
    console.log(txSet)
    let txList = Array.from(txSet)
    // txList.forEach((tx) => {

    //       console.log(tx.status)
    //       console.log(tx.receipt?.blockHash ?? 'Pending...')
    //       console.log(tx.receipt?.from)
    //       console.log(tx.receipt?.to)
    //       console.log(formatUnits(tx.transaction?.value, 0))
    //       console.log(formatUnits(tx.receipt?.gasUsed, 0))

    // })
    return (
        <div>
            <h4>Event Log</h4>
            <table>

                <th>status</th>
                <th>method</th>
                <th>block hash</th>
                <th>from</th>
                <th>to</th>
                <th>value</th>
                <th>gas fee</th>


                { txList.map((tx) => {
              return (
                <tr>
                  <td>{tx?.status}</td>
                  <td>{tx?.receipt?.events?.at(0).event}</td>
                  <td>{tx?.receipt?.blockHash ?? 'Pending...'}</td>
                  <td>{tx?.receipt?.events?.at(0).args.from}</td>
                  <td>{tx?.receipt?.events?.at(0).args.to}</td>
                  <td>{formatUnits(tx?.receipt?.events?.at(0).args.value, 0)}</td>
                  <td>{formatUnits(tx?.receipt?.gasUsed, 0)}</td>
                </tr>
              )
            })}

            </table>
        </div>
    )
}