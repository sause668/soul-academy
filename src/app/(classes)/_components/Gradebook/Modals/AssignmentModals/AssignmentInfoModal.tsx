import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import UpdateAssignmentModal from "./UpdateAssignmentModal";
import DeleteAssignmentModal from "./DeleteAssignmentModal";
import { formatDateShort, typeToString } from "@/app/lib/typeConvertion";
import { Assignment } from "@/app/lib/definitions";
import "../../Gradebook.css";

export default function AssignmentInfoModal({assignment, quarter, courseId}: {assignment: Assignment, quarter: number, courseId: number} ) {
  return (
    <div id="assignInfoCon">
          <h2>{assignment.name}</h2>
          <h3>Type: {typeToString(assignment.type)}</h3>
          <h3>Due Date: {formatDateShort(assignment.dueDate)}</h3>
          <div id='assignButtonsCon'>
            <OpenModalButton
              buttonText={'Edit'}
              modalComponent={<UpdateAssignmentModal assignment={assignment} quarter={quarter} courseId={courseId} />}
            />
            <OpenModalButton
              buttonText={'Delete'}
              modalComponent={<DeleteAssignmentModal assignment={assignment} quarter={quarter} courseId={courseId} />}
            />
          </div>
          
      </div>
  );
}