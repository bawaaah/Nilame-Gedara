import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    auth: {
        email: '',
        active : false
    },
    setEmail : (Email) => set((state) => ({ auth: { ...state.auth, email : Email }}))
}));