
import { Skeleton } from '@/components/ui/skeleton'

const NoteSkeleton = () => {
  return (
    <div className='space-y-2'>
    {
        Array.from({ length: 2 }).map((_, index) => (
    <div className="group p-4 rounded-lg border bg-card cursor-pointer transition-all duration-200">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-card-foreground">
            <Skeleton className="h-4 w-3/4 mb-2" />
          </h3>
          <div className="flex items-center gap-4 mt-2">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-24 rounded" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-12 rounded" />
        </div>
      </div>
    </div>
        ))
    }

    </div>

  )
}

export default NoteSkeleton