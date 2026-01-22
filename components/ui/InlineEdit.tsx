'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Check, X, Pencil } from 'lucide-react';

interface InlineEditProps {
  value: string;
  onSave: (newValue: string) => void;
  type?: 'text' | 'number' | 'email' | 'tel' | 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  displayClassName?: string;
}

export function InlineEdit({
  value,
  onSave,
  type = 'text',
  options = [],
  placeholder = 'Klik om te bewerken',
  disabled = false,
  className = '',
  displayClassName = '',
}: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleSave = useCallback(() => {
    if (editValue !== value) {
      onSave(editValue);
    }
    setIsEditing(false);
  }, [editValue, value, onSave]);

  const handleCancel = useCallback(() => {
    setEditValue(value);
    setIsEditing(false);
  }, [value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSave();
      } else if (e.key === 'Escape') {
        handleCancel();
      }
    },
    [handleSave, handleCancel]
  );

  if (disabled) {
    return (
      <span className={`text-gray-500 dark:text-gray-400 ${displayClassName}`}>
        {value || placeholder}
      </span>
    );
  }

  if (isEditing) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {type === 'select' ? (
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className="px-2 py-1 text-sm border border-konsensi-green rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-konsensi-green/20"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            placeholder={placeholder}
            className="px-2 py-1 text-sm border border-konsensi-green rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-konsensi-green/20 min-w-[100px]"
          />
        )}
        <button
          onClick={handleSave}
          className="p-1 rounded-md hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 transition-colors"
          title="Opslaan"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
          title="Annuleren"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`group flex items-center gap-1 cursor-pointer rounded-lg transition-colors ${displayClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsEditing(true)}
    >
      <span className="group-hover:text-konsensi-green transition-colors">
        {value || <span className="text-gray-400 italic">{placeholder}</span>}
      </span>
      {isHovered && (
        <Pencil className="w-3.5 h-3.5 text-gray-400 group-hover:text-konsensi-green transition-colors" />
      )}
    </div>
  );
}

// Status badge that can be edited inline
interface EditableStatusBadgeProps {
  value: string;
  onSave: (newValue: string) => void;
  statusOptions: { value: string; label: string; color: string }[];
  disabled?: boolean;
}

export function EditableStatusBadge({
  value,
  onSave,
  statusOptions,
  disabled = false,
}: EditableStatusBadgeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentStatus = statusOptions.find((s) => s.value === value) || statusOptions[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing]);

  const handleSelect = (newValue: string) => {
    if (newValue !== value) {
      onSave(newValue);
    }
    setIsEditing(false);
  };

  if (disabled) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus.color}`}
      >
        {currentStatus.label}
      </span>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${currentStatus.color} hover:ring-2 hover:ring-offset-1 hover:ring-[#3D7B4C]/30 transition-all cursor-pointer`}
      >
        {currentStatus.label}
        <Pencil className="w-3 h-3 opacity-50" />
      </button>

      {isEditing && (
        <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10 min-w-[140px]">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => handleSelect(status.value)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                status.value === value ? 'bg-gray-50 dark:bg-gray-800' : ''
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${status.color.includes('green') ? 'bg-green-500' : status.color.includes('yellow') ? 'bg-yellow-500' : status.color.includes('red') ? 'bg-red-500' : status.color.includes('blue') ? 'bg-blue-500' : 'bg-gray-500'}`}
              />
              <span className="text-gray-700 dark:text-gray-300">{status.label}</span>
              {status.value === value && (
                <Check className="w-4 h-4 ml-auto text-konsensi-green" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Editable table cell wrapper
interface EditableCellProps {
  children: React.ReactNode;
  isEditing?: boolean;
  onDoubleClick?: () => void;
}

export function EditableCell({ children, isEditing, onDoubleClick }: EditableCellProps) {
  return (
    <div
      className={`transition-colors ${
        isEditing
          ? 'bg-konsensi-green/5 rounded-lg'
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg'
      }`}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </div>
  );
}
