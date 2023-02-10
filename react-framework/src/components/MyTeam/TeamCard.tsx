import { Link } from "react-router-dom";

interface Iprops {
    teamId: number;
    teamName: string;
    teamImage: string;
    win: number;
    lose: number;
    tier: string;
}

export default function TeamCard({ teamId, teamName, teamImage, win, lose, tier }: Iprops) {
    return (
        <div className="flex mx-30 my-5 justify-between font-inter">
            <div className="flex">
                <div>
                    <img src={teamImage} className="w-53 h-53 rounded-30 my-15 mr-18" />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="mb-10 text-17">{teamName}</h1>
                    <p className="font-extrabold text-17">{win}W {lose}L</p>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <p className="border-b-1 border-black w-52 mb-20 text-12 text-center">{tier}</p>
                <Link to={`/menu/team/${teamId}`} className="bg-blue-700 rounded-20 py-4 text-center text-12 text-white">자세히</Link>
            </div>
        </div>
    )
}