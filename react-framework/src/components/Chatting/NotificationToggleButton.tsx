interface Iprops {
  notiTogggle: boolean;
  setNotiTogggle: any;
}

export default function NotificationToggleButton({ notiTogggle, setNotiTogggle }: Iprops) {

  const handleOnClick = () => {
    setNotiTogggle(!notiTogggle)
  }

  return (
    <div className={"flex flex-col w-32 h-18 rounded-16 self-center " + (notiTogggle ? "bg-blue-200" : "bg-blue-700")} onClick={handleOnClick}>
      <div className={"m-2 bg-white w-14 h-14 rounded-18 " + (notiTogggle ? "flex self-start" : "flex self-end")} ></div>
    </div>
  )
}