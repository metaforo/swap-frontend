import * as React from 'react';
import { useImperativeHandle } from 'react';
import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';

const NumberInput = React.forwardRef(function CustomNumberInput(
    props: NumberInputProps,
    ref: React.ForwardedRef<HTMLDivElement>,
) {

    const [value, setValue] = React.useState(0);

  useImperativeHandle(ref, () => ({
    getValue: () => {
      return value;
    }
  }));

    return (
        <BaseNumberInput
            onChange={(event, newValue) => setValue(newValue)}
            slots={{
                root: StyledInputRoot,
                input: StyledInput,
                incrementButton: StyledButton,
                decrementButton: StyledButton,
            }}
            slotProps={{
                incrementButton: {
                    children: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="#878D96"/>
                        <path d="M12 4C12.5523 4 13 4.44772 13 5V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V5C11 4.44772 11.4477 4 12 4Z" fill="#878D96"/>
                    </svg>,
                    className: 'increment',
                },
                decrementButton: {
                    children: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z" fill="#878D96" fill-opacity="0.4"/>
                    </svg>,
                },
            }}
            {...props}
            ref={ref}
        />
    );
});

//export default function QuantityInput(props) {
//    return <NumberInput aria-label="Quantity Input"
//    ref={ref}
//    min={1} max={props.max} defaultValue={0} />;
//}

const QuantityInput = React.forwardRef(({ max }, ref) => (
    <NumberInput
        aria-label="Quantity Input"
        ref={ref}
        min={1}
        max={max}
        defaultValue={0}
    />
));

export default QuantityInput;

const StyledInputRoot = styled('div')(
    ({ theme }) => `
  font-weight: 400;
  color: #F6F6F6;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`,
);

const StyledInput = styled('input')(
    ({ theme }) => `
  font-size: 40px;
  font-weight: 400;
  line-height: normal;
  color: #F6F6F6;
  background: transparent;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px transparent;
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: transparent;
  }

  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px transparent;
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const StyledButton = styled('button')(
    ({ theme }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  border: 1px solid;
  border-radius: 999px;
  border-color: transparent;
  background: transparent;
  color: #878D96;
  width: 44px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transitionTiming-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: #878D96;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`,
);
