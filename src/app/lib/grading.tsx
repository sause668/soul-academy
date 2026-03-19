import { Assignment, Grade, GradeData, Rubric, PriorityStudent, Course, Student } from "./definitions";

const rubric: Rubric = {
    HW: 1,
    CW: 1,
    Q: 2,
    T: 3,
    P: 3
  }

  const calcType = (grades: GradeData[], type: string) => {
    const typeGrades = grades.filter(g => g.type == type).map(g => g.grade)
    
    if (typeGrades.length <= 0) return null;
    
    const totalGrade = typeGrades.reduce((sum, grade) => sum + grade, 0) / typeGrades.length
    const weight = rubric[type as keyof Rubric]
    return {
        weight,
        grade: totalGrade * weight
    }
  }

  const calcFinalGrade = (grades: GradeData[]) => {
    const classwork = calcType(grades, 'CW')
    const homework = calcType(grades, 'HW')
    const quiz = calcType(grades, 'Q')
    const test = calcType(grades, 'T')
    const project = calcType(grades, 'P')

    const gradeArr = [classwork, homework, quiz, test, project]

    const totalGrade = gradeArr.reduce((sum, grade) => {
        return (grade) ? sum + grade.grade: sum + 0
    }, 0)
    const totalWeight = gradeArr.reduce((sum, grade) => {
        return (grade) ? sum + grade.weight: sum + 0
    }, 0)

    if (totalWeight == 0) return 'N/A'

    return Math.round(totalGrade / totalWeight)  
  }

  export const calcFinalGradeStudent = (assignments: Assignment[]) => {
    const grades = assignments.map(assignment => {
      return {
        grade: assignment.grade, 
        type: assignment.type
      } as GradeData
    })
    
    return calcFinalGrade(grades)
  }

  export const calcFinalGradeTeacher = (assignments: Assignment[], studentId: number) => {
    const grades: GradeData[] = [];
    assignments.forEach(assignment => {
        const grade = assignment.grades?.find((grade) => {
            return grade.studentId == studentId
          })
        
        if (grade) grades.push({
            grade: grade.grade, 
            type: assignment.type
        })
    })
    
    return calcFinalGrade(grades)
  }

export const calcLetterGrade = (grade: number) => {
    if (grade >= 92) return 'A';
    if (grade >= 83) return 'B';
    if (grade >= 72) return 'C';
    if (grade >= 65) return 'D';
    return 'F';
}


export const sortStudents = (student1: Student, student2: Student) => {
    if (student1.lastName && student2.lastName && student1.lastName > student2.lastName) return 1;
    if (student1.lastName && student2.lastName && student1.lastName < student2.lastName) return -1;
    if (student1.firstName && student2.firstName && student1.firstName > student2.firstName) return 1;
    if (student1.firstName && student2.firstName && student1.firstName < student2.firstName) return -1;
    return 0;
}

export const sortAssignments = (assign1: Assignment, assign2: Assignment) => {
    const date1 = new Date(assign1.dueDate).toISOString().slice(0, 10);
    const date2 = new Date(assign2.dueDate).toISOString().slice(0, 10);
    return date1 > date2 ? 1:-1;
}

export const calcBehaviorGrade = (att: number, learn: number, coop: number) => {
  const total = att + learn * 1.5 + coop / 2
  return total / 3
}

export const convertBehaviorGrade = (grade: number) => {
  switch (grade) {
    case 1:
      return 'Poor';
    case 2:
      return 'Lacking';
    case 3:
      return 'Average';
    case 4:
      return 'Good';
    case 5:
      return 'Excellent';
    default:
      return 'N/A';
  }
}

export const convertBehaviorPriorityGrade = (grade: number) => {
  const roundedGrade = Math.round(grade);
  switch (roundedGrade) {
    case 1:
      return 'At Risk';
    case 2:
      return 'Struggling';
    case 3:
      return 'On Par';
    case 4:
      return 'Doing Well';
    case 5:
      return 'Accelerate';
    default:
      return 'N/A';
  }
}

export const convertBehaviorGradeColor = (grade: string) => {
  switch (grade) {
    case 'Poor':
      return 'Poor';
    case 'Lacking':
      return 'Lacking';
    case 'Average':
      return 'Average';
    case 'Good':
      return 'Good';
    case 'Excellent':
      return 'Excellent';
    default:
      return 'N/A';
  }
}

export const convertBehaviorPriorityGradeColor = (grade: string) => {
  switch (grade) {
    case 'At Risk':
      return 'atRisk';
    case 'Struggling':
      return 'struggling';
    case 'On Par':
      return 'onPar';
    case 'Doing Well':
      return 'doingWell';
    case 'Accelerate':
      return 'accelerate';
    default:
      return 'N/A';
  }
}

export const getPriorityStudents = (classes: Course[]) => {
  if (classes != undefined && classes.length > 0 && classes[0]?.behaviors && classes[0]?.behaviors.length > 0) return { highlightStudents: [], focusStudents: [] };
  const highlightStudents: PriorityStudent[] = [];
  const focusStudents: PriorityStudent[] = [];

  classes.map((class_) => class_?.behaviors?.map((behavior) => {
    const studentPriorityNumber = calcBehaviorGrade(behavior.attention, behavior.learnability, behavior.cooperation);
    const studentPriority = convertBehaviorPriorityGrade(studentPriorityNumber);
    let studentIndex = 0;

    while (studentIndex < 2) {
      if (behavior.student && (highlightStudents[studentIndex] === undefined || studentPriorityNumber >= highlightStudents[studentIndex].priorityNumber)) {
        highlightStudents.splice(studentIndex, 0, {
          id: behavior.student.id,
          firstName: behavior.student.firstName ?? '',
          lastName: behavior.student.lastName ?? '',
          priorityNumber: studentPriorityNumber,
          priority: studentPriority,
        });
        if (highlightStudents.length > 3) highlightStudents.pop();
        break;
      } else if (behavior.student && (focusStudents[studentIndex] === undefined || studentPriorityNumber <= focusStudents[studentIndex].priorityNumber)) {
        focusStudents.splice(studentIndex, 0, {
          id: behavior.student.id,
          firstName: behavior.student.firstName ?? '',
          lastName: behavior.student.lastName ?? '',
          priorityNumber: studentPriorityNumber,
          priority: studentPriority,
        });
        if (focusStudents.length > 3) focusStudents.pop();
        break;
      }
      studentIndex++;
    }
  }));

  return { highlightStudents, focusStudents };
}