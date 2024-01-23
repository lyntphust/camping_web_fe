import LoadingFallback from '@/components/LoadingFallback'

export default function Loading() {
  return (
    <div role="status" className="w-full h-screen">
      <LoadingFallback />
    </div>
  )
}
