import filterEtc from "@/assets/icons/filter-etc.png"


// 자동 매칭 필터바 - 기타
export function MatchFilterEtc({ shutOtherWindow }: { shutOtherWindow: ()=>void }) {
    return (
        <div className=" w-25 h-25 flex-grow-0 mt-7 pt-3 pl-3 rounded-5 bg-[#303eff]" onClick={(e)=>{ e.preventDefault(); shutOtherWindow(); }}>
            <img src={filterEtc} alt="" className="w-20 h-20 flex-grow-0" />
        </div>
    )
}