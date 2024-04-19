type HeaderProps = {
  text:string
}

export default function Header({text}:HeaderProps) {
  return (
    <header className="Header">{text}</header>
  )
}
