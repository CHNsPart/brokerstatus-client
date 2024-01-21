import DealsSearch from "../components/DealsSearch"
import PipelineDeals from "../components/PipelineDeals"
import { pipelineTableData } from "../lib/theme"

function DealsOverview() {

  return (
    <section className="h-fit w-full flex flex-col justify-between items-start gap-2 p-5">
        <DealsSearch/>
        <PipelineDeals initialData={pipelineTableData} />
    </section>
  )
}

export default DealsOverview