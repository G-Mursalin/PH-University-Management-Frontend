import { useGetAllAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi";

function AcademicSemester() {
  const { data, isLoading } = useGetAllAcademicSemesterQuery(undefined);

  console.log(data);
  return <div>AcademicSemester </div>;
}

export default AcademicSemester;
