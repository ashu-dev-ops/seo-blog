import { create } from 'zustand'

export const useBlogsVisitorStore = create((set) => ({
  blogOwnerId: 0,
  setBlogOwnerId: (id:any) => set((state:any) => ({ blogOwnerId: id })),
}))
