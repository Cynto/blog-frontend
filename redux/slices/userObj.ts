import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import UserObj from '../../shared/interfaces/userObj.interface';

const initialState: any = {
  initial: true,
};

export const userObjSlice = createSlice({
  name: 'userObj',
  initialState,
  reducers: {
    setUserObj: (
      state: UserObj | null | {
        initial: boolean;
      },
      action: PayloadAction<UserObj | null>
    ) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUserObj } = userObjSlice.actions;

export default userObjSlice.reducer;
