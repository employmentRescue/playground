

type Iprops = {
    width: number,
    text: string,
    selected: boolean,
}

export default function EtcTypeButton({ width, text, selected }: Iprops) {
    const textColor = () => {
        if (selected) {
            return "[#fff]"
        } else {
            return "[#303eff]"
        }
    }
    return (
        <div className={"grid place-content-center h-25 m-5 rounded-[5px] border-1 border-solid border-[#303eff] w-" + String(width) + selected && " bg-[#303eff]"}>
            <span className={" text-[12px] font-[500] text-" + textColor}>{text}</span>
        </div>
    )
}