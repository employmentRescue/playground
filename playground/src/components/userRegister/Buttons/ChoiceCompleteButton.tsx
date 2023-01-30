interface TimeSetProps {
    timeSet: () => void;
}

export default function ChoiceCompoleteButton({ timeSet }: TimeSetProps) {
    return (
        <div className="flex justify-center">
            <button onClick={(e) => timeSet()} className="w-[300px] h-38 rounded-5 bg-blue-700 text-15 mb-32 text-white">선택 완료</button>
        </div>
    )
}