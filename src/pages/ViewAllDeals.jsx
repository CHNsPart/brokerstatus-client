import { useState } from "react";
import DealsSearch from "../components/DealsSearch"
import PipelineDeals from "../components/PipelineDeals"

export default function ViewAllDeals() {
  
  const [searchData, setSearchData] = useState(null);
  
  const handleSearchData = (formData) => {
    setSearchData(formData);
  };
  return (
    <section className="h-full w-full flex flex-col justify-normal items-start gap-2 p-5">
        <DealsSearch onSearch={handleSearchData}/>
        <PipelineDeals allDocs={true} searchData={searchData} />
    </section>
  )
}
