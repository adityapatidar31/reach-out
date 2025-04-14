import { User, userSchema } from "@/schema/schema";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const parsed = userSchema.safeParse(action.payload);
      if (parsed.success) {
        const user = parsed.data;
        state.user = {
          ...user,
        };
      } else {
        console.error("Invalid user payload", parsed.error);
      }
    },
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
