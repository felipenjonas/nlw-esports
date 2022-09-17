import { MagnifyingGlassPlus } from "phosphor-react";

interface ButtonCreateAdProps {
    title:string
}

export function ButtonCreateAd(props:ButtonCreateAdProps){
    return (
        <button className='py-3 px-4 bg-violet-500 text-white rounded flex items-center gap-3  hover:bg-violet-700'>
            <MagnifyingGlassPlus size={24} />
            {props.title}
          </button>
    )
}