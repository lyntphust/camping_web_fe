interface Props {
  width?: number
  height?: number
  className?: string
  show?: boolean
}

export default function LoadingFallback({
  width,
  height,
  className = '',
  show = true,
}: Props) {
  if (!show) {
    return <></>
  }

  if (height && height <= 600) {
    const numberOfLines = height ? Math.round(height / 60) : 1

    return (
      <div
        role="status"
        className={`mx-auto animate-pulse bg-white overflow-hidden ${className}`}
        style={{ width: width ?? '100%', height: height ?? '100%' }}
      >
        {Array.from({ length: numberOfLines }).map((_, index) => (
          <div
            key={index}
            className="h-12 bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl my-3"
          ></div>
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div
      role="status"
      className={`mx-auto animate-pulse bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl overflow-hidden ${className}`}
      style={{ width: width ?? '100%', height: height ?? '100%' }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}
