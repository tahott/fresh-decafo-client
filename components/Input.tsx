import { ChangeEvent } from "https://esm.sh/v95/@types/react@18.0.18/X-ZS9wcmVhY3QvY29tcGF0/index.d.ts";
import { JSXInternal } from "https://esm.sh/v95/preact@10.11.0/src/jsx.d.ts";

interface InputProps {
  value?: string;
  placeholder?: string;
  maxLength?: number;
  onChange: JSXInternal.GenericEventHandler<HTMLInputElement>;
}

export default function Input({ onChange, ...props }: InputProps) {
  return (
    <input
      class="ml-2 border w-full"
      onInput={onChange}
    />
  )
}