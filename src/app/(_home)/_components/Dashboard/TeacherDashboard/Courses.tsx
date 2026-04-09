import { Course } from "@/app/lib/definitions";
import { FiEdit, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import OpenModalButton from "../../OpenModalComponents/OpenModalButton";
import "@/app/(_home)/_components/Dashboard/Dashboard.css";

export default function Courses({ courses }: { courses: Course[] }) {
    const router = useRouter();
    const classHeaders = [
        {
          header: 'Grade',
          key: 'grade',
        },
        {
          header: 'Class',
          key: 'name',
        },
        {
          header: 'Period',
          key: 'period',
        },
        {
          header: 'Room',
          key: 'room',
        },
        {
          header: 'Students',
          key: 'num_students',
        },
      ]
    const classBodyKeys = [
      'grade',
      'name',
      'period',
      'room',
      'studentCount',
    ]
    return (
        <div id="classesConDB" className="whiteBox flex flex-col justify-flex-start items-flex-start ">
              <div id="classTitleConDB" className="flex justify-between items-center p-2 bg-blue-500 text-white rounded-t-lg">
                <h3 id="classTitleDB" className="text-xl font-subtitle font-bold">Current Classes</h3>
                {/* <OpenModalButton
                  buttonText={<FiPlus className="text-2xl" />}
                  modalComponent={<CreateClassModal />}
                  cssClasses={'newClassButtonDB text-2xl m-0 p-1 bg-blue-500 text-white rounded-full hover:bg-white hover:text-blue-500 hover:border-blue-500 transition-colors duration-300'}
                /> */}
              </div>
              <div id="classTableConDB" className="w-full">
                <table id="classTableDB font-body" className="w-full">
                  <thead>
                    <tr className="bg-gray-200 text-black border-b border-gray-300">
                      {classHeaders.map((header, index) => (
                        <th className={`classTableHeaderDB${index} py-1`} key={`classTableHeaderT${index}`}>{header.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr 
                      key={`courseRowT${index}`} 
                      className={`${index < courses.length - 1 ? 'border-b border-gray-300' : ''} hover:bg-blue-100 transition-colors duration-300 cursor-pointer`}
                      onClick={()=>router.push(`/courses/${course.id}`)}
                      >
                        {classBodyKeys.map((key, index) => (
                          <td className={`classTableCellDB text-center py-2`} key={`classTableCellT${index}`}>{course[key as keyof Course] as string}{key === 'grade' && 'th'}</td>
                        ))}
                        {/* <td id="classTableCellDB">{course.name}</td>
                        <td id="classTableCellDB">{course.period}</td>
                        <td id="classTableCellDB">{course.room}</td>
                        <td id="classTableCellDB">{course.studentCount}</td> */}
                        {/* <td id="classTableCellDB">
                          <OpenModalButton
                            buttonText={<FiEdit />}
                            modalComponent={<EditClassModal classEdit={class_} />}
                            cssClasses={'classButtonDB editDB text-2xl m-0 p-1 bg-blue-500 text-white rounded-full'}
                          />
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
    );
}