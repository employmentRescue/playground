interface LevelButtonProps {
  level: any;
  className: any;
  onClick?: any;
}

export default function LevelButton({ className, level, onClick }: LevelButtonProps) {
  return (
    <div>
      <button className={"w-40 h-20 text-10 font-inter text-blue-700 align-middle tracking-tight " + className}>{level}</button>
    </div>
  )
}