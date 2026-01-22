'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  placeholder?: string;
}

const MONTHS = [
  'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'
];

const WEEKDAYS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

const PRESET_RANGES = [
  { label: 'Vandaag', getValue: () => ({ start: new Date(), end: new Date() }) },
  { label: 'Gisteren', getValue: () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return { start: date, end: date };
  }},
  { label: 'Afgelopen 7 dagen', getValue: () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 7);
    return { start, end };
  }},
  { label: 'Afgelopen 30 dagen', getValue: () => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    return { start, end };
  }},
  { label: 'Deze maand', getValue: () => {
    const start = new Date();
    start.setDate(1);
    return { start, end: new Date() };
  }},
  { label: 'Vorige maand', getValue: () => {
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    start.setDate(1);
    const end = new Date();
    end.setDate(0);
    return { start, end };
  }},
];

export function DateRangePicker({ value, onChange, placeholder = 'Selecteer periode' }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // Add empty cells for days before the first day of the month
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isInRange = (date: Date) => {
    if (!value.start || !value.end) return false;
    return date >= value.start && date <= value.end;
  };

  const isSelected = (date: Date) => {
    if (value.start && date.toDateString() === value.start.toDateString()) return true;
    if (value.end && date.toDateString() === value.end.toDateString()) return true;
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (selecting === 'start') {
      onChange({ start: date, end: null });
      setSelecting('end');
    } else {
      if (value.start && date < value.start) {
        onChange({ start: date, end: value.start });
      } else {
        onChange({ ...value, end: date });
      }
      setSelecting('start');
      setIsOpen(false);
    }
  };

  const handlePresetClick = (preset: typeof PRESET_RANGES[0]) => {
    onChange(preset.getValue());
    setIsOpen(false);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 border border-border-subtle rounded-xl text-sm bg-card hover:border-border-medium transition-colors"
      >
        <Calendar className="w-4 h-4 text-text-secondary" />
        {value.start && value.end ? (
          <span className="text-foreground">
            {formatDate(value.start)} - {formatDate(value.end)}
          </span>
        ) : (
          <span className="text-text-secondary">{placeholder}</span>
        )}
        {value.start && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChange({ start: null, end: null });
            }}
            className="ml-1 p-0.5 hover:bg-card-hover rounded"
          >
            <X className="w-3 h-3 text-text-secondary" />
          </button>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 z-50 bg-card rounded-xl shadow-lg border border-border-subtle p-4 flex gap-4">
          {/* Presets */}
          <div className="border-r border-border-subtle pr-4">
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-2">
              Snelle selectie
            </p>
            <div className="space-y-1">
              {PRESET_RANGES.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset)}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-card-hover text-foreground transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  const newMonth = new Date(currentMonth);
                  newMonth.setMonth(newMonth.getMonth() - 1);
                  setCurrentMonth(newMonth);
                }}
                className="p-1 hover:bg-card-hover rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-text-secondary" />
              </button>
              <span className="font-medium text-foreground">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button
                onClick={() => {
                  const newMonth = new Date(currentMonth);
                  newMonth.setMonth(newMonth.getMonth() + 1);
                  setCurrentMonth(newMonth);
                }}
                className="p-1 hover:bg-card-hover rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="w-9 h-9 flex items-center justify-center text-xs font-medium text-text-tertiary"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div key={index}>
                  {day ? (
                    <button
                      onClick={() => handleDateClick(day)}
                      className={`w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-colors ${
                        isSelected(day)
                          ? 'bg-[#3D7B4C] text-foreground'
                          : isInRange(day)
                          ? 'bg-[#3D7B4C]/20 text-[#4a9d5c]'
                          : 'hover:bg-card-hover text-foreground'
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  ) : (
                    <div className="w-9 h-9" />
                  )}
                </div>
              ))}
            </div>

            {/* Selection hint */}
            <p className="mt-3 text-xs text-text-secondary text-center">
              {selecting === 'start' ? 'Selecteer startdatum' : 'Selecteer einddatum'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
