import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

// mobx store
import { useMobxStore } from "lib/mobx/store-provider";
// hooks
import useProjectDetails from "hooks/use-project-details";
// components
import { SpreadsheetView } from "components/core";
import { IssuePeekOverview } from "components/issues";
// types
import { IIssue, IIssueDisplayFilterOptions } from "types";

export const ProjectSpreadsheetLayout: React.FC = observer(() => {
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  const { projectDetails } = useProjectDetails();

  const { issue: issueStore, issueFilter: issueFilterStore } = useMobxStore();

  const issues = issueStore.getIssues;

  const handleDisplayFiltersUpdate = useCallback(
    (updatedDisplayFilter: Partial<IIssueDisplayFilterOptions>) => {
      if (!workspaceSlug || !projectId) return;

      issueFilterStore.updateUserFilters(workspaceSlug.toString(), projectId.toString(), {
        display_filters: {
          ...updatedDisplayFilter,
        },
      });
    },
    [issueFilterStore, projectId, workspaceSlug]
  );

  const updateIssue = (group_by: string | null, sub_group_by: string | null, issue: IIssue) => {
    issueStore.updateIssueStructure(group_by, sub_group_by, issue);
  };

  const isAllowed = projectDetails?.member_role === 20 || projectDetails?.member_role === 15;

  return (
    <>
      <IssuePeekOverview
        projectId={projectId?.toString() ?? ""}
        workspaceSlug={workspaceSlug?.toString() ?? ""}
        readOnly={!isAllowed}
      />
      <SpreadsheetView
        displayProperties={issueFilterStore.userDisplayProperties}
        displayFilters={issueFilterStore.userDisplayFilters}
        handleDisplayFilterUpdate={handleDisplayFiltersUpdate}
        issues={issues as IIssue[]}
        handleIssueAction={() => {}}
        handleUpdateIssue={() => {}}
        disableUserActions={false}
      />
    </>
  );
});
