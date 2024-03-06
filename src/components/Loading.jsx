import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
  return (
    <div className='w-full h-full flex justify-center p-10'>
        <AiOutlineLoading className='animate-spin size-10'/>
    </div>
  )
}
