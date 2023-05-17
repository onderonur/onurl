import FormControlProvider, {
  FormControlContextValue,
} from './form-control-context';

type FormControlProps = React.PropsWithChildren<
  Pick<FormControlContextValue, 'isRequired' | 'errorMessages'>
>;

export default function FormControl({ children, ...rest }: FormControlProps) {
  return (
    <FormControlProvider {...rest}>
      <div className="flex flex-col gap-1">{children}</div>
    </FormControlProvider>
  );
}
