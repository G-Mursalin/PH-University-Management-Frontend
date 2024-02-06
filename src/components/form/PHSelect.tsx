import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TPHSelectProps = {
  label: string;
  name: string;
  options: TOption[] | undefined;
  disabled?: boolean;
};

const PHSelect = ({ label, name, options, disabled }: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
