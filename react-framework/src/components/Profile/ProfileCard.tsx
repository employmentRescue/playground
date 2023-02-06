interface ClassNameProps {
  className: string;
  imageSrc: string;
  imageSize: string;
  onClick?: any;
  teamName?: string;
  nickname: string;
  rating?: string;
}

export default function ProfileCard({ className, imageSrc, imageSize, teamName, nickname, rating, onClick }: ClassNameProps) {
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <img src={imageSrc} className={imageSize + " self-center"} />
      <div className="flex flex-col ml-25 my-15 h-35 justify-center w-full place-self-start">
        <h1 className="text-16 font-bold mb-5">{teamName}</h1>
        <h2 className="text-15 text-[#858e94]">{nickname}</h2>
      </div>
      <div className="bg-[#cb7537] w-auto h-18 rounded-10 mt-8 text-11 mr-10">
        <p className="mt-1 mx-5 text-11 text-white font-inter text-center tracking-tight">{rating}</p>
      </div>
    </div>
  )
}