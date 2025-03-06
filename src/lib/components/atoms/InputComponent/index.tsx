import { InputHTMLAttributes, MouseEventHandler, forwardRef } from 'react';
import styles from './InputComponent.module.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  hasError?: boolean;
  onClear?: MouseEventHandler<HTMLButtonElement>;
}

const Input = forwardRef<HTMLInputElement, IInput>(
  ({ className = '', hasError = false, onClear, ...rest }, ref) => (
    <div className={`${styles.inputContainer} ${hasError ? styles.error : ''}`}>
      <input
        ref={ref}
        className={`${styles.inputField} ${className} ${hasError ? styles.errorBorder : ''}`}
        {...rest}
        placeholder="" // Using floating label instead of input placeholder
      />
      <label className={styles.floatingPlaceholder}>
        {rest.placeholder}
      </label>
      {hasError && (
        <span className={styles.errorIcon} onClick={onClear}>
          &times;
        </span>
      )}
    </div>
  )
);

export default Input;
