

type Iprops = {
    width: number,
    text: string,
    selected: string,
    setData: (data:any)=>void,
}

export default function EtcTypeButton ({width, text, selected, setData}:Iprops) {
    const bgColor = ()=>{
        if (selected === text) {
            return " bg-[#303eff]"
        } else {
            return ""
        }
    }
    const textColor = ()=>{
        if (selected === text) {
            return "[#fff]"
        } else {
            return "[#303eff]"
        }
    }
    return (
        <div className={"grid place-content-center h-25 m-5 rounded-[5px] border-1 border-solid border-[#303eff] w-" + String(width) + bgColor()} onClick={(e)=>{e.preventDefault(); setData(text)}}>
            <span className={"font-inter text-[12px] font-medium text-" + textColor()}>{text}</span>
        </div>
    )
}