export default function Loading() {
  return (
    <div className="max-w-[960px] mx-auto w-full px-4 py-4 animate-pulse">
      {/* InfoProduct skeleton */}
      <div>
        <div className="h-10 bg-gray-300 rounded w-2/3 mb-4" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-6" />

        <div className="w-full h-[619px] bg-gray-300 rounded mb-4" />

        <div className="h-4 bg-gray-300 rounded w-1/4 mb-3" />
        <div className="h-4 bg-gray-300 rounded w-full mb-2" />
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-6" />

        <div className="flex gap-4">
          <div className="h-10 w-32 bg-gray-300 rounded" />
          <div className="h-10 w-40 bg-gray-300 rounded" />
        </div>
      </div>

      {/* ReviewProduct skeleton */}
      <div className="mt-10">
        <div className="h-12 bg-gray-300 rounded w-24 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-32 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-40 mb-6" />

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full" />
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
