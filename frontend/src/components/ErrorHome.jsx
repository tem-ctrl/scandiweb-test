const ErrorHome = ({ message }) => {
  return (
    <main className="main home home-error">
      <h2 className='home-empty-title'>An error occured !</h2>
      <p>{message}</p>
    </main>
  )
}

export default ErrorHome
