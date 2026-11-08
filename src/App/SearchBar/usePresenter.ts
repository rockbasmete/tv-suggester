import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

const DEBOUNCE_MS = 400;

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export const usePresenter = ({ value, onChange }: SearchBarProps) => {
  const [input, setInput] = useState(value);
  const debouncedInput = useDebouncedValue(input, DEBOUNCE_MS);

  useEffect(() => {
    onChange(debouncedInput);
  }, [debouncedInput, onChange]);

  const onSubmit = () => onChange(input);

  const onClear = () => {
    setInput('');
    onChange('');
  };

  return { input, onInputChange: setInput, onSubmit, onClear };
};
