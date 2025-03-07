import React from 'react'

const Loading = () => {
  return (
    <div class="flex justify-center items-center gap-2">
    <div class="w-5 h-5 rounded-full animate-pulse bg-zinc-900"></div>
    <div class="w-5 h-5 rounded-full animate-pulse bg-zinc-900"></div>
    <div class="w-5 h-5 rounded-full animate-pulse bg-zinc-900"></div>
</div>
  )
}

export default Loading