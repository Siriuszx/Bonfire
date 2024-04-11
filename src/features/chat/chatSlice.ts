import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/app/store';

type ChatState = {
  selectedChatId: string | null;
};

const initialState: ChatState = {
  selectedChatId: 'johnchat01',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChatId: (state, action: PayloadAction<string>) => {
      state.selectedChatId = action.payload;
    },
    clearSelectedChat: (state) => {
      state.selectedChatId = null;
    },
  },
});

export const { setSelectedChatId, clearSelectedChat } = chatSlice.actions;

export default chatSlice;

export const selectSelectedChatId = (state: RootState) =>
  state.chat.selectedChatId;