import { useState } from "react";
import DealsSearch from "../components/DealsSearch"
import PipelineDeals from "../components/PipelineDeals"
import { pipelineTableData } from "../lib/theme"

function DealsOverview() {

  const [searchData, setSearchData] = useState(null);

  // Callback function to receive form data from DealsSearch
  const handleSearchData = (formData) => {
    setSearchData(formData);
  };
  
  return (
    <section className="h-fit w-full flex flex-col justify-between items-start gap-2 p-5">
        <DealsSearch onSearch={handleSearchData}/>
        <PipelineDeals initialData={pipelineTableData} searchData={searchData} />
    </section>
  )
}

export default DealsOverview
