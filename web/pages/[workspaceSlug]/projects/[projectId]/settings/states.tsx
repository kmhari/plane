import React from "react";

import { useRouter } from "next/router";

import useSWR from "swr";

// store
import { observer } from "mobx-react-lite";
import { useMobxStore } from "lib/mobx/store-provider";
// layouts
import { ProjectAuthorizationWrapper } from "layouts/auth-layout-legacy";
// components
import { ProjectSettingStateList } from "components/states";
import { SettingsSidebar } from "components/project";
// ui
import { BreadcrumbItem, Breadcrumbs } from "components/breadcrumbs";
import { truncateText } from "helpers/string.helper";
// types
import type { NextPage } from "next";

const StatesSettings: NextPage = () => {
  // router
  const router = useRouter();
  const { workspaceSlug, projectId } = router.query;

  // store
  const { project: projectStore } = useMobxStore();

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
            <BreadcrumbItem title="States Settings" unshrinkTitle />
          </Breadcrumbs>
        }
      >
        <div className="flex flex-row gap-2 h-full">
          <div className="w-80 pt-8 overflow-y-hidden flex-shrink-0">
            <SettingsSidebar />
          </div>

          <div className="pr-9 py-8 gap-10 w-full overflow-y-auto">
            <div className="flex items-center py-3.5 border-b border-custom-border-200">
              <h3 className="text-xl font-medium">States</h3>
            </div>

            <ProjectSettingStateList />
          </div>
        </div>
      </ProjectAuthorizationWrapper>
    </>
  );
};

export default observer(StatesSettings);
