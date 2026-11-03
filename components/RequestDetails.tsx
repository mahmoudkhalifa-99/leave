import React, { useState } from 'react';
import { LeaveRequest, RequestStatus } from '../types';
import { DAKAHLIA_LOGO_BASE64, DAKAHLIA_LOGO_PATH } from '../services/logoData';

interface RequestDetailsProps {
  request: LeaveRequest;
  onClose: () => void;
}

// تهريب النصوص القادمة من المستخدم قبل إدخالها في HTML (النموذج المطبوع ومعاينة النموذج)
const esc = (val: unknown): string =>
  String(val ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const LOCAL_CONFIG_EMAILS: any = {
  DEPARTMENTS: {
    "التخطيط و المتابعة": "ahmed.hamdan@dakahlia.net",
    "إدارة المخازن": "ahmed.hamdan@dakahlia.net",
    "التخطيط": "ahmed.hamdan@dakahlia.net",
    "الخامات": "raw.store.mgr@dakahlia.net",
    "المنتج التام": "finished.store@dakahlia.net",
    "قطع الغيار": "spareparts.store@dakahlia.net",
    "المخازن العامة": "general.store@dakahlia.net",
    "حركة المعدات": "equipment.mgr@dakahlia.net"
  },
  WAREHOUSE_DIRECTOR_MANAGER: "abdelhady.saleh@dakahlia.net",
  DEPT_HEAD: "ahmed.hamdan@dakahlia.net",
  HR: "sadat.planning.officer@dakahlia.net",
  HR_EMAILS: [
    "sadat.planning.officer@dakahlia.net",
    "taha.zaki@dakahlia.net",
    "hr2@dakahlia.net"
  ]
};

export const RequestDetails: React.FC<RequestDetailsProps> = ({ request, onClose }) => {
  const [view, setView] = useState<'iso' | 'doc' | 'workflow'>('iso');

  // استثناء مدير المخازن يطبّق على صاحب الإجازة نفسه فقط (بالكود أو البريد)،
  // وليس على كل من اسمه "حمدان" أو من أنشأ الطلب نيابةً عنه — نفس منطق الخادم (Code.gs)
  const isAhmedHamdan = 
    request.employeeEmail?.toLowerCase() === 'ahmed.hamdan@dakahlia.net' ||
    request.employeeCode === '70335';

  const directManagerEmail = isAhmedHamdan 
    ? LOCAL_CONFIG_EMAILS.WAREHOUSE_DIRECTOR_MANAGER 
    : (LOCAL_CONFIG_EMAILS.DEPARTMENTS[request.department] || 'مدير القسم');

  const deptHeadEmail = isAhmedHamdan 
    ? LOCAL_CONFIG_EMAILS.WAREHOUSE_DIRECTOR_MANAGER 
    : LOCAL_CONFIG_EMAILS.DEPT_HEAD;

  // الأختام تظهر فقط للمراحل التي تم اعتمادها فعلاً (كانت تظهر APPROVED لكل الطلبات حتى المعلّقة)
  const sigs = request.signatures || {};
  const isApprovedFinal = request.status === RequestStatus.APPROVED || (request.status as string) === 'APPROVED';
  const managerDone = Boolean(sigs.manager) || isApprovedFinal || request.status === RequestStatus.PENDING_DEPT_HEAD || request.status === RequestStatus.PENDING_HR;
  const deptHeadDone = Boolean(sigs.deptHead) || isApprovedFinal || request.status === RequestStatus.PENDING_HR;
  const hrDone = Boolean(sigs.hr) || isApprovedFinal;
  const stampHtml = (done: boolean, email: string) =>
    done
      ? `<div class="stamp-text" style="color: #166534; border-color: #166534;">APPROVED</div><span class="approver-email">${esc(email)}</span>`
      : '';

  const startDisplay = request.displayStartDate || request.startDate;
  const endDisplay = request.displayEndDate || request.endDate;

  const issueDateStr = request.displayIssueDate || new Date().toLocaleDateString('ar-EG');

  const formHtml = () => `
    <div class="form-container">
        <table class="header-table">
            <tr>
                <td style="width: 25%;">
                    <table class="meta-inner-table">
                        <tr><td>كود الوثيقة</td><td>F-HR-601</td></tr>
                        <tr><td>رقم الإصدار</td><td>٢</td></tr>
                        <tr><td>تاريخ الإصدار</td><td>2025/12/01</td></tr>
                    </table>
                </td>
                <td class="title-box">طلب تصريح أجازة</td>
                <td class="logo-box">
                    <table style="width: 100%; border-collapse: collapse; border: none;">
                        <tr>
                            <td style="border: none; text-align: left; padding: 0; vertical-align: middle; width: 55%;">
                                <img src="${DAKAHLIA_LOGO_BASE64}" 
                                     alt="شعار شركة الدقهلية للدواجن" 
                                     width="115" 
                                     height="46" 
                                     style="height: 46px; max-height: 46px; width: auto; vertical-align: middle; display: inline-block;" />
                            </td>
                            <td style="border: none; text-align: right; padding: 0 4px 0 0; vertical-align: middle;">
                                <div style="font-size: 9.5pt; font-weight: bold; color: #1e3a8a; line-height: 1.2;">شركة الدقهلية للدواجن</div>
                                <div style="font-size: 7.5pt; font-weight: bold; color: #b45309; line-height: 1.2;">قطاع المخازن</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <div class="types-container">
            <span class="type-item">أعتيادية <span class="check-box">${request.leaveType === 'اعتيادية' ? '✔' : ''}</span></span>
            <span class="type-item">عارضة <span class="check-box">${request.leaveType === 'عارضة' ? '✔' : ''}</span></span>
            <span class="type-item">بدون رصيد <span class="check-box">${request.leaveType === 'بدون رصيد' ? '✔' : ''}</span></span>
            <span class="type-item">راحة <span class="check-box">${request.leaveType === 'راحة' ? '✔' : ''}</span></span>
            <span class="type-item">مرضي <span class="check-box">${request.leaveType === 'مرضي' ? '✔' : ''}</span></span>
        </div>
        <table class="content-table">
            <tr>
                <td style="width: 55%;"><span class="label">تحريراً في:</span> <span class="value">${issueDateStr}</span></td>
                <td><span class="label">كود الموظف:</span> <span class="value">${esc(request.employeeCode)}</span></td>
            </tr>
            <tr>
                <td><span class="label">أسم الموظف:</span> <span class="value">${esc(request.employeeName)}</span></td>
                <td><span class="label">الوظيفة:</span> <span class="value">${esc(request.jobTitle || 'موظف')}</span></td>
            </tr>
            <tr>
                <td><span class="label">الإدارة:</span> <span class="value">المخازن</span></td>
                <td><span class="label">القسم:</span> <span class="value">${esc(request.department)}</span></td>
            </tr>
            <tr>
                <td><span class="label">عدد الأيام:</span> <span class="value">${esc(request.daysCount)} يوم</span></td>
                <td><span class="label">من</span> <span class="value">${esc(startDisplay)}</span> <span class="label">إلى</span> <span class="value">${esc(endDisplay)}</span></td>
            </tr>
        </table>
        <div class="notes-row">
            <span class="label">ملاحظات:</span> <span class="value">${esc(request.reason) || '..................................................................................'}</span>
        </div>
        <table class="sig-table">
            <tr>
                <td>
                  الموظف<span class="sig-underline"></span>
                  <div class="stamp-text" style="color: #1e3a8a; border-color: #1e3a8a;">${esc(request.employeeName)}</div>
                </td>
                <td>
                  المدير المباشر<span class="sig-underline"></span>
                  ${stampHtml(managerDone, directManagerEmail)}
                </td>
                <td>
                  مدير الإدارة<span class="sig-underline"></span>
                  ${stampHtml(deptHeadDone, deptHeadEmail)}
                </td>
                <td>
                  الموارد البشرية<span class="sig-underline"></span>
                  ${stampHtml(hrDone, LOCAL_CONFIG_EMAILS.HR)}
                </td>
            </tr>
        </table>
        <div class="footer">الدقهلية للدواجن (مصنع أعلاف السادات) - إدارة الموارد البشرية</div>
    </div>
  `;

  const generateISOPrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
          <meta charset="UTF-8">
          <title>طباعة نموذج إجازة - ${esc(request.employeeName)} (${esc(request.id)})</title>
          <style>
              @page { size: A4 portrait; margin: 15mm 12mm; }
              body { font-family: 'Arial', sans-serif; margin: 0; padding: 0; color: #000; background: #fff; line-height: 1.4; }
              .page-wrapper { width: 100%; box-sizing: border-box; }
              .form-container { border: 2.5px solid #000; width: 100%; box-sizing: border-box; }
              .header-table { width: 100%; border-collapse: collapse; border-bottom: 2.5px solid #000; table-layout: fixed; }
              .header-table td { border-left: 2px solid #000; padding: 8px 6px; vertical-align: middle; text-align: center; }
              .header-table td:last-child { border-left: none; }
              .logo-box { width: 38%; text-align: left; padding: 6px 10px !important; }
              .title-box { font-size: 16pt; font-weight: bold; color: #1e3a8a; }
              .meta-inner-table { width: 100%; border-collapse: collapse; font-size: 8pt; }
              .meta-inner-table td { border: none; padding: 2px 6px; text-align: right; }
              .meta-inner-table td:first-child { text-align: left; font-weight: normal; color: #555; }
              .types-container { padding: 8px 10px; border-bottom: 2px solid #000; text-align: center; background: #f8fafc; font-size: 9.5pt; }
              .type-item { display: inline-block; margin: 0 10px; font-weight: bold; }
              .check-box { display: inline-block; width: 16px; height: 16px; border: 1.5px solid #000; vertical-align: middle; margin-right: 4px; text-align: center; line-height: 15px; font-size: 11pt; background: #fff; }
              .content-table { width: 100%; border-collapse: collapse; }
              .content-table td { padding: 8px 16px; border-bottom: 1px solid rgba(0,0,0,0.08); font-size: 10.5pt; height: 32px; }
              .label { font-weight: bold; margin-left: 6px; color: #111; }
              .value { color: #1e3a8a; font-weight: bold; font-family: 'Courier New', monospace; font-size: 11pt; }
              .notes-row { width: 100%; border-bottom: 2px solid #000; padding: 10px 16px; min-height: 45px; font-size: 10.5pt; box-sizing: border-box; }
              .sig-table { width: 100%; border-collapse: collapse; }
              .sig-table td { width: 25%; text-align: center; font-weight: bold; padding: 12px 6px 35px 6px; border-left: none; vertical-align: top; font-size: 10pt; }
              .sig-underline { display: block; margin-top: 22px; border-top: 1px dashed #000; width: 75%; margin: 6px auto; }
              .stamp-text { font-size: 8pt; font-weight: bold; font-family: monospace; border: 1.5px solid #cbd5e1; padding: 3px 6px; display: inline-block; margin-top: 4px; border-radius: 4px; }
              .approver-email { font-size: 7.5pt; font-family: monospace; color: #475569; margin-top: 4px; display: block; font-weight: bold; overflow-wrap: break-word; line-height: 1.2; }
              .footer { text-align: center; padding: 8px; font-size: 8pt; font-weight: bold; border-top: 1.5px solid #000; color: #475569; background: #f8fafc; }
              @media print { .no-print { display: none; } }
          </style>
      </head>
      <body>
          <div class="no-print" style="background: #f1f5f9; padding: 12px; text-align: center; border-radius: 8px; margin-bottom: 20px;">
              <button onclick="window.print()" style="background: #1e3a8a; color: white; border: none; padding: 10px 32px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px;">🖨️ تأكيد طباعة النموذج</button>
          </div>
          <div class="page-wrapper">
              ${formHtml()}
          </div>
      </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 bg-[#1e3a8a]/40 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-auto border border-gray-100">
        {/* Modal Header */}
        <div className="px-6 md:px-8 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/80">
          <div>
            <h3 className="text-xl font-black text-[#1e3a8a] flex items-center gap-2">
              <i className="fas fa-file-invoice text-blue-600"></i>
              <span>تفاصيل وثيقة طلب الإجازة</span>
            </h3>
            <p className="text-xs text-gray-500 font-bold mt-1">
              الرقم المرجعي: <span className="font-mono text-blue-600 font-black">{request.id}</span> | كود الموظف: <span className="font-bold text-gray-700">{request.employeeCode}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
             <nav className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm text-xs font-bold">
                <button 
                  onClick={() => setView('iso')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${view === 'iso' ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-gray-500 hover:text-[#1e3a8a]'}`}
                >
                  <i className="fas fa-certificate text-[11px]"></i>
                  <span>النموذج الرسمي (F-HR-601)</span>
                </button>
                <button 
                  onClick={() => setView('doc')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${view === 'doc' ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-gray-500 hover:text-[#1e3a8a]'}`}
                >
                  <i className="fas fa-list-alt text-[11px]"></i>
                  <span>بيانات الطلب</span>
                </button>
                <button 
                  onClick={() => setView('workflow')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${view === 'workflow' ? 'bg-[#1e3a8a] text-white shadow-sm' : 'text-gray-500 hover:text-[#1e3a8a]'}`}
                >
                  <i className="fas fa-signature text-[11px]"></i>
                  <span>دورة الاعتماد</span>
                </button>
             </nav>
             <button 
               onClick={onClose} 
               className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors flex items-center justify-center mr-1"
               title="إغلاق"
             >
                <i className="fas fa-times text-lg"></i>
             </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {view === 'iso' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200 px-4 py-3 rounded-2xl">
                <div className="flex items-center gap-2.5 text-xs text-blue-900 font-bold">
                  <i className="fas fa-check-circle text-green-600 text-sm"></i>
                  <span>معاينة النموذج الرسمي المعتمد F-HR-601 متضمناً شعار الشركة وكافة الأختام والتوقيعات:</span>
                </div>
                <button 
                  onClick={generateISOPrint}
                  className="px-4 py-1.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <i className="fas fa-print"></i>
                  <span>طباعة فورية</span>
                </button>
              </div>

              {/* بطاقة عرض النموذج الرسمي F-HR-601 مع اللوجو والأختام */}
              <div className="border-2 border-black rounded-xl bg-white shadow-lg p-0 overflow-hidden text-right text-black font-sans">
                {/* Header Table */}
                <div className="grid grid-cols-12 border-b-2 border-black divide-x-2 divide-x-reverse divide-black text-center">
                  {/* Meta box */}
                  <div className="col-span-3 p-2 flex flex-col justify-center text-[10px] font-bold">
                    <div className="flex justify-between border-b pb-1 mb-1">
                      <span className="text-gray-500 font-normal">كود الوثيقة:</span>
                      <span className="font-mono font-black">F-HR-601</span>
                    </div>
                    <div className="flex justify-between border-b pb-1 mb-1">
                      <span className="text-gray-500 font-normal">رقم الإصدار:</span>
                      <span className="font-black">٢</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-normal">تاريخ الإصدار:</span>
                      <span className="font-mono">2025/12/01</span>
                    </div>
                  </div>

                  {/* Title Box */}
                  <div className="col-span-4 p-3 flex items-center justify-center">
                    <h2 className="text-lg md:text-xl font-black text-[#1e3a8a]">طلب تصريح أجازة</h2>
                  </div>

                  {/* Logo Box - هنا يظهر اللوجو بدقة وأناقة */}
                  <div className="col-span-5 p-2 px-3 flex items-center justify-between gap-3 bg-white">
                    <div className="w-24 h-12 flex items-center justify-center shrink-0">
                      <img 
                        src={DAKAHLIA_LOGO_BASE64} 
                        alt="شعار شركة الدقهلية للدواجن" 
                        className="max-h-12 w-auto object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DAKAHLIA_LOGO_PATH;
                        }}
                      />
                    </div>
                    <div className="text-right leading-tight">
                      <div className="text-[12px] font-black text-[#1e3a8a]">شركة الدقهلية للدواجن</div>
                      <div className="text-[10px] font-bold text-amber-700">قطاع المخازن</div>
                      <div className="text-[9px] text-gray-400 font-mono">DAKAHLIA POULTRY</div>
                    </div>
                  </div>
                </div>

                {/* Types Checkboxes */}
                <div className="bg-slate-50 border-b-2 border-black p-2.5 text-center text-xs font-bold flex flex-wrap items-center justify-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <span>أعتيادية</span>
                    <span className="w-4 h-4 border border-black bg-white inline-flex items-center justify-center text-[10px] font-black">
                      {request.leaveType === 'اعتيادية' ? '✔' : ''}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span>عارضة</span>
                    <span className="w-4 h-4 border border-black bg-white inline-flex items-center justify-center text-[10px] font-black">
                      {request.leaveType === 'عارضة' ? '✔' : ''}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span>بدون رصيد</span>
                    <span className="w-4 h-4 border border-black bg-white inline-flex items-center justify-center text-[10px] font-black">
                      {request.leaveType === 'بدون رصيد' ? '✔' : ''}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span>راحة</span>
                    <span className="w-4 h-4 border border-black bg-white inline-flex items-center justify-center text-[10px] font-black">
                      {request.leaveType === 'راحة' ? '✔' : ''}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span>مرضي</span>
                    <span className="w-4 h-4 border border-black bg-white inline-flex items-center justify-center text-[10px] font-black">
                      {request.leaveType === 'مرضي' ? '✔' : ''}
                    </span>
                  </span>
                </div>

                {/* Content Table */}
                <div className="divide-y divide-gray-200 text-xs">
                  <div className="grid grid-cols-2 p-2.5 px-4">
                    <div><span className="font-bold ml-2">تحريراً في:</span> <span className="font-mono font-bold text-blue-900">{issueDateStr}</span></div>
                    <div><span className="font-bold ml-2">كود الموظف:</span> <span className="font-mono font-bold text-blue-900">{request.employeeCode}</span></div>
                  </div>
                  <div className="grid grid-cols-2 p-2.5 px-4 bg-gray-50/50">
                    <div><span className="font-bold ml-2">أسم الموظف:</span> <span className="font-bold text-[#1e3a8a]">{request.employeeName}</span></div>
                    <div><span className="font-bold ml-2">الوظيفة:</span> <span className="font-bold text-gray-800">{request.jobTitle || 'موظف'}</span></div>
                  </div>
                  <div className="grid grid-cols-2 p-2.5 px-4">
                    <div><span className="font-bold ml-2">الإدارة:</span> <span className="font-bold text-gray-800">المخازن</span></div>
                    <div><span className="font-bold ml-2">القسم:</span> <span className="font-bold text-gray-800">{request.department}</span></div>
                  </div>
                  <div className="grid grid-cols-2 p-2.5 px-4 bg-gray-50/50">
                    <div><span className="font-bold ml-2">عدد الأيام:</span> <span className="font-bold text-blue-900 font-mono">{request.daysCount} يوم</span></div>
                    <div><span className="font-bold ml-2">من</span> <span className="font-mono font-bold text-blue-900">{startDisplay}</span> <span className="font-bold mx-2">إلى</span> <span className="font-mono font-bold text-blue-900">{endDisplay}</span></div>
                  </div>
                </div>

                {/* Notes */}
                <div className="p-3 px-4 border-t-2 border-black text-xs min-h-[45px] bg-white">
                  <span className="font-bold ml-2">ملاحظات:</span>
                  <span className="text-gray-700 italic">{request.reason || 'لا توجد ملاحظات إضافية'}</span>
                </div>

                {/* Signatures & Stamps */}
                <div className="border-t-2 border-black grid grid-cols-4 divide-x divide-x-reverse divide-gray-200 text-center text-xs p-3 pt-4 pb-6 bg-slate-50/40">
                  <div className="p-2">
                    <div className="font-bold text-gray-700">الموظف</div>
                    <div className="border-t border-dashed border-gray-400 w-3/4 mx-auto my-3"></div>
                    <div className="inline-block px-2.5 py-1 rounded border border-blue-700 text-blue-800 font-bold text-[10px]">
                      {request.employeeName}
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="font-bold text-gray-700">المدير المباشر</div>
                    <div className="border-t border-dashed border-gray-400 w-3/4 mx-auto my-3"></div>
                    <div className="inline-block px-2.5 py-1 rounded border border-green-700 bg-green-50 text-green-800 font-mono font-black text-[10px]">
                      APPROVED
                    </div>
                    <span className="block text-[9px] font-mono text-gray-500 mt-1 truncate" dir="ltr">{directManagerEmail}</span>
                  </div>
                  <div className="p-2">
                    <div className="font-bold text-gray-700">مدير الإدارة</div>
                    <div className="border-t border-dashed border-gray-400 w-3/4 mx-auto my-3"></div>
                    <div className="inline-block px-2.5 py-1 rounded border border-green-700 bg-green-50 text-green-800 font-mono font-black text-[10px]">
                      APPROVED
                    </div>
                    <span className="block text-[9px] font-mono text-gray-500 mt-1 truncate" dir="ltr">{deptHeadEmail}</span>
                  </div>
                  <div className="p-2">
                    <div className="font-bold text-gray-700">الموارد البشرية</div>
                    <div className="border-t border-dashed border-gray-400 w-3/4 mx-auto my-3"></div>
                    <div className="inline-block px-2.5 py-1 rounded border border-green-700 bg-green-50 text-green-800 font-mono font-black text-[10px]">
                      APPROVED
                    </div>
                    <span className="block text-[9px] font-mono text-gray-500 mt-1 truncate" dir="ltr">{LOCAL_CONFIG_EMAILS.HR}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-black bg-gray-50 p-2 text-center text-[10px] font-bold text-gray-600">
                  الدقهلية للدواجن (مصنع أعلاف السادات) - إدارة الموارد البشرية
                </div>
              </div>
            </div>
          ) : view === 'doc' ? (
            <div className="space-y-8">
              {/* بيانات منشئ المعاملة والبريد */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm shadow-sm">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div>
                    <span className="text-xs font-black text-amber-900 block">حساب Google المنشئ للطلب (مقدم المعاملة):</span>
                    <span className="font-mono text-xs font-bold text-blue-950" dir="ltr">{request.submitterEmail || 'غير مسجل'}</span>
                  </div>
                </div>
                {request.annualBalance !== undefined && (
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-black text-amber-900">
                    رصيد الشيت السنوي: <span className="font-mono text-blue-700">{request.annualBalance}</span> يوم
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-100">
                  <span className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">Employee Details</span>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500 text-sm">اسم الموظف:</span> <span className="font-bold text-[#1e3a8a]">{request.employeeName}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500 text-sm">كود الموظف:</span> <span className="font-bold text-gray-700">{request.employeeCode}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500 text-sm">القسم:</span> <span className="font-bold text-gray-700">{request.department}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500 text-sm">المسمى الوظيفي:</span> <span className="font-bold text-gray-700">{request.jobTitle}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500 text-sm">بريد الموظف:</span> <span className="font-mono text-xs font-bold text-gray-700" dir="ltr">{request.employeeEmail}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500 text-sm">تحريراً في:</span> <span className="font-bold text-blue-600">{request.displayIssueDate}</span></div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-100">
                  <span className="text-[10px] font-black text-gray-400 uppercase block mb-2 tracking-widest">Leave Details</span>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500 text-sm">نوع الإجازة:</span> <span className="font-bold text-yellow-600">{request.leaveType}</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500 text-sm">مدة الإجازة:</span> <span className="font-bold text-gray-700">{request.daysCount} أيام</span></div>
                    <div className="flex justify-between border-b pb-2"><span className="text-gray-500 text-sm">تاريخ البداية:</span> <span className="font-bold text-gray-700">{startDisplay}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500 text-sm">آخر يوم في الإجازة:</span> <span className="font-bold text-green-700">{endDisplay}</span></div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-blue-50/50 rounded-2xl border-2 border-blue-100">
                <span className="text-[10px] font-black text-blue-400 uppercase block mb-2 tracking-widest">Additional Notes</span>
                <p className="text-gray-700 leading-relaxed italic">"{request.reason || 'لم يتم إدراج ملاحظات إضافية لهذا الطلب'}"</p>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center">
               {isAhmedHamdan && (
                 <div className="mb-6 mx-auto max-w-md p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-right text-xs text-amber-900 font-bold flex items-center gap-2.5">
                   <i className="fas fa-star text-amber-500 text-sm"></i>
                   <span>استثناء إداري لمدير المخازن (أ/ أحمد حمدان): المدير المباشر المعتمد عليه هو أ/ عبد الهادي صالح (abdelhady.saleh@dakahlia.net).</span>
                 </div>
               )}
               <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4 w-full max-w-md">
                     <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                     <div className="flex-1 p-4 bg-green-50 rounded-xl border border-green-100 text-right">
                        <div className="text-xs font-black text-green-700">تم تقديم الطلب</div>
                        <div className="text-[11px] text-green-800 font-bold">للموظف: {request.employeeName}</div>
                        <div className="text-[10px] text-gray-500 font-mono mt-0.5" dir="ltr">منشئ الطلب: {request.submitterEmail || 'Google Account'}</div>
                     </div>
                  </div>
                  <div className="w-0.5 h-6 bg-gray-200"></div>
                  <div className="flex items-center gap-4 w-full max-w-md">
                     <div className="w-8 h-8 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                     <div className="flex-1 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-right">
                        <div className="text-xs font-black text-yellow-700">{isAhmedHamdan ? 'اعتماد المشرف العام / المدير المباشر' : 'موافقة المدير المباشر'}</div>
                        <div className="text-[11px] text-yellow-900 font-bold">{isAhmedHamdan ? 'أ/ عبد الهادي صالح' : (request.department || 'القسم')}</div>
                        <div className="text-[10px] text-yellow-700 font-mono mt-0.5" dir="ltr">{directManagerEmail}</div>
                     </div>
                  </div>
                  <div className="w-0.5 h-6 bg-gray-200"></div>
                  <div className="flex items-center gap-4 w-full max-w-md">
                     <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                     <div className="flex-1 p-4 bg-blue-50 rounded-xl border border-blue-100 text-right">
                        <div className="text-xs font-black text-blue-700">الاعتماد والتوثيق النهائي (APPROVED)</div>
                        <div className="text-[11px] text-blue-900 font-bold">إدارة الموارد البشرية</div>
                        <div className="text-[10px] text-blue-700 font-mono mt-0.5" dir="ltr">
                          {LOCAL_CONFIG_EMAILS.HR_EMAILS ? LOCAL_CONFIG_EMAILS.HR_EMAILS.join(' , ') : LOCAL_CONFIG_EMAILS.HR}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
        
        <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
           <button 
             onClick={() => setView(view === 'iso' ? 'doc' : 'iso')} 
             className="px-5 py-2.5 bg-white border border-gray-200 text-blue-900 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
           >
              <i className={`fas ${view === 'iso' ? 'fa-list-ul' : 'fa-eye'}`}></i>
              <span>{view === 'iso' ? 'عرض تفاصيل الحقول' : 'معاينة النموذج الرسمي'}</span>
           </button>
           <div className="flex items-center gap-3">
             <button onClick={onClose} className="px-6 py-2.5 bg-white border-2 border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all">إغلاق</button>
             <button onClick={generateISOPrint} className="px-6 py-2.5 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold shadow-lg hover:bg-blue-900 transition-all flex items-center gap-2">
                <i className="fas fa-print"></i> 
                <span>طباعة نموذج الإجازة</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
