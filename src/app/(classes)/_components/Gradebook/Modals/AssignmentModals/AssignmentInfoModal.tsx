import OpenModalButton from "@/app/(_home)/_components/OpenModalComponents/OpenModalButton";
import UpdateAssignmentModal from "./UpdateAssignmentModal";
import DeleteAssignmentModal from "./DeleteAssignmentModal";
import { formatDateShort, typeToString } from "@/app/lib/typeConvertion";
import { Assignment } from "@/app/lib/definitions";
import "../../Gradebook.css";

export default function AssignmentInfoModal({assignment, quarter, courseId}: {assignment: Assignment, quarter: number, courseId: number} ) {
  return (
    <div id="assignInfoCon" className="flex flex-col justify-start items-center gap-1 p-3">
          <h2 className="font-subtitle text-2xl font-bold pb-2">{assignment.name}</h2>
          <h3 className="font-subtitle text-lg"><b>Type:</b> {typeToString(assignment.type)}</h3>
          <h3 className="font-subtitle text-lg"><b>Due Date:</b> {formatDateShort(assignment.dueDate)}</h3>
          <div id='assignButtonsCon'>
            <OpenModalButton
              buttonText={'Edit'}
              modalComponent={<UpdateAssignmentModal assignment={assignment} quarter={quarter} courseId={courseId} />}
              cssClasses={'btn'}
            />
            <OpenModalButton
              buttonText={'Delete'}
              modalComponent={<DeleteAssignmentModal assignment={assignment} quarter={quarter} courseId={courseId} />}
              cssClasses={'btn cancelBtn'}
            />
          </div>
          
      </div>
  );
}