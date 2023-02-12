

type propsTab = {
    clickedTab: string,
    changeType: () => void;
}

export function AutoMatchTab({ clickedTab, changeType }: propsTab) {

    if (clickedTab === 'LIST') {
        return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div className="w-164 h-50 pt-15 pl-47 {solid} bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal  text-[17px] leading-normal text-left text-[#000]" >
                    자동 매칭
                </span>
            </div>
        )
    }
    else {
        return (
            <div className="w-164 h-50 pt-15 pl-47 border-b-1 border-solid border-[#303eff] bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal  text-[17px] leading-normal text-left text-[#303eff]">
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
            <div className="w-164 h-50 pt-15 pl-66 bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal  text-[17px] leading-normal text-left text-[#000]">
                    목록
                </span>
            </div>
        )
    }
    else {
        return (
            <div className="w-164 h-50 pt-15 pl-66 border-b-1 border-solid border-[#303eff] bg-[#fff]" onClick={(event) => {
                event.preventDefault();
                changeType();
            }}>
                <span className="w-71 h-24 font-normal  text-[17px] leading-normal text-left text-[#303eff]">
                    목록
                </span>
            </div>
        )
    }
}
