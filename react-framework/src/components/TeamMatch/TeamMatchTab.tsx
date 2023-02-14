

type propsTab = {
    clickedTab: string,
    changeType: () => void;
}

export function AutoMatchTab({ clickedTab, changeType }: propsTab) {

    if (clickedTab === 'LIST') {
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div className="flex flex-col items-center w-[40%] h-50 mx-10 pt-15 bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal text-[17px] leading-normal text-center text-[#000]" >
                    자동 매칭
                </span>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center w-[40%] h-50 pt-15 mx-10 border-b-1 border-solid border-[#303eff] bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal text-[17px] leading-normal text-center text-[#303eff]">
                    자동 매칭
                </span>
            </div>
        )
    }
}

// 목록 텝
export function ListTab({ clickedTab, changeType }: propsTab) {
    if (clickedTab === 'AUTOMATCH') {
        return (
            <div className="flex flex-col items-center w-[40%] h-50 pt-15 mx-10 bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal text-[17px] leading-normal text-center text-[#000]">
                    목록
                </span>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col items-center w-[40%] h-50 pt-15 mx-10 border-b-1 border-solid border-[#303eff] bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal text-[17px] leading-normal text-center text-[#303eff]">
                    목록
                </span>
            </div>
        )
    }
}
