import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  value: string;
  setValue: (type: string) => void;
  selections: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
};

export const SingleSelect = (props: Props) => {
  return (
    <Select value={props.value} onValueChange={props.setValue}>
      <SelectTrigger className="min-w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {props.selections.map((item, index) => (
          <SelectItem key={index} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
