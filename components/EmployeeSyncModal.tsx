import React, { useState } from 'react';
import { Employee } from '../types';
import { parsePastedSheetData, saveCustomEmployees, fetchEmployeesFromSheet, DEFAULT_GAS_URL } from '../services/gasService';

interface EmployeeSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  employees: Employee[];
  onEmployeesUpdated: (newEmployees: Employee[], source: string) => void;
  syncSource?: string;
}

export const EmployeeSyncModal: React.FC<EmployeeSyncModalProps> = ({
  isOpen,
  onClose,
  employees,
  onEmployeesUpdated,
  syncSource = ''
}) => {
  const [activeTab, setActiveTab] = useState<'sync' | 'paste' | 'script'>('sync');
  const [pasteText, setPasteText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);

  if (!isOpen) return null;

  const handleLiveSync = async () => {
    setIsProcessing(true);
    setStatusMsg({ type: 'info', text: 'جاري محاولة الاتصال بـ Google Apps Script و Google Sheets...' });
    try {
      const res = await fetchEmployeesFromSheet();
      if (res.success && res.employees.length > 0) {
        onEmployeesUpdated(res.employees, res.source);
        if (res.source === 'apps_script') {
          setStatusMsg({
            type: 'success',
            text: `تمت المزامنة بنجاح عبر Apps Script! تم سحب ${res.employees.length} موظف من كافة صفوف الشيت.`
          });
        } else if (res.source === 'google_sheet_api') {
          setStatusMsg({
            type: 'success',
            text: `تمت المزامنة مباشرة من Google Sheets! تم سحب ${res.employees.length} موظف.`
          });
        } else if (res.isFallback) {
          setStatusMsg({
            type: 'info',
            text: `تم تحميل ${res.employees.length} موظف من النسخة الأولية. إذا كنت تريد كافة الصفوف (أكثر من 18)، يرجى استخدام تبويب "لصق كل الصفوف فوراً" أو تحديث كود Apps Script.`
          });
        } else {
          setStatusMsg({
            type: 'success',
            text: `تم تحميل ${res.employees.length} موظف.`
          });
        }
      } else {
        setStatusMsg({
          type: 'error',
          text: res.error || 'تعذر جلب البيانات من الخادم، يرجى فحص الاتصال.'
        });
      }
    } catch (err: any) {
      setStatusMsg({
        type: 'error',
        text: 'حدث خطأ أثناء المزامنة: ' + (err.message || String(err))
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleParseAndApply = () => {
    if (!pasteText.trim()) {
      setStatusMsg({ type: 'error', text: 'يرجى لصق بيانات الصفوف من الشيت أولاً.' });
      return;
    }

    try {
      const parsed = parsePastedSheetData(pasteText);
      if (parsed.length === 0) {
        setStatusMsg({
          type: 'error',
          text: 'لم يتم التعرف على أي صفوف صالحة. تأكد من نسخ الصفوف التي تحتوي على اسم وكود الموظف.'
        });
        return;
      }

      saveCustomEmployees(parsed);
      onEmployeesUpdated(parsed, 'manual_paste');
      setStatusMsg({
        type: 'success',
        text: `تم استيراد وحفظ ${parsed.length} موظف بنجاح في التطبيق! تم تحديث النموذج فوراً بكافة الصفوف.`
      });
      setPasteText('');
    } catch (err: any) {
      setStatusMsg({
        type: 'error',
        text: 'فشل تحليل البيانات المنسوخة: ' + (err.message || String(err))
      });
    }
  };

  const handleCopyAppsScriptCode = () => {
    const code = `// دالة سحب كافة الموظفين من شيت Google (ضعها في Code.gs مع نشر نسخة جديدة)
function getEmployeesData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById('1n2sp5TNNGL3M5_LRNJ7IMLXXWoH6-kL8r4eGZokISCs');
  var sheet = ss.getSheetByName('data') || ss.getSheetByName('Data') || ss.getSheets()[0];
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { success: true, employees: [] };
  
  var values = sheet.getRange(1, 1, lastRow, Math.max(sheet.getLastColumn(), 8)).getValues();
  var employees = [];
  // قراءة كافة الصفوف بلا حدود
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    var code = String(row[1] || row[0] || '').trim();
    var name = String(row[2] || row[1] || '').trim();
    if (!name || name === 'الاسم' || code === 'كود') continue;
    employees.push({
      code: code || ('EMP' + r),
      name: name,
      dept: String(row[3] || 'إدارة المخازن').trim(),
      title: String(row[5] || '').trim(),
      annualBalance: Number(row[4]) || 0,
      email: (code === '70335' ? 'ahmed.hamdan@dakahlia.net' : 'emp.' + code + '@dakahlia.net')
    });
  }
  return { success: true, employees: employees, count: employees.length };
}`;

    navigator.clipboard.writeText(code).then(() => {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 3000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-['Tajawal'] text-right" dir="rtl">
      <div className="bg-white rounded-[2rem] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* رأس النافذة */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center text-xl shadow-xs">
              <i className="fas fa-users-cog"></i>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#1e3a8a]">
                مزامنة وتحميل كافة صفوف الموظفين
              </h3>
              <p className="text-xs text-gray-500">
                الحالي: <strong className="font-mono text-blue-900">{employees.length}</strong> موظف محمل في النظام
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* أزرار التبويب */}
        <div className="flex p-1.5 bg-gray-100 rounded-2xl gap-1 text-xs sm:text-sm font-bold">
          <button
            type="button"
            onClick={() => { setActiveTab('sync'); setStatusMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'sync' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-gray-600 hover:bg-white/60'}`}
          >
            <i className="fas fa-sync-alt"></i>
            <span>مزامنة تلقائية</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('paste'); setStatusMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'paste' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-gray-600 hover:bg-white/60'}`}
          >
            <i className="fas fa-paste"></i>
            <span>لصق كل الصفوف فوراً (سريع)</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('script'); setStatusMsg(null); }}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'script' ? 'bg-[#1e3a8a] text-white shadow-md' : 'text-gray-600 hover:bg-white/60'}`}
          >
            <i className="fas fa-code"></i>
            <span>تحديث Apps Script</span>
          </button>
        </div>

        {/* رسائل التنبيه */}
        {statusMsg && (
          <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 border-r-4 ${
            statusMsg.type === 'success' ? 'bg-green-50 text-green-800 border-green-600' :
            statusMsg.type === 'error' ? 'bg-red-50 text-red-800 border-red-600' :
            'bg-blue-50 text-blue-800 border-blue-600'
          }`}>
            <i className={`fas ${statusMsg.type === 'success' ? 'fa-check-circle' : statusMsg.type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'} text-base`}></i>
            <span className="leading-relaxed">{statusMsg.text}</span>
          </div>
        )}

        {/* التبويب 1: مزامنة حية تلقائية */}
        {activeTab === 'sync' && (
          <div className="space-y-5">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">مصدر البيانات الحالي:</span>
                <span className="bg-blue-100 text-blue-900 font-bold px-2.5 py-0.5 rounded-full font-mono text-[11px]">
                  {syncSource === 'apps_script' ? 'Google Apps Script (سحابي)' :
                   syncSource === 'google_sheet_api' ? 'Google Sheet GViz API' :
                   syncSource === 'manual_paste' ? 'استيراد ولصق مباشر' :
                   syncSource === 'cache' ? 'الذاكرة المؤقتة' : 'نسخة احتياطية أولية'}
                </span>
              </div>
              <p className="leading-relaxed">
                يقوم التطبيق بالاتصال برابط Apps Script لجلب كافة الصفوف المسجلة في تبويب <strong className="font-mono text-blue-900">data</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleLiveSync}
                disabled={isProcessing}
                className="flex-1 py-3.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <i className={`fas fa-sync-alt ${isProcessing ? 'fa-spin' : ''}`}></i>
                <span>{isProcessing ? 'جاري الاتصال وسحب الصفوف...' : 'بدء المزامنة من الشيت الآن'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('paste')}
                className="px-5 py-3.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <i className="fas fa-file-import"></i>
                <span>أو الصق صفوف الشيت مباشرة</span>
              </button>
            </div>
          </div>
        )}

        {/* التبويب 2: لصق كافة الصفوف مباشرة من شيت Google أو Excel */}
        {activeTab === 'paste' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border-r-4 border-amber-500 p-4 rounded-2xl text-xs text-amber-900 space-y-1">
              <strong className="block font-black text-sm text-amber-950">
                <i className="fas fa-bolt ml-1.5 text-amber-600"></i>
                الحل الأسرع لجلب كافة الصفوف (أكثر من 18 موظف فوراً):
              </strong>
              <p className="leading-relaxed">
                1. افتح شيت Google (تبويب <strong>data</strong>) وحدد كافة صفوف الموظفين (مع العناوين أو بدونها) واضغط <strong>Ctrl+C (نسخ)</strong>.<br />
                2. الصق البيانات في المربع أدناه (<strong>Ctrl+V</strong>) واضغط <strong>"استيراد وتطبيق لكافة الصفوف"</strong>.
              </p>
            </div>

            <div>
              <label className="block text-xs font-black text-gray-700 mb-1">
                الصق هنا محتوى الصفوف المنسوخة من الشيت:
              </label>
              <textarea
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={"مثال للصق:\n70250\tعبدالهادى محمد صالح خالد\tإدارة المخازن\tمدير اللوجستيه\t0\n70335\tأحمد محمد عبدالرحمن حمدان\tالتخطيط\tرئيس قسم التخطيط\t0\n101105\tإسلام خالد عبدالفتاح\tالتخطيط\tأمين مخزن\t2"}
                rows={6}
                className="w-full p-4 rounded-2xl border-2 border-gray-200 text-xs font-mono bg-gray-50 focus:bg-white focus:border-[#1e3a8a] outline-none transition-all leading-relaxed"
                dir="ltr"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleParseAndApply}
                className="w-full sm:w-auto px-8 py-3.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <i className="fas fa-check-double"></i>
                <span>استيراد وتطبيق لكافة الصفوف فوراً</span>
              </button>
            </div>
          </div>
        )}

        {/* التبويب 3: كود Apps Script المحدث لنشره سحابياً */}
        {activeTab === 'script' && (
          <div className="space-y-4">
            <p className="text-xs text-gray-600 leading-relaxed">
              إذا رغبت في أن تتم المزامنة سحابياً بشكل دائم لكل الأجهزة بدون لصق يدوي:
              انسخ ملف <code className="bg-gray-100 px-1 py-0.5 rounded font-mono font-bold text-red-600">backend/Code.gs</code> المحدث وقم بعمل نشر جديد <strong>(New Version)</strong> في Apps Script:
            </p>

            <div className="bg-gray-900 text-gray-100 p-4 rounded-2xl text-[11px] font-mono space-y-2 overflow-x-auto" dir="ltr">
              <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-gray-400">Google Apps Script Snippet (getEmployees):</span>
                <button
                  type="button"
                  onClick={handleCopyAppsScriptCode}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold transition-all"
                >
                  {copiedScript ? 'تم النسخ ✓' : 'نسخ الكود'}
                </button>
              </div>
              <pre className="text-green-400 leading-normal">
{`function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'getEmployees') {
    return ContentService.createTextOutput(JSON.stringify(getEmployeesData()))
      .setMimeType(ContentService.MimeType.JSON);
  }
  // ... باقي الدوال
}`}
              </pre>
            </div>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-900 leading-relaxed font-bold">
              📌 خطوات النشر في Google Apps Script:<br />
              افتح المشروع ➔ <strong>Deploy ➔ Manage Deployments ➔ Edit ✏️ ➔ Version: New Version ➔ Deploy</strong>.
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
