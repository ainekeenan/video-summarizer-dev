import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatState {
  chat_ids: string[];
}

const initialState: ChatState = {
  chat_ids: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatIds: (state, action: PayloadAction<string[]>) => {
      state.chat_ids = action.payload;
    },
    addChatId: (state, action: PayloadAction<string>) => {
      state.chat_ids.push(action.payload);
    },
    removeChatIds: (state, action: PayloadAction<string>) => {
      state.chat_ids = [];
    },
  },
});

export const { setChatIds, addChatId, removeChatIds } = chatSlice.actions;

export default chatSlice.reducer;
