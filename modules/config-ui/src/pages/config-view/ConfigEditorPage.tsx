import { useParams } from "react-router-dom";

import * as _ from "lodash";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import  ConfigEditor from "./ConfigEditor";



const ConfigEditorPage = () => {
  const { moduleId } = useParams();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigEditor moduleId={moduleId}></ConfigEditor>
    </QueryClientProvider>
  );
};

export default ConfigEditorPage as React.FC;
