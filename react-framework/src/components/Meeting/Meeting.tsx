interface meetingProps {
    date: string;
    place: string;
    time: string;
    people: string;
}

export default function Meeting(props: meetingProps) {
    return (
        <div className="w-[331px] h-55 rouned-15 flex">
            <div></div>
            <div className="flex justify-between">
                <div className="flex flex-col justify-between">
                    <div>
                        {props.date}
                    </div>
                    <div>
                        {props.place}
                    </div>
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        {props.time}
                    </div>
                    <div>
                        {props.people}
                    </div>
                </div>
            </div>
        </div>
    )
}