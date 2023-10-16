import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

// store
import { observer } from "mobx-react-lite";
import { useMobxStore } from "lib/mobx/store-provider";
// layouts
import { ProjectAuthorizationWrapper } from "layouts/auth-layout-legacy";
// components
import { ProjectSettingsLabelList } from "components/labels";
import { SettingsSidebar } from "components/project";
// ui
import { BreadcrumbItem, Breadcrumbs } from "components/breadcrumbs";
// types
import type { NextPage } from "next";
// helper
import { truncateText } from "helpers/string.helper";

const LabelsSettings: NextPage = () => {
  // router
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  // store
  const { project: projectStore } = useMobxStore();

  // api call to fetch project details
  useSWR(
    workspaceSlug && projectId ? "PROJECT_DETAILS" : null,
    workspaceSlug && projectId
      ? () => projectStore.fetchProjectDetails(workspaceSlug.toString(), projectId.toString())
      : null
  );

  // derived values
  const projectDetails = projectStore.project_details[projectId?.toString()!] ?? null;

  return (
    <>
      <ProjectAuthorizationWrapper
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbItem
              title={`${truncateText(projectDetails?.name ?? "Project", 32)}`}
              link={`/${workspaceSlug}/projects/${projectDetails?.id}/issues`}
              linkTruncate
            />
            <BreadcrumbItem title="Labels Settings" unshrinkTitle />
          </Breadcrumbs>
        }
      >
        <div className="flex flex-row gap-2 h-full">
          <div className="w-80 pt-8 overflow-y-hidden flex-shrink-0">
            <SettingsSidebar />
          </div>
          <ProjectSettingsLabelList />
        </div>
      </ProjectAuthorizationWrapper>
    </>
  );
};

export default observer(LabelsSettings);
