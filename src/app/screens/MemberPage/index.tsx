import React, { useMemo } from "react";
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import "../../../css/member-page.css";
import { VisitOtherPage } from "./visitOtherPage";
import { VisitMyPage } from "./visitMyPage";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage(props: any) {
  /** Initializations */
  let member_page = useRouteMatch();
  const query = useQuery();
  const chosen_mb_id: string | null = query.get("mb_id") ?? null;
  const chosen_art_id: string | null = query.get("art_id") ?? null;
  /** Handlers */

  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member_page.path}/other`}>
          <VisitOtherPage
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>
        <Route path={`${member_page.path}`}>
          <VisitMyPage
            chosen_mb_id={chosen_mb_id}
            chosen_art_id={chosen_art_id}
          />
        </Route>
      </Switch>
    </div>
  );
}
