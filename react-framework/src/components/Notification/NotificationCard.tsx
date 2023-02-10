export interface NotificationCardType {
    imgSrc: string;
    title: string;
    content: string;
    isLatest?: boolean;
    elapsedTime: any; // 경과시간
    noticeCount?: number;
}

export default function NotificationCard({ imgSrc, title, content, isLatest, elapsedTime, noticeCount }: NotificationCardType) {
    return (
        <div className={"flex font-inter tracking-tight text-10 justify-between " + (isLatest && "bg-[#f1f3ff]")}>
            <div className="flex">
                <img src={imgSrc} className="w-12 h-12 ml-12 mr-7 my-18" />
                <div className="flex flex-col text-13 tracking-tight my-15">
                    <h1 className="text-[#858e94]">{title}</h1>
                    <p className="text-14 font-bold w-[190px] overflow-hidden overflow-ellipsis whitespace-nowrap break-all">{content}</p>
                </div>
            </div>
            <div className="text-end">
                <div className="flex justify-end my-15 ml-4 mr-12 text-[#858e94] w-50">
                    {isLatest && <div className="mt-3 mr-3 bg-[#ff2323] w-7 h-7 rounded-4"></div>}
                    {elapsedTime}
                </div>
            </div>
        </div>
    )
}