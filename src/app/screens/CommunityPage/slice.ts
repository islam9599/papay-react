import { createSlice } from "@reduxjs/toolkit";
import { CommunityPageState } from "../../../types/screen";

const initialState: CommunityPageState = {
  targetboArticles: [],
};

const CommunityPageSlice = createSlice({
  name: "communityPage",
  initialState,
  reducers: {
    setTargetboArticles: (state, action) => {
      state.targetboArticles = action.payload;
    },
  },
});

export const { setTargetboArticles } = CommunityPageSlice.actions;

const CommunityPageReducer = CommunityPageSlice.reducer;
export default CommunityPageReducer;
