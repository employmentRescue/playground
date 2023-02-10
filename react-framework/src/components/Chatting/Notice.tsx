interface NoticeProps {
    title: string
    content: string
}

export default function Notice({ title, content }: NoticeProps) {
    return (
        <div className="w-full bg-[#f1f3ff] border-b-1 border-[#bbc0ff] my-6 pl-32 py-22">
            <h1 className="font-inter text-15 font-semibold">
                {title}
            </h1>
            <p className="font-inter text-12 text-[#717070]">
                {content}
            </p>
        </div>
    )
}