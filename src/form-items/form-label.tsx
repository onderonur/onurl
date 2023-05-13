import classNames from 'classnames';
import { useFormControl } from './form-control-context';

type FormLabel = React.ComponentProps<'label'>;

export default function FormLabel({ className, children, ...rest }: FormLabel) {
  const { ids, isRequired } = useFormControl();

  return (
    <label
      htmlFor={ids.input}
      className={classNames(className, 'font-semibold')}
      {...rest}
    >
      {children} {isRequired && <span className="text-error-600">*</span>}
    </label>
  );
}
