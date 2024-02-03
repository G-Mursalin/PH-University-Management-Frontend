import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import {
  semesterOptions,
  semesterRegistrationYearsOptions,
} from "../../../constants/semester";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";

function CreateAcademicSemester() {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  // Handle Form Submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating Semester...");
    try {
      const semesterData = {
        name: semesterOptions[Number(data?.name) - 1]?.label,
        code: data.name,
        year: data.year,
        startMonth: data.startMonth,
        endMonth: data.endMonth,
      };
      await addAcademicSemester(semesterData).unwrap();
      toast.success("Semester is created", { id: toastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message, { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect
            label="Academic Semester Name"
            name="name"
            options={semesterOptions}
          />
          <PHSelect
            label="Year"
            name="year"
            options={semesterRegistrationYearsOptions}
          />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
}

export default CreateAcademicSemester;
