'use client';

import { useState } from 'react';
import { Download, Trash2, FileText, AlertTriangle, Loader2 } from 'lucide-react';

export function PrivacySettings() {
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleExportData = async () => {
    setIsExporting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsExporting(false);
    // In a real app, this would trigger a download
  };

  const dataCategories = [
    { label: 'Profielgegevens', size: '2.4 KB', items: 12 },
    { label: 'Gebruikersdata', size: '156 KB', items: 847 },
    { label: 'Schuldenregistratie', size: '89 KB', items: 234 },
    { label: 'Betalingsgeschiedenis', size: '45 KB', items: 1240 },
    { label: 'Audit logs', size: '234 KB', items: 5621 },
  ];

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center">
            <Download className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Data Exporteren</h2>
            <p className="text-sm text-text-secondary mt-1">
              Download een kopie van al je gegevens in JSON-formaat
            </p>
          </div>
        </div>

        <div className="bg-input rounded-xl p-4 mb-6 border border-border-subtle">
          <h3 className="text-sm font-medium text-text-secondary mb-3">Inbegrepen data:</h3>
          <div className="space-y-2">
            {dataCategories.map((category) => (
              <div key={category.label} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-foreground">{category.label}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-text-secondary">
                  <span>{category.items} items</span>
                  <span className="bg-border-subtle px-2 py-0.5 rounded">{category.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleExportData}
          disabled={isExporting}
          className="flex items-center gap-2 px-6 py-3 bg-konsensi-green text-foreground rounded-full font-medium text-sm hover:bg-[#2d5a38] transition-colors disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Exporteren...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download mijn data
            </>
          )}
        </button>
      </div>

      {/* Data Retention */}
      <div className="bg-card rounded-[20px] p-8 border border-border-subtle">
        <h2 className="text-xl font-semibold text-foreground mb-2">Data Retentie</h2>
        <p className="text-sm text-text-secondary mb-6">
          Informatie over hoe lang we je gegevens bewaren
        </p>

        <div className="space-y-4">
          {[
            { type: 'Actieve accountgegevens', retention: 'Zolang je account actief is', color: 'bg-green-500' },
            { type: 'Audit logs', retention: '7 jaar (wettelijk verplicht)', color: 'bg-blue-500' },
            { type: 'Inactieve accounts', retention: '2 jaar na laatste activiteit', color: 'bg-yellow-500' },
            { type: 'Verwijderde data', retention: '30 dagen in backup', color: 'bg-red-500' },
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-4 py-3 border-b border-border-subtle last:border-0">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.type}</p>
                <p className="text-xs text-text-secondary">{item.retention}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete All Data */}
      <div className="bg-card rounded-[20px] p-8 border border-red-900/50">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-red-900/30 rounded-xl flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-red-500">Alle Data Verwijderen</h2>
            <p className="text-sm text-text-secondary mt-1">
              Verwijder permanent al je gegevens uit ons systeem
            </p>
          </div>
        </div>

        <div className="bg-red-900/20 rounded-xl p-4 mb-6 border border-red-900/50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-400">
              <p className="font-medium mb-1">Let op: Deze actie is onomkeerbaar</p>
              <ul className="list-disc list-inside space-y-1 text-red-500">
                <li>Alle gebruikersgegevens worden verwijderd</li>
                <li>Schuldenregistraties worden gewist</li>
                <li>Betalingsgeschiedenis wordt verwijderd</li>
                <li>Je account wordt permanent verwijderd</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-6 py-3 bg-red-900/20 text-red-500 rounded-full font-medium text-sm hover:bg-red-900/30 transition-colors border border-red-900/50"
        >
          Verzoek tot verwijdering indienen
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-[20px] p-6 w-full max-w-md mx-4 border border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Bevestig verwijdering</h3>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Typ <span className="font-mono bg-border-subtle px-1 rounded text-foreground">VERWIJDER</span> om te bevestigen
              dat je al je gegevens permanent wilt verwijderen.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="Typ VERWIJDER"
              className="w-full px-4 py-3 bg-input border border-border-subtle rounded-xl text-sm text-foreground placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="px-5 py-2.5 text-text-secondary font-medium text-sm hover:bg-card-hover rounded-full transition-colors"
              >
                Annuleren
              </button>
              <button
                disabled={deleteConfirmText !== 'VERWIJDER'}
                className="px-5 py-2.5 bg-red-600 text-foreground rounded-full font-medium text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Permanent verwijderen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
