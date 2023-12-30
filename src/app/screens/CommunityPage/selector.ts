import { createSelector } from "reselect";
import { AppRootState } from "../../../types/screen";

const selectCommunityPage = (state: AppRootState) => state.communityPage;

export const retrieveTargetboArticles = createSelector(
  selectCommunityPage,
  (CommunityPage) => CommunityPage.targetboArticles
);
