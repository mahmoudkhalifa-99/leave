import { LeaveRequest, Employee } from '../types';

/**
 * إعدادات الاتصال بـ Google Apps Script و Google Sheets
 */
export const DEFAULT_GAS_URL = 'https://script.google.com/macros/s/AKfycbwjhLuiKGDZz0D8AD0Rv9PH3HUI_Ly43kEkg0AH8-DBJXJnryPdXq3kOu2x9jxF_IQLmg/exec';
export const SPREADSHEET_ID = '1n2sp5TNNGL3M5_LRNJ7IMLXXWoH6-kL8r4eGZokISCs';
export const SHEET_DATA_TAB = 'data';

// البيانات الأولية لموظفي قطاع المخازن بمختلف أقسامه (تستخدم كنسخة احتياطية عند عدم توفر اتصال)
const INITIAL_SHEET_SEED: Employee[] = [
  // إدارة المخازن والتخطيط
  { code: "70250", name: "عبدالهادى محمد صالح خالد", dept: "إدارة المخازن", title: "مدير اللوجستيه", annualBalance: 0 },
  { code: "70335", name: "أحمد محمد عبدالرحمن حمدان", dept: "التخطيط", title: "رئيس قسم التخطيط", annualBalance: 0, email: "ahmed.hamdan@dakahlia.net" },
  { code: "101105", name: "إسلام خالد عبدالفتاح عبدربه", dept: "التخطيط", title: "أمين مخزن أول", annualBalance: 2 },
  { code: "71142", name: "محمود عبدالمجيب عبدالحفيظ خليفه", dept: "التخطيط", title: "مسؤول تخطيط ومراقبة المخزون", annualBalance: 13.5 },
  // مخازن الخامات
  { code: "101103", name: "احمد كمال محمود حسين", dept: "الخامات", title: "رئيس قسم مخازن الخامات", annualBalance: 7 },
  { code: "70434", name: "أحمد فرحات قاسم سعيد", dept: "الخامات", title: "مشرف مخازن", annualBalance: 4.75 },
  { code: "70430", name: "كامل ممدوح كامل محمد", dept: "الخامات", title: "مشرف مخازن", annualBalance: 12 },
  { code: "70616", name: "محمود عبدالفتاح رمضان حنفى", dept: "الخامات", title: "أمين مخزن أول", annualBalance: 9.25 },
  { code: "70966", name: "اسلام هلال عبدالمعز ابوشنب", dept: "الخامات", title: "أمين مخزن", annualBalance: 14 },
  { code: "71002", name: "مصطفى اشرف علام", dept: "الخامات", title: "أمين مخزن", annualBalance: 0 },
  { code: "71039", name: "عبدالله حامد محمد فهمي الشرقاوي", dept: "الخامات", title: "أمين مخزن", annualBalance: 10.25 },
  { code: "71093", name: "اسامه عبدالعاطى جلال إبراهيم عدوى", dept: "الخامات", title: "أمين مخزن", annualBalance: 4.5 },
  { code: "71136", name: "احمد مختار رفاعى محمد عيسوى", dept: "الخامات", title: "أمين مخزن", annualBalance: 20 },
  { code: "70573", name: "محمد إبراهيم رزق خليل", dept: "الخامات", title: "عامل خدمات", annualBalance: 22 },
  // مخازن المنتج التام
  { code: "70436", name: "محمود محمد عبدالسميع غالى", dept: "المنتج التام", title: "رئيس قسم المنتج التام", annualBalance: 14 },
  { code: "70499", name: "محمد عبدالرازق الرفاعى أحمد", dept: "المنتج التام", title: "مشرف مخازن", annualBalance: 18 },
  { code: "70290", name: "علاء محمد محمد هلال البحيرى", dept: "المنتج التام", title: "مسئول أول خروج بضاعة", annualBalance: 22.25 },
  { code: "70291", name: "سامح أحمد السعيد أحمد فايد", dept: "المنتج التام", title: "مشرف مخازن", annualBalance: 16 },
  // قطع الغيار والمخازن العامة وحركة المعدات
  { code: "70810", name: "رمضان زينهم إبراهيم حسن", dept: "المخازن العامة", title: "رئيس قسم المخازن العامة", annualBalance: 15 },
  { code: "70845", name: "أيمن عليوة عبدالحميد سليم", dept: "حركة المعدات", title: "مدير حركة المعدات", annualBalance: 12 },
  { code: "70890", name: "عمرو شريف إبراهيم الدسوقي", dept: "قطع الغيار", title: "رئيس قسم مخزن قطع الغيار", annualBalance: 11 },
  { code: "70912", name: "خالد صبحي عبدالمجيد منصور", dept: "قطع الغيار", title: "أمين مخزن قطع غيار", annualBalance: 8.5 },
  { code: "70933", name: "ياسر عبدالرحمن أحمد الشريف", dept: "المخازن العامة", title: "أمين مخزن", annualBalance: 14 }
];

