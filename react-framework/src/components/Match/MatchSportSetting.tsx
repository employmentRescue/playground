import basketballOriginal from "@/assets/icons/basketball-original.png"
import badmintonOriginal from "@/assets/icons/badminton-original.png"
import footBallOriginal from "@/assets/icons/football-original.png"

type sportIcon = {
    border: string,
    img: string
}

export function MatchFilterSport({ sportIcon, isClicked }: { sportIcon: sportIcon, isClicked: () => void }) {
    return (
        <div className={"w-40 h-40 grow-0 mr-11 pt-8 pl-8 border-solid border-[2.5px] rounded-20 " + sportIcon.border}
            onClick={(event) => {
                event.preventDefault();
                isClicked();
            }}>
            <img src={sportIcon.img} className="w-20 h-20 grow-0" />
        </div>
    )
}

// 자동 매칭 필터바 - 종목
export function MatchSportSetting({ sportType, onChangeMode }: { sportType: string, onChangeMode: (type: string) => void }) {
    const basketballBorder = () => { return (sportType === '농구' ? "border-[#efad45]" : "border-[#fde9b4]") }
    const footBallBorder = () => { return (sportType === '축구' ? "border-[#9C8DD3]" : "border-[#d8caff]") }
    const badmintonBorder = () => { return (sportType === '배드민턴' ? "border-[#71D354]" : "border-[#c4ffb6]") }

    return (
        <div className="flex-col absolute top-50 left-[-11px] w-60 h-[157px] m-0 pt-7 px-10 rounded-15 border-solid border-1 border-[#303EFF]/50 bg-[#f1f3ff] z-10">
            <div className={"w-40 h-40 grow-0 mr-11 mb-10 pt-8 pl-8  rounded-20 bg-[#fde9b4] border-solid border-[2.5px] " + basketballBorder()}
                onClick={(event) => {
                    event.preventDefault();
                    onChangeMode("BASKETBALL");

                }}>
                <img src={basketballOriginal} className="w-20 h-20 grow-0" />
            </div>
            <div className={"w-40 h-40 grow-0 mr-11 mb-10 pt-8 pl-8 rounded-20 bg-[#d8caff] border-solid border-[2.5px] " + footBallBorder()}
                onClick={(event) => {
                    event.preventDefault();
                    onChangeMode("footBall");
                }}>
                <img src={footBallOriginal} className="w-20 h-20 grow-0" />
            </div>
            <div className={"w-40 h-40 grow-0 mr-11 mb-10 pt-8 pl-8 rounded-20 bg-[#c4ffb6] border-solid border-[2.5px] " + badmintonBorder()}
                onClick={(event) => {
                    event.preventDefault();
                    onChangeMode("BADMINTON");
                }}>
                <img src={badmintonOriginal} className="w-20 h-20 grow-0" />
            </div>
        </div>
    )
}