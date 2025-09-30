import { useParams } from "react-router-dom";

const ProjectManagerTaskDetail = () => {
  const { projectId, taskId } = useParams();

  return (
    <div>
      <h1>Task Detail Page</h1>
      <p>Project ID: {projectId}</p>
      <p>Task ID: {taskId}</p>
    </div>
  );
};

export default ProjectManagerTaskDetail;
