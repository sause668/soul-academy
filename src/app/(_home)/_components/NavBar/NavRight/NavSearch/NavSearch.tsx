import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { User, Student } from "@/app/lib/definitions";
import { getStudentsSearchData } from "@/app/(students)/_actions/student-actions";
import { useModal } from "@/app/(_home)/_context/Modal";

export default function NavSearch({ user }: { user: User }) {
  const { closeModal } = useModal();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchDelayRef = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    // Clear existing timeout
    if (searchDelayRef.current) {
      clearTimeout(searchDelayRef.current);
    }

    if (value.trim()) {
      // Set new timeout for debounced search
      searchDelayRef.current = setTimeout(async () => {
        const studentData = await getStudentsSearchData(value);
        if (studentData instanceof Error) {
          console.error(studentData);
        } else {
          setStudents(studentData);
          setShowResults(true);
        }
      }, 300);
    } else {
      setShowResults(false);
    }
  };

  const handleStudentClick = (studentId: number | undefined) => {
    if (!studentId) return;
    router.push(`/students/${studentId}`);
    setSearch('');
    setShowResults(false);
    closeModal();
  };

  const handleFocus = () => {
    if (search.trim()) {
      setShowResults(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      if (searchDelayRef.current) {
        clearTimeout(searchDelayRef.current);
      }
    };
  }, []);

  return (
    // <div className="max-2xs:hidden">
      <div className="relative" ref={searchRef}>
        <div className="flex items-center bg-white rounded-[20px] py-2 px-4 gap-2 min-w-[250px] max-[450px]:min-w-[150px]">
          <IoSearch className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            className="border-none outline-none bg-transparent text-gray-700 text-sm flex-1 placeholder:text-gray-400"
            placeholder="Search students..."
            value={search}
            onChange={handleSearch}
            onFocus={handleFocus}
          />
        </div>
        {showResults && students && students.length > 0 && (
          <div
            className="absolute top-full mt-2 right-0 min-w-[300px] max-w-[400px] max-h-[400px] overflow-y-auto z-50 rounded-md bg-white shadow-lg border border-gray-200 max-[450px]:min-w-[250px] max-[450px]:max-w-[300px] max-[450px]:-right-4"
            ref={resultsRef}
          >
            {students.slice(0, 10).map((student) => (
              <div
                key={student.id}
                className="group py-3 px-4 cursor-pointer transition-colors duration-200 border-b border-gray-200 last:border-b-0 hover:bg-[#007AFF] hover:text-white"
                onClick={() => handleStudentClick(student.id)}
              >
                <div className="text-black font-medium text-[0.95rem] group-hover:text-white/90">
                  {student.firstName} {student.lastName}
                </div>
                <div className="text-[0.85rem] text-gray-600 mt-1 group-hover:text-white/90">
                  Grade {student.currentGrade}
                </div>
              </div>
            ))}
            {students.length > 10 && (
              <div className="py-2 px-4 text-center text-[0.85rem] text-gray-600 italic">
                {students.length - 10} more results...
              </div>
            )}
          </div>
        )}
        {showResults && search.trim() && students && students.length === 0 && (
          <div
            className="absolute top-full mt-2 right-0 min-w-[300px] max-w-[400px] max-h-[400px] overflow-y-auto z-50 rounded-md bg-white shadow-lg border border-gray-200 max-[450px]:min-w-[250px] max-[450px]:max-w-[300px] max-[450px]:-right-4"
            ref={resultsRef}
          >
            <div className="py-3 px-4 cursor-pointer transition-colors duration-200 border-b border-gray-200 last:border-b-0">
              No students found
            </div>
          </div>
        )}
      </div>
    // </div>
  );
}
