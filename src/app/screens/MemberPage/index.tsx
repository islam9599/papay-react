import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Container } from "@mui/material";
import "../../../css/member-page.css";

import { VisitOtherPage } from "./visitOtherPage";
import { VisitMyPage } from "./visitMyPage";

export function MemberPage(props: any) {
  /** Initializations */
  const verifiedMemberdata = props.verifiedMemberdata;
  /** Handlers */
  let member_page = useRouteMatch();
  return (
    <div className="member_page">
      <Switch>
        <Route path={`${member_page.path}/other`}>
          <VisitOtherPage verifiedMemberdata={verifiedMemberdata} />
        </Route>
        <Route path={`${member_page.path}`}>
          <VisitMyPage verifiedMemberdata={verifiedMemberdata} />
        </Route>
      </Switch>
    </div>
  );
}
