
export const NotFound = ({ message }) => {
  return (
    <div className="pt-16 flex flex-col justify-center items-center">
      <h1 className="text-9xl font-bold tracking-wide">404</h1>
      <span className="text-2xl">{message}</span>
    </div>
  )
}