/**
 * الحصول على البريد الإلكتروني لحساب Google المفتوح (مقدم الطلب)
 */
export const getInitialSubmitterEmail = (): string => {
  if (typeof window !== 'undefined' && window.location) {
    const params = new URLSearchParams(window.location.search);
    const urlEmail = params.get('email') || params.get('u') || params.get('user');
    if (urlEmail && urlEmail.trim()) {
      const clean = urlEmail.trim().toLowerCase();
      localStorage.setItem('active_google_user_email', clean);
      return clean;
    }
  }

  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('active_google_user_email');
    if (saved && saved.trim()) {
      // البريد المحفوظ يدوياً (حتى بريد المسؤول) يبقى بعد إعادة تحميل الصفحة؛
      // الاستبعاد التلقائي لبريد المطوّر يتم فقط عند الكشف التلقائي من الخادم.
      return saved.trim().toLowerCase();
    }
  }

  return '';
};

/**
 * الكشف التلقائي عن حساب Google المفتوح في المتصفح في الخلفية
 */
export const detectActiveGoogleUser = async (): Promise<string> => {
  const initial = getInitialSubmitterEmail();
  if (initial) return initial;

  try {
    const gasUrl = `${DEFAULT_GAS_URL}?action=getActiveUser&t=${Date.now()}`;
    const res = await fetch(gasUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.email && data.email.includes('@')) {
        const clean = data.email.trim().toLowerCase();
        if (clean !== 'sadat.planning.officer@dakahlia.net') {
          setStoredSubmitterEmail(clean);
          return clean;
        }
      }
    }
  } catch (e) {
    console.log('Google session check (silent):', e);
  }

  return '';
};

export const getStoredSubmitterEmail = (): string => {
  return getInitialSubmitterEmail();
};

export const setStoredSubmitterEmail = (email: string) => {
  if (typeof localStorage !== 'undefined') {
    if (email && email.trim()) {
      localStorage.setItem('active_google_user_email', email.trim().toLowerCase());
    } else {
      localStorage.removeItem('active_google_user_email');
    }
  }
};

export const clearStoredSubmitterEmail = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('active_google_user_email');
  }
};

/**
 * حفظ قائمة الموظفين يدوياً في التخزين المحلي
 */
export const saveCustomEmployees = (employees: Employee[]) => {
  if (typeof localStorage !== 'undefined' && Array.isArray(employees) && employees.length > 0) {
    localStorage.setItem('synced_employees_data', JSON.stringify(employees));
    localStorage.setItem('synced_employees_timestamp', new Date().toISOString());
    localStorage.setItem('synced_employees_source', 'manual_paste');
  }
};

/**
 * دالة تحليل صفوف الشيت المنسوخة مباشرة (يدعم النسخ من Excel أو Google Sheets)
 */
export const parsePastedSheetData = (rawText: string): Employee[] => {
  if (!rawText || !rawText.trim()) return [];

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  // فحص نوع الفاصل (Tab هو الافتراضي عند النسخ من Sheets/Excel)
  const firstLine = lines[0];
  let delimiter = '\t';
  if (!firstLine.includes('\t') && firstLine.includes(',')) delimiter = ',';
  else if (!firstLine.includes('\t') && firstLine.includes(';')) delimiter = ';';

  const rows = lines.map(line => line.split(delimiter).map(cell => cell.trim().replace(/^["']|["']$/g, '')));

  // محاولة معرفة فهارس الأعمدة من الصف الأول إن كان يحتوي على عناوين
  const header = rows[0];
  let codeIdx = -1;
  let nameIdx = -1;
  let deptIdx = -1;
  let titleIdx = -1;
  let balIdx = -1;
  let emailIdx = -1;

  for (let c = 0; c < header.length; c++) {
    const h = header[c].toLowerCase();
    if (codeIdx === -1 && (h.includes('كود') || h.includes('code'))) codeIdx = c;
    else if (nameIdx === -1 && (h.includes('اسم') || h.includes('name'))) nameIdx = c;
    else if (deptIdx === -1 && (h.includes('قسم') || h.includes('إدارة') || h.includes('ادارة') || h.includes('dept'))) deptIdx = c;
    else if (titleIdx === -1 && (h.includes('وظيفة') || h.includes('title') || h.includes('job') || h.includes('مهنة'))) titleIdx = c;
    else if (balIdx === -1 && (h.includes('رصيد') || h.includes('balance'))) balIdx = c;
    else if (emailIdx === -1 && (h.includes('بريد') || h.includes('ايميل') || h.includes('email'))) emailIdx = c;
  }

  let startRow = 0;
  if (codeIdx !== -1 && nameIdx !== -1) {
    startRow = 1; // الصف الأول عناوين
  } else {
    // تخمين تلقائي: هل أول صف عناوين؟
    const sample0 = rows[0][0] || '';
    const sample1 = rows[0][1] || '';
    const isHeader = isNaN(Number(sample0)) && (sample0.includes('كود') || sample0.includes('اسم') || sample0.trim() === 'م' || sample1.includes('اسم') || sample1.includes('كود'));
    startRow = isHeader ? 1 : 0;

    // نمط 1: عمود 0 مسلسل، عمود 1 كود، عمود 2 اسم، عمود 3 قسم، عمود 4 رصيد، عمود 5 وظيفة
    // نمط 2: عمود 0 كود، عمود 1 اسم، عمود 2 قسم، عمود 3 وظيفة، عمود 4 رصيد
    let col0Digits = 0;
    let col1Digits = 0;
    for (let r = startRow; r < Math.min(rows.length, 10); r++) {
      if (rows[r][0] && !isNaN(Number(rows[r][0]))) col0Digits++;
      if (rows[r][1] && !isNaN(Number(rows[r][1]))) col1Digits++;
    }

    if (col1Digits >= col0Digits && col1Digits > 0) {
      codeIdx = 1;
      nameIdx = 2;
      deptIdx = 3;
      balIdx = 4;
      titleIdx = 5;
    } else {
      codeIdx = 0;
      nameIdx = 1;
      deptIdx = 2;
      titleIdx = 3;
      balIdx = 4;
    }
  }

  const result: Employee[] = [];
  const seenCodes = new Set<string>();

  for (let r = startRow; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 0) continue;

    let rawCode = (codeIdx !== -1 && row[codeIdx]) ? row[codeIdx] : '';
    let rawName = (nameIdx !== -1 && row[nameIdx]) ? row[nameIdx] : '';

    if (!rawName || rawName === 'الاسم' || rawCode === 'كود') {
      // محاولة بديلة
      if (!rawName && row[1] && isNaN(Number(row[1])) && row[1].length > 2) {
        rawName = row[1];
        rawCode = row[0] || '';
      }
      if (!rawName) continue;
    }

    let code = rawCode || `EMP${r + 1}`;
    if (seenCodes.has(code)) {
      code = `${code}_${r + 1}`;
    }
    seenCodes.add(code);

    const dept = (deptIdx !== -1 && row[deptIdx]) ? row[deptIdx] : 'إدارة المخازن';
    const title = (titleIdx !== -1 && row[titleIdx]) ? row[titleIdx] : '';
    
    let balance = 0;
    if (balIdx !== -1 && row[balIdx]) {
      const num = Number(row[balIdx]);
      if (!isNaN(num)) balance = num;
    }

    let email = '';
    if (emailIdx !== -1 && row[emailIdx] && row[emailIdx].includes('@')) {
      email = row[emailIdx].toLowerCase();
    } else {
      for (const cell of row) {
        if (cell && cell.includes('@')) {
          email = cell.toLowerCase();
          break;
        }
      }
    }

    if (!email) {
      email = (code === '70335') ? 'ahmed.hamdan@dakahlia.net' : `emp.${code}@dakahlia.net`;
    }

    result.push({
      code,
      name: rawName,
      dept: dept || 'إدارة المخازن',
      title: title || '',
      annualBalance: balance,
      email
    });
  }

  return result;
};

/**
 * مزامنة وسحب كافة صفوف الموظفين من شيت Google
 */
export const fetchEmployeesFromSheet = async (): Promise<{
  success: boolean;
  employees: Employee[];
  source: 'apps_script' | 'google_sheet_api' | 'cache' | 'seed' | 'manual_paste';
  activeUser?: string;
  error?: string;
  totalRows?: number;
  isFallback?: boolean;
}> => {
  // 1. الاستعلام من خادم Google Apps Script المحدث (GET)
  try {
    const gasUrl = `${DEFAULT_GAS_URL}?action=getEmployees&t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(gasUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        if (result.success && Array.isArray(result.employees) && result.employees.length > 0) {
          localStorage.setItem('synced_employees_data', JSON.stringify(result.employees));
          localStorage.setItem('synced_employees_timestamp', new Date().toISOString());
          localStorage.setItem('synced_employees_source', 'apps_script');
          if (result.activeUser && result.activeUser !== 'sadat.planning.officer@dakahlia.net') {
            setStoredSubmitterEmail(result.activeUser);
          }
          return {
            success: true,
            employees: result.employees,
            source: 'apps_script',
            activeUser: result.activeUser,
            totalRows: result.totalRowsScanned || result.employees.length,
            isFallback: false
          };
        }
      } catch (jsonErr) {
        console.warn('Apps Script response was not JSON, checking fallback methods...', text.substring(0, 150));
      }
    }
  } catch (err) {
    console.warn('Apps Script GET fetch failed, attempting POST query...', err);
  }

  // 2. الاستعلام من Google Apps Script عبر POST (في حال وجود قيود على GET)
  try {
    const response = await fetch(DEFAULT_GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'getEmployees' })
    });
    if (response.ok) {
      const text = await response.text();
      try {
        const result = JSON.parse(text);
        if (result.success && Array.isArray(result.employees) && result.employees.length > 0) {
          localStorage.setItem('synced_employees_data', JSON.stringify(result.employees));
          localStorage.setItem('synced_employees_timestamp', new Date().toISOString());
          localStorage.setItem('synced_employees_source', 'apps_script');
          return {
            success: true,
            employees: result.employees,
            source: 'apps_script',
            totalRows: result.totalRowsScanned || result.employees.length,
            isFallback: false
          };
        }
      } catch (e) {}
    }
  } catch (postErr) {
    console.warn('Apps Script POST failed:', postErr);
  }

  // 3. الاستعلام المباشر من Google Sheets عبر واجهة GViz مع كشف ذكي لكافة الأعمدة والصفوف
  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_DATA_TAB}&t=${Date.now()}`;
    const sheetRes = await fetch(gvizUrl);
    if (sheetRes.ok) {
      const text = await sheetRes.text();
      const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);/);
      if (match && match[1]) {
        const json = JSON.parse(match[1]);
        const rows = json.table?.rows || [];
        
        if (rows.length > 0) {
          // استكشاف الأعمدة
          let codeCol = 1;
          let nameCol = 2;
          let deptCol = 3;
          let balCol = 4;
          let titleCol = 5;
          let emailCol = 6;

          // فحص أول صف إذا كانت الخلية 0 رقماً أم حرفاً
          const firstRow = rows[0]?.c;
          if (firstRow && firstRow[0]?.v && String(firstRow[0]?.v).length >= 4 && !isNaN(Number(firstRow[0]?.v))) {
            codeCol = 0;
            nameCol = 1;
            deptCol = 2;
            balCol = 3;
            titleCol = 4;
            emailCol = 5;
          }

          const parsedEmployees: Employee[] = [];
          for (let i = 0; i < rows.length; i++) {
            const r = rows[i];
            if (!r.c) continue;

            const codeVal = r.c[codeCol]?.v !== null && r.c[codeCol]?.v !== undefined ? String(r.c[codeCol]?.v).trim() : (r.c[0]?.v ? String(r.c[0]?.v).trim() : '');
            const nameVal = r.c[nameCol]?.v !== null && r.c[nameCol]?.v !== undefined ? String(r.c[nameCol]?.v).trim() : (r.c[1]?.v ? String(r.c[1]?.v).trim() : '');
            
            if (!nameVal || nameVal === 'الاسم' || codeVal === 'الكود') continue;

            const deptVal = r.c[deptCol]?.v !== null && r.c[deptCol]?.v !== undefined ? String(r.c[deptCol]?.v).trim() : 'إدارة المخازن';
            const balRaw = r.c[balCol]?.v;
            const balanceVal = balRaw !== null && balRaw !== undefined && !isNaN(Number(balRaw)) ? Number(balRaw) : 0;
            const titleVal = r.c[titleCol]?.v !== null && r.c[titleCol]?.v !== undefined ? String(r.c[titleCol]?.v).trim() : '';
            
            let emailVal = '';
            if (r.c[emailCol]?.v && String(r.c[emailCol]?.v).includes('@')) {
              emailVal = String(r.c[emailCol]?.v).trim().toLowerCase();
            } else {
              for (const cell of r.c) {
                if (cell && cell.v && String(cell.v).includes('@')) {
                  emailVal = String(cell.v).trim().toLowerCase();
                  break;
                }
              }
            }

            parsedEmployees.push({
              code: codeVal || `EMP${i + 1}`,
              name: nameVal,
              dept: deptVal || 'إدارة المخازن',
              annualBalance: balanceVal,
              title: titleVal || '',
              email: emailVal || (codeVal === '70335' ? 'ahmed.hamdan@dakahlia.net' : `emp.${codeVal || i}@dakahlia.net`)
            });
          }

          if (parsedEmployees.length > 0) {
            localStorage.setItem('synced_employees_data', JSON.stringify(parsedEmployees));
            localStorage.setItem('synced_employees_timestamp', new Date().toISOString());
            localStorage.setItem('synced_employees_source', 'google_sheet_api');
            return {
              success: true,
              employees: parsedEmployees,
              source: 'google_sheet_api',
              totalRows: parsedEmployees.length,
              isFallback: false
            };
          }
        }
      }
    }
  } catch (err) {
    console.warn('Direct Google Sheet query failed, checking cached data...', err);
  }

  // 4. المحاولة الرابعة: الاستعادة من الذاكرة المحلية Cached Data
  if (typeof localStorage !== 'undefined') {
    const cached = localStorage.getItem('synced_employees_data');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const savedSource = (localStorage.getItem('synced_employees_source') as any) || 'cache';
          return {
            success: true,
            employees: parsed,
            source: savedSource,
            totalRows: parsed.length,
            isFallback: false
          };
        }
      } catch (e) {
        console.error('Failed to parse cached employees', e);
      }
    }
  }

  // 5. البديل النهائي: النسخة الاحتياطية
  return {
    success: true,
    employees: INITIAL_SHEET_SEED,
    source: 'seed',
    totalRows: INITIAL_SHEET_SEED.length,
    isFallback: true
  };
};

/**
 * إرسال طلب الإجازة إلى Google Apps Script
 */
export const submitLeaveRequest = async (request: any): Promise<{ success: boolean, requestId?: string, error?: string }> => {
  try {
    const empEmail = request.employeeEmail || request.submitterEmail || getStoredSubmitterEmail() || '';
    const payload = {
      ...request,
      employeeEmail: empEmail,
      submitterEmail: request.submitterEmail || getStoredSubmitterEmail() || empEmail
    };

    await fetch(DEFAULT_GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      success: true,
      requestId: request.requestId
    };
  } catch (error) {
    console.error('Submission Error:', error);
    return {
      success: false,
      error: 'فشل في الاتصال بخوادم جوجل. تأكد من صحة الرابط المنشور في ملف gasService.ts'
    };
  }
};

/**
 * جلب حالة وتوقيعات الطلبات من الشيت لتحديث "سجل طلباتي"
 * (الحالة تتغير في الخادم عند اعتماد/رفض المديرين، بينما النسخة المحلية كانت تبقى دائماً "في انتظار المدير المباشر")
 */
export const fetchRequestStatuses = async (
  ids: string[]
): Promise<Record<string, { status: string; signatures: string[] }>> => {
  const cleanIds = ids.filter(Boolean).slice(0, 100);
  if (cleanIds.length === 0) return {};
  try {
    const url = `${DEFAULT_GAS_URL}?action=getStatuses&ids=${encodeURIComponent(cleanIds.join(','))}&t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json' }, signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return {};
    const json = await res.json();
    return json && json.success && json.statuses ? json.statuses : {};
  } catch (err) {
    console.warn('Status refresh failed (silent):', err);
    return {};
  }
};
