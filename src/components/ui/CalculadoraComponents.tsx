import { useState } from 'react';

interface CalculadoraProps {
  titulo: string;
  descricao: string;
}

export function CalculadoraCard({ titulo, descricao }: CalculadoraProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-blue-600">{titulo}</h3>
      <p className="mt-2 text-gray-600">{descricao}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
        Acessar
      </button>
    </div>
  );
}

export function CalculadoraContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {children}
    </div>
  );
}

export function InputField({ 
  label, 
  id, 
  type = "number", 
  value, 
  onChange,
  placeholder = "",
  required = false,
  min,
  max,
  step
}: {
  label: string;
  id: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  required = false
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ResultadoDisplay({ label, valor }: { label: string; valor: string | number }) {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-md border border-gray-200">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-semibold text-blue-600">{valor}</p>
    </div>
  );
}

export function Button({ 
  children, 
  onClick, 
  type = "button",
  variant = "primary"
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
}) {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}

export function FormGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 mb-6">
      {children}
    </div>
  );
}

export function FormRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

export function InfoCard({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-blue-50 rounded-md p-4 mb-4">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-blue-700 font-medium">{titulo}</h4>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-5 w-5 text-blue-700 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="mt-2 text-sm text-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}
