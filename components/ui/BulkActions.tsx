'use client';

import { useState } from 'react';
import { Check, X, Trash2, Download, Mail, Tag, MoreHorizontal, AlertCircle } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onDelete?: () => void;
  onExport?: () => void;
  onEmail?: () => void;
  onStatusChange?: (status: string) => void;
  onCustomAction?: (action: string) => void;
  statusOptions?: { value: string; label: string }[];
  customActions?: { id: string; label: string; icon?: React.ReactNode; danger?: boolean }[];
  className?: string;
}

export function BulkActions({
  selectedCount,
  onClearSelection,
  onDelete,
  onExport,
  onEmail,
  onStatusChange,
  onCustomAction,
  statusOptions = [],
  customActions = [],
  className = '',
}: BulkActionsProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (selectedCount === 0) return null;

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-4 z-40 animate-slide-up ${className}`}
    >
      {/* Selection Count */}
      <div className="flex items-center gap-2 pr-4 border-r border-gray-200 dark:border-gray-700">
        <div className="w-8 h-8 bg-konsensi-green rounded-lg flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {selectedCount} geselecteerd
          </p>
          <button
            onClick={onClearSelection}
            className="text-xs text-konsensi-green hover:underline"
          >
            Selectie wissen
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Status Change */}
        {onStatusChange && statusOptions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Tag className="w-4 h-4" />
              Status wijzigen
            </button>

            {showStatusMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[160px]">
                {statusOptions.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => {
                      onStatusChange(status.value);
                      setShowStatusMenu(false);
                    }}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {status.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Export */}
        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exporteren
          </button>
        )}

        {/* Email */}
        {onEmail && (
          <button
            onClick={onEmail}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Mail className="w-4 h-4" />
            E-mail
          </button>
        )}

        {/* Custom Actions Menu */}
        {customActions.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
              Meer
            </button>

            {showMoreMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[180px]">
                {customActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => {
                      onCustomAction?.(action.id);
                      setShowMoreMenu(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-left transition-colors ${
                      action.danger
                        ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delete */}
        {onDelete && (
          <div className="relative">
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-sm text-red-600 dark:text-red-400">Weet je het zeker?</span>
                <button
                  onClick={handleDelete}
                  className="px-2 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-colors"
                >
                  Ja, verwijder
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors"
                >
                  Annuleren
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Verwijderen
              </button>
            )}
          </div>
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={onClearSelection}
        className="ml-2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Selection checkbox for table rows
interface SelectCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  indeterminate?: boolean;
}

export function SelectCheckbox({ checked, onChange, indeterminate }: SelectCheckboxProps) {
  return (
    <label className="relative flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        ref={(el) => {
          if (el) {
            el.indeterminate = indeterminate || false;
          }
        }}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
          checked || indeterminate
            ? 'bg-konsensi-green border-konsensi-green'
            : 'border-gray-300 dark:border-gray-600 hover:border-konsensi-green'
        }`}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
        {indeterminate && !checked && (
          <div className="w-2.5 h-0.5 bg-white rounded-full" />
        )}
      </div>
    </label>
  );
}

// Hook for managing table selection
export function useTableSelection<T extends { id: string | number }>(items: T[]) {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(new Set());

  const isSelected = (id: string | number) => selectedIds.has(id);

  const toggleSelection = (id: string | number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(items.map((item) => item.id)));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
  };

  const isAllSelected = items.length > 0 && selectedIds.size === items.length;
  const isPartiallySelected = selectedIds.size > 0 && selectedIds.size < items.length;

  const selectedItems = items.filter((item) => selectedIds.has(item.id));

  return {
    selectedIds,
    selectedItems,
    selectedCount: selectedIds.size,
    isSelected,
    toggleSelection,
    selectAll,
    clearSelection,
    isAllSelected,
    isPartiallySelected,
  };
}
