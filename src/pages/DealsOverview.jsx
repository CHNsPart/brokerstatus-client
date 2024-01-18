import DealsSearch from "../components/DealsSearch"
import PipelineDeals from "../components/PipelineDeals"

function DealsOverview() {
    // Example data from the backend
    const initialData = {
      columns: [
        'Broker',
        'BDM',
        'Status',
        'Mortgage #',
        'Purpose',
        'Borrower Name',
        'App Date',
        'Closing Date',
        'Amount',
        'Condition',
        'Actions', // 11th column for rounded action buttons
      ],
      rows: [
        ['--', '--', 'Approved', '1714935', 'Purchased', 'Test Borrower', '16/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714936', 'Purchased', 'Test Borrower', '17/11/2023', '22/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714937', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714938', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$206', '5/10'],
        ['--', '--', 'Approved', '1714939', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714910', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714921', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714911', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714936', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714930', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714958', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
        ['--', '--', 'Approved', '1714995', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],    ],
    };
  return (
    <section className="h-fit w-full flex flex-col justify-between items-start gap-2 p-5">
        <DealsSearch/>
        <PipelineDeals initialData={initialData} />
    </section>
  )
}

export default DealsOverview