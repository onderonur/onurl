import FormControlProvider, {
  FormControlContextValue,
} from './form-control-context';

type FormControlProps = React.PropsWithChildren<
  Pick<FormControlContextValue, 'isInvalid' | 'isRequired'>
>;

export default function FormControl({ children, ...rest }: FormControlProps) {
  return (
    <FormControlProvider {...rest}>
      <div className="flex flex-col gap-1">{children}</div>
    </FormControlProvider>
  );
}
