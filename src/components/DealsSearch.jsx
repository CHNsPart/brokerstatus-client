import Button from "./Button"

function DealsSearch() {
  return (
    <div className="w-full p-5">
        <div className="flex flex-col gap-2">
            <span>Deals Search</span>
            <div className="rounded-md border-2 p-5">
                <form action="" className="" >
                    <div className="w-full flex p-5 flex-col md:flex-row lg:flex-row justify-between items-center gap-5">
                    {/* First Col */}
                    <div className="w-full md:w-2/5 flex flex-col gap-2">
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="bdm">BDM</label>
                            <input autoComplete="off" id="bdm" type='text' />
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="mnumber">Mortgage Number / Source App ID</label>
                            <input autoComplete="off" id="mnumber" type='text' />
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="blname">Borrower Last Name</label>
                            <input autoComplete="off" id="blname" type='text' />
                        </div>
                    </div>
                    {/* Second Col */}
                    <div className="w-full md:w-2/5 flex flex-col justify-between gap-2">
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="agent">Agent</label>
                            <input autoComplete="off" id="agent" type='text' />
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <label htmlFor="dtype">Date Type</label>
                            <input autoComplete="off" id="dtype" type='date' />
                        </div>
                        <div className="flex gap-2">
                            <div className="w-full flex justify-between items-center gap-2">
                                <label htmlFor="from">From</label>
                                <input autoComplete="off" id="from" type='text' />
                            </div>
                            <div className="w-full flex justify-between items-center gap-2">
                                <label htmlFor="to">To</label>
                                <input autoComplete="off" id="to" type='text' />
                            </div>
                        </div>
                    </div>
                    {/* Third Col */}
                    <div className="w-full md:w-1/5 flex flex-col gap-2">
                        {/* <div className="w-full h-full"> */}
                        <div className="w-full flex justify-between items-center gap-2">
                            <input autoComplete="off" id="selectAll" type='checkbox' />
                            <label htmlFor="selectAll">Selext All</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input autoComplete="off" id="appReceived" type='checkbox' />
                            <label htmlFor="appReceived">App Received</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input autoComplete="off" id="inUnderwriting" type='checkbox' />
                            <label htmlFor="inUnderwriting">In Underwriting</label>
                        </div>
                        <div className="w-full flex justify-between items-center gap-2">
                            <input autoComplete="off" id="readtToFund" type='checkbox' />
                            <label htmlFor="readtToFund">Ready To Fund</label>
                        </div>
                        {/* </div> */}
                    </div>
                    </div>
                    <div className="w-full flex justify-around items-center gap-2 mt-5">
                        <Button variant={"search"} label={"Clear Search"} />
                        <Button variant={"search"} type={"submit"} label={"Search"} />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default DealsSearch






