
/**
 * نظام إدارة الإجازات - شركة الدقهلية للدواجن
 * ISO Form: F-HR-601
 * قطاع المخازن - نظام التوجيه الديناميكي للأقسام
 */

const CONFIG = {
  SHEET_NAME: 'Requests_Warehouses_ISO',
  LOGO_BASE64: 'data:image/jpeg;base64,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',
  
  // تعريف الأقسام ومديريها المباشرين
  DEPARTMENTS: {
    "التخطيط و المتابعة": {
      managerEmail: "ahmed.hamdan@dakahlia.net",
      managerName: "أ/ رئيس قسم التخطيط و المتابعة"
    },
    // الاسم كما يظهر في شيت الموظفين (تبويب data)
    "التخطيط": {
      managerEmail: "ahmed.hamdan@dakahlia.net",
      managerName: "أ/ رئيس قسم التخطيط"
    },
    "إدارة المخازن": {
      managerEmail: "ahmed.hamdan@dakahlia.net",
      managerName: "أ/ مدير إدارة المخازن"
    },
    "الخامات": {
      managerEmail: "raw.store.mgr@dakahlia.net",
      managerName: "أ/ رئيس قسم مخزن الخامات"
    },
    "المنتج التام": {
      managerEmail: "finished.store@dakahlia.net",
      managerName: "أ/ رئيس قسم المنتج التام"
    },
    "قطع الغيار": {
      managerEmail: "spareparts.store@dakahlia.net",
      managerName: "أ/ رئيس قسم قطع الغيار"
    },
    "المخازن العامة": {
      managerEmail: "general.store@dakahlia.net",
      managerName: "أ/ رئيس قسم المخازن العامة"
    },
    "حركة المعدات": {
      managerEmail: "equipment.mgr@dakahlia.net",
      managerName: "أ/ مدير حركة المعدات"
    }
  },

  // استثناء إداري خاص بمدير المخازن (المدير الأعلى المعتمد عليه)
  WAREHOUSE_DIRECTOR_EXCEPTION: {
    directorEmail: "ahmed.hamdan@dakahlia.net",
    directorName: "أ/ أحمد حمدان",
    directorCode: "70335",
    managerEmail: "abdelhady.saleh@dakahlia.net",
    managerName: "أ/ عبد الهادي صالح"
  },

  // الجهات الموحدة
  FINAL_APPROVERS: {
    DEPT_HEAD: {
      email: "ahmed.hamdan@dakahlia.net",
      name: "أ/ مدير الاداره"
    },
    HR: {
      // قائمة إيميلات مسؤولي الموارد البشرية (يمكن وضع 3 إيميلات أو أكثر لتصلهم جميعاً نسخة من طلب الإجازة)
      emails: [
        "sadat.planning.officer@dakahlia.net",
        "taha.zaki@dakahlia.net",
        "hr2@dakahlia.net"
      ],
      email: "sadat.planning.officer@dakahlia.net",
      name: "إدارة الموارد البشرية"
    }
  }
};

/**
 * جلب جميع إيميلات مسؤولي الموارد البشرية مفصولة بفواصل للإرسال الجماعي
 */
function getHREmails() {
  const hrConfig = CONFIG.FINAL_APPROVERS && CONFIG.FINAL_APPROVERS.HR;
  if (!hrConfig) return "sadat.planning.officer@dakahlia.net";
  
  if (Array.isArray(hrConfig.emails) && hrConfig.emails.length > 0) {
    return hrConfig.emails.filter(Boolean).map(function(e) { return String(e).trim(); }).join(', ');
  }
  if (Array.isArray(hrConfig.email) && hrConfig.email.length > 0) {
    return hrConfig.email.filter(Boolean).map(function(e) { return String(e).trim(); }).join(', ');
  }
  if (typeof hrConfig.emails === 'string' && hrConfig.emails.trim()) {
    return hrConfig.emails.trim();
  }
  return String(hrConfig.email || 'sadat.planning.officer@dakahlia.net').trim();
}

/**
 * التحقق مما إذا كان الطلب يخص مدير المخازن (أ/ أحمد حمدان)
 * المطابقة بالكود أو بالبريد فقط. لا نطابق بالاسم الجزئي أو بالمسمى الوظيفي
 * لأن ذلك كان يوجّه طلبات موظفين آخرين (مثل مدير اللوجستيه أو أي اسم يحتوي "حمدان") إلى مسار الاستثناء بالخطأ.
 */
function isWarehouseDirectorRequest(data) {
  if (!data) return false;
  const email = String(data.employeeEmail || data.submitterEmail || '').trim().toLowerCase();
  const code = String(data.employeeCode || '').trim();
  const exc = CONFIG.WAREHOUSE_DIRECTOR_EXCEPTION;

  return email === exc.directorEmail.toLowerCase() || code === exc.directorCode;
}

/**
 * بيانات القسم ومديره، مع قسم احتياطي إذا لم يُعرَّف القسم في CONFIG
 */
function getDeptInfo(department) {
  return CONFIG.DEPARTMENTS[String(department || '').trim()] || CONFIG.DEPARTMENTS["إدارة المخازن"];
}

/**
 * تهريب أي نص قادم من المستخدم قبل وضعه داخل رسائل HTML (منع حقن HTML في الإيميلات)
 */
function esc(val) {
  return String(val === null || val === undefined ? '' : val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escObj(obj) {
  const out = {};
  Object.keys(obj || {}).forEach(function(k) { out[k] = esc(obj[k]); });
  return out;
}

// حالات الطلب في الشيت والمرحلة المطلوبة لكل دور
const STAGE_BY_ROLE = {
  'المدير المباشر': 'PENDING_MANAGER',
  'المدير العام (المشرف على مدير المخازن)': 'PENDING_MANAGER',
  'مدير الإدارة': 'PENDING_DEPT_HEAD',
  'مدير الإدارة (المشرف العام)': 'PENDING_DEPT_HEAD',
  'الموارد البشرية': 'PENDING_HR'
};

/**
 * دالة مساعدة لتنسيق التاريخ ليظهر dd/mm/yyyy فقط
 */
function formatSimpleDate(val) {
  if (!val) return "";
  try {
    // إذا كانت القيمة كائن تاريخ
    if (val instanceof Date) {
      return Utilities.formatDate(val, "Africa/Cairo", "dd/MM/yyyy");
    }
    // إذا كانت نصاً طويلاً ناتجاً عن تحويل تاريخ
    if (typeof val === 'string' && val.includes('GMT')) {
      return Utilities.formatDate(new Date(val), "Africa/Cairo", "dd/MM/yyyy");
    }
    // إذا كانت نصاً بتنسيق yyyy-mm-dd (من Frontend)
    if (typeof val === 'string' && val.includes('-') && val.split('-')[0].length === 4) {
      const parts = val.split('-');
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return String(val);
  } catch (e) {
    return String(val);
  }
}

/**
 * معالجة طلبات POST
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // فحص طلب مزامنة كافة الموظفين عبر POST
    if (data && data.action === 'getEmployees') {
      return ContentService.createTextOutput(JSON.stringify(getEmployeesData()))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // التحقق من البيانات الأساسية قبل أي كتابة أو إرسال
    if (!data || !data.employeeName || !data.startDate || !data.endDate || !(Number(data.daysCount) > 0)) {
      throw new Error('بيانات الطلب ناقصة (الاسم / تاريخ البداية / تاريخ النهاية / عدد الأيام).');
    }

    const requestId = data.requestId || 'REQ' + new Date().getTime();

    const deptInfo = getDeptInfo(data.department);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      // 15 عموداً: يجب أن تطابق عدد القيم المضافة في كل طلب (كان ينقص عنوان Submitter Email)
      sheet.appendRow(['ID', 'Date Created', 'Emp Code', 'Emp Name', 'Title', 'Dept', 'Leave Type', 'Start Date', 'End Date', 'Days', 'Status', 'Reason', 'Email', 'Signatures', 'Submitter Email']);
    }

    // منع التكرار: إذا وصل نفس رقم الطلب مرتين (نقر مزدوج / إعادة محاولة) لا نكرر الصف ولا الإيميلات
    if (sheet.getLastRow() > 1) {
      const existingIds = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
      for (let i = 0; i < existingIds.length; i++) {
        if (String(existingIds[i][0]) === String(requestId)) {
          return ContentService.createTextOutput(JSON.stringify({ success: true, requestId: requestId, duplicate: true }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    const today = formatSimpleDate(data.issueDate || new Date());
    const startDate = formatSimpleDate(data.startDate);
    const endDate = formatSimpleDate(data.endDate);

    // استخراج بريد حساب Google النشط من المتصفح تلقائياً (مثل Google Forms)
    var browserEmail = '';
    try {
      browserEmail = Session.getActiveUser().getEmail();
    } catch (e) {}
    // تنبيه حاسم: لا نستخدم مطلقاً Session.getEffectiveUser() لأنها ترجع إيميل المطور/المشرف لكل الزائرين
    const submitterEmail = browserEmail || data.submitterEmail || '';
    const employeeEmail = String(data.employeeEmail || submitterEmail || '').trim();

    // نكتب الصف كنص (@) حتى لا يحوّل Google Sheets التاريخ dd/MM/yyyy إلى تاريخ بصيغة المنطقة (فيُقلب اليوم والشهر)
    const newRowIndex = sheet.getLastRow() + 1;
    const rowRange = sheet.getRange(newRowIndex, 1, 1, 15);
    rowRange.setNumberFormat('@');
    rowRange.setValues([[
      requestId,
      today,
      data.employeeCode,
      data.employeeName,
      data.jobTitle,
      data.department,
      data.leaveType,
      startDate,
      endDate,
      data.daysCount,
      'PENDING_MANAGER',
      data.reason || '',
      employeeEmail,
      JSON.stringify([]),
      submitterEmail
    ]]);
    
    const empDataForPdf = {
      employeeName: String(data.employeeName),
      employeeCode: String(data.employeeCode),
      jobTitle: String(data.jobTitle),
      department: String(data.department),
      leaveType: String(data.leaveType),
      daysCount: String(data.daysCount),
      startDate: startDate,
      endDate: endDate,
      reason: String(data.reason || 'لا يوجد'),
      today: today,
      employeeEmail: employeeEmail,
      submitterEmail: submitterEmail
    };

    const isDirector = isWarehouseDirectorRequest(empDataForPdf);
    let targetManagerEmail = deptInfo.managerEmail;
    let targetRole = 'المدير المباشر';

    // تطبيق استثناء مدير المخازن (أ/ أحمد حمدان يتبع أ/ عبد الهادي صالح)
    if (isDirector) {
      targetManagerEmail = CONFIG.WAREHOUSE_DIRECTOR_EXCEPTION.managerEmail;
      targetRole = 'المدير العام (المشرف على مدير المخازن)';
    }

    let pdf = generateFinalPDF(requestId, empDataForPdf, []);
    sendApprovalMail(targetManagerEmail, targetRole, requestId, empDataForPdf, pdf);

    return ContentService.createTextOutput(JSON.stringify({ success: true, requestId: requestId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (err) {
    console.error("Critical Error: " + err.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * معالجة طلبات GET
 */
function doGet(e) {
  // 1. مزامنة وسحب كافة صفوف الموظفين من الشيت (تبويب data)
  if (e && e.parameter && e.parameter.action === 'getEmployees') {
    return ContentService.createTextOutput(JSON.stringify(getEmployeesData()))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 2. فحص استعلام المستخدم النشط لجلسة المتصفح
  if (e && e.parameter && e.parameter.action === 'getActiveUser') {
    var activeEmail = '';
    try {
      activeEmail = Session.getActiveUser().getEmail();
    } catch (e) {}
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      email: activeEmail || ''
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // 3. حالات الطلبات (لتحديث سجل "طلباتي" في الواجهة): ?action=getStatuses&ids=ID1,ID2
  if (e && e.parameter && e.parameter.action === 'getStatuses') {
    return ContentService.createTextOutput(JSON.stringify(getRequestStatuses(e.parameter.ids)))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 4. دورة الموافقات والاعتمادات
  const id = e && e.parameter ? e.parameter.id : null;
  const action = e && e.parameter ? e.parameter.action : null;
  const role = e && e.parameter ? e.parameter.role : null;
  try {
    if (action !== 'approve' && action !== 'reject') {
      throw 'رابط غير صالح.';
    }
    const result = handleWorkflowStep(id, action, role);
    let color = action === 'approve' ? '#166534' : '#991b1b';
    if (result.ok === false) color = '#92400e';
    return HtmlService.createHtmlOutput(`
      <div dir="rtl" style="font-family: Arial; text-align: center; padding: 50px;">
        <h1 style="color: ${color};">${esc(result.message)}</h1>
        <p style="color: #666;">${result.ok === false ? 'لم يتم تغيير أي شيء في السجلات.' : 'تم تحديث سجلات النظام بنجاح.'}</p>
      </div>
    `);
  } catch (err) {
    return HtmlService.createHtmlOutput(`<div dir="rtl" style="font-family: Arial; text-align: center; padding: 50px;"><h1 style="color:#991b1b;">خطأ: ${esc(err)}</h1></div>`);
  }
}

/**
 * إرجاع حالة وتوقيعات مجموعة طلبات (حتى 100 طلب) من الشيت
 */
function getRequestStatuses(idsParam) {
  try {
    const ids = String(idsParam || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean).slice(0, 100);
    const result = {};
    if (ids.length === 0) return { success: true, statuses: result };

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG.SHEET_NAME);
    if (!sheet || sheet.getLastRow() < 2) return { success: true, statuses: result };

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 14).getValues();
    for (let i = 0; i < values.length; i++) {
      const rid = String(values[i][0]);
      if (ids.indexOf(rid) === -1) continue;
      let sigs = [];
      try { sigs = JSON.parse(values[i][13] || '[]'); } catch (e2) {}
      result[rid] = { status: String(values[i][10] || 'PENDING_MANAGER'), signatures: sigs };
    }
    return { success: true, statuses: result };
  } catch (err) {
    return { success: false, error: err.toString() };
  }
}

/**
 * دالة قراءة وسحب كافة صفوف الموظفين من تبويب data في شيت Google بلا أي حد أقصى
 */
function getEmployeesData() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      try {
        ss = SpreadsheetApp.openById('1n2sp5TNNGL3M5_LRNJ7IMLXXWoH6-kL8r4eGZokISCs');
      } catch (errOpen) {
        console.error("openById error: " + errOpen.toString());
      }
    }
    if (!ss) {
      return { success: false, error: "تعذر فتح ملف Google Sheets" };
    }

    // البحث عن تبويب البيانات: نفضّل التبويب الذي يحتوي عمود "المتبقي من رصيد الإجازات" (العمود L)
    var candidateNames = ['data', 'Data', 'DATA', 'Summary', 'summary', 'الموظفين', 'بيانات الموظفين', 'تصريح اجازات'];
    var candidates = [];
    for (var ci = 0; ci < candidateNames.length; ci++) {
      var cs = ss.getSheetByName(candidateNames[ci]);
      if (cs) candidates.push(cs);
    }
    var sheet = null;
    for (var si = 0; si < candidates.length && !sheet; si++) {
      var lc = candidates[si].getLastColumn();
      if (lc < 1) continue;
      var hdr = candidates[si].getRange(1, 1, 1, lc).getValues()[0];
      for (var hi = 0; hi < hdr.length; hi++) {
        if (String(hdr[hi] || '').indexOf('المتبقي') > -1) { sheet = candidates[si]; break; }
      }
    }
    if (!sheet) sheet = candidates[0] || ss.getSheets()[0];

    if (!sheet) {
      return { success: false, error: "لم يتم العثور على تبويب data في الشيت" };
    }

    var lastRow = sheet.getLastRow();
    var lastCol = sheet.getLastColumn();
    if (lastRow <= 1) {
      return { success: true, employees: [], count: 0, totalRows: lastRow };
    }

    // لا نتجاوز عدد الأعمدة الفعلي للشيت وإلا يفشل getRange إذا كان عدد أعمدة الشيت أقل من 10
    var maxCols = Math.max(lastCol, 1);
    // قراءة كل الصفوف بالكامل من الصف 1 حتى آخر صف مسجل
    var range = sheet.getRange(1, 1, lastRow, maxCols);
    var values = range.getValues();
    if (!values || values.length <= 1) {
      return { success: true, employees: [], count: 0, totalRows: lastRow };
    }

    var headerRow = values[0];
    var codeCol = -1;
    var nameCol = -1;
    var deptCol = -1;
    var titleCol = -1;
    var balanceCol = -1;
    var emailCol = -1;

    // استكشاف ترتيب الأعمدة تلقائياً من صف العناوين
    for (var c = 0; c < headerRow.length; c++) {
      var h = String(headerRow[c] || '').trim().toLowerCase();
      if (!h) continue;
      if (codeCol === -1 && (h.indexOf('كود') > -1 || h.indexOf('code') > -1)) {
        codeCol = c;
      } else if (nameCol === -1 && (h.indexOf('اسم') > -1 || h.indexOf('name') > -1)) {
        nameCol = c;
      } else if (deptCol === -1 && (h.indexOf('قسم') > -1 || h.indexOf('إدارة') > -1 || h.indexOf('ادارة') > -1 || h.indexOf('dept') > -1)) {
        deptCol = c;
      } else if (titleCol === -1 && (h.indexOf('وظيفة') > -1 || h.indexOf('الوظيفة') > -1 || h.indexOf('title') > -1 || h.indexOf('job') > -1 || h.indexOf('مهنة') > -1)) {
        titleCol = c;
      } else if (balanceCol === -1 && (h.indexOf('رصيد') > -1 || h.indexOf('balance') > -1)) {
        balanceCol = c;
      } else if (emailCol === -1 && (h.indexOf('بريد') > -1 || h.indexOf('ايميل') > -1 || h.indexOf('email') > -1 || h.indexOf('mail') > -1)) {
        emailCol = c;
      }
    }

    // الرصيد المعتمد = "المتبقي من رصيد الإجازات" (العمود L). إن لم يوجد العنوان نستخدم العمود L إذا كان عنوانه يخص الرصيد.
    var remainingCol = -1;
    for (var rc = 0; rc < headerRow.length; rc++) {
      if (String(headerRow[rc] || '').indexOf('المتبقي') > -1) { remainingCol = rc; break; }
    }
    if (remainingCol === -1 && headerRow.length > 11 && String(headerRow[11] || '').indexOf('رصيد') > -1) {
      remainingCol = 11;
    }
    if (remainingCol !== -1) balanceCol = remainingCol;

    // إذا لم تُكتشف العناوين صراحة، نتحقق من نمط الصفوف الأولى
    var startRow = 1;
    if (codeCol === -1 || nameCol === -1) {
      var col0Numeric = 0;
      var col1Numeric = 0;
      var sampleLimit = Math.min(values.length, 15);

      for (var s = 1; s < sampleLimit; s++) {
        var v0 = String(values[s][0] || '').trim();
        var v1 = String(values[s][1] || '').trim();
        if (v0 && !isNaN(Number(v0)) && v0.length >= 3) col0Numeric++;
        if (v1 && !isNaN(Number(v1)) && v1.length >= 3) col1Numeric++;
      }

      if (col1Numeric >= col0Numeric && col1Numeric > 0) {
        // نمط وجود عمود مسلسل A: عمود 0=م، عمود 1=كود، عمود 2=اسم، عمود 3=قسم، عمود 4=رصيد، عمود 5=وظيفة
        codeCol = 1;
        nameCol = 2;
        deptCol = 3;
        balanceCol = 4;
        titleCol = 5;
        emailCol = 6;
      } else {
        // نمط البدء مباشرة: عمود 0=كود، عمود 1=اسم، عمود 2=قسم، عمود 3=وظيفة، عمود 4=رصيد
        codeCol = 0;
        nameCol = 1;
        deptCol = 2;
        titleCol = 3;
        balanceCol = 4;
        emailCol = 5;
      }

      // لا توجد عناوين معروفة: إذا كان الصف الأول يبدو كبيانات موظف (كود رقمي) فلا نتخطاه
      var firstCode = String(values[0][codeCol] || '').trim();
      if (firstCode && !isNaN(Number(firstCode)) && firstCode.length >= 3) {
        startRow = 0;
      }
    }

    var employees = [];
    var seenCodes = {};

    for (var r = startRow; r < values.length; r++) {
      var row = values[r];
      if (!row || row.length === 0) continue;

      var rawCode = row[codeCol] !== undefined && row[codeCol] !== null ? String(row[codeCol]).trim() : '';
      var rawName = row[nameCol] !== undefined && row[nameCol] !== null ? String(row[nameCol]).trim() : '';

      // تخطي الصفوف الفارغة أو صفوف العناوين المكررة
      if (!rawName || rawName === 'الاسم' || rawName === 'اسم الموظف' || rawCode === 'كود' || rawCode === 'الكود') {
        // محاولة في حال كان الاسم في العمود 1 والكود في العمود 0
        if (!rawName && row[1] && isNaN(Number(row[1])) && String(row[1]).length > 2) {
          rawName = String(row[1]).trim();
          rawCode = String(row[0] || '').trim();
        }
        if (!rawName) continue;
      }

      var code = rawCode || ('EMP' + (r + 1));
      if (seenCodes[code]) {
        code = code + '_' + (r + 1);
      }
      seenCodes[code] = true;

      var dept = deptCol !== -1 && row[deptCol] !== undefined && row[deptCol] !== null ? String(row[deptCol]).trim() : 'إدارة المخازن';
      var title = titleCol !== -1 && row[titleCol] !== undefined && row[titleCol] !== null ? String(row[titleCol]).trim() : '';
      
      var rawBal = balanceCol !== -1 ? row[balanceCol] : null;
      var balance = 0;
      if (rawBal !== null && rawBal !== undefined && rawBal !== '') {
        var num = Number(rawBal);
        if (!isNaN(num)) balance = num;
      }

      // استخراج الإيميل
      var email = '';
      if (emailCol !== -1 && row[emailCol] && String(row[emailCol]).indexOf('@') > -1) {
        email = String(row[emailCol]).trim().toLowerCase();
      } else {
        for (var k = 0; k < row.length; k++) {
          var cellVal = String(row[k] || '').trim();
          if (cellVal.indexOf('@') > -1) {
            email = cellVal.toLowerCase();
            break;
          }
        }
      }

      if (!email) {
        email = (code === '70335') ? 'ahmed.hamdan@dakahlia.net' : ('emp.' + code + '@dakahlia.net');
      }

      employees.push({
        code: code,
        name: rawName,
        dept: dept || 'إدارة المخازن',
        title: title || '',
        annualBalance: balance,
        email: email
      });
    }

    var activeUser = '';
    try {
      activeUser = Session.getActiveUser().getEmail();
    } catch (e) {}

    return {
      success: true,
      employees: employees,
      count: employees.length,
      totalRowsScanned: values.length - startRow,
      sheetName: sheet.getName(),
      activeUser: activeUser
    };
  } catch (err) {
    return {
      success: false,
      error: err.toString()
    };
  }
}

/**
 * تنفيذ خطوة في دورة الاعتماد. يتم القفل لمنع تنفيذ نفس الخطوة مرتين عند النقر المزدوج.
 * المرحلة تُحدَّد من عمود الحالة في الشيت (وليس من باراميتر role في الرابط)
 * حتى لا يمكن تخطي المراحل أو اعتماد الطلب من رابط مرحلة أخرى.
 */
function handleWorkflowStep(id, action, role) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    return processWorkflowStep_(id, action, role);
  } finally {
    lock.releaseLock();
  }
}

/**
 * الإيميلات المسموح لها بالاعتماد/الرفض في المرحلة الحالية (من CONFIG فقط)
 */
function getAllowedApprovers_(status, empData) {
  let list = [];
  if (status === 'PENDING_MANAGER') {
    list = isWarehouseDirectorRequest(empData)
      ? [CONFIG.WAREHOUSE_DIRECTOR_EXCEPTION.managerEmail]
      : [getDeptInfo(empData.department).managerEmail];
  } else if (status === 'PENDING_DEPT_HEAD') {
    const directMgr = getDeptInfo(empData.department).managerEmail;
    list = [directMgr === CONFIG.FINAL_APPROVERS.DEPT_HEAD.email
      ? CONFIG.WAREHOUSE_DIRECTOR_EXCEPTION.managerEmail
      : CONFIG.FINAL_APPROVERS.DEPT_HEAD.email];
  } else if (status === 'PENDING_HR') {
    list = getHREmails().split(',');
  }
  return list.map(function(e) { return String(e).trim().toLowerCase(); }).filter(Boolean);
}

/**
 * إيميل المستخدم الذي فتح الرابط حالياً (يعمل عند النشر داخل نفس نطاق Workspace)
 */
function getCurrentActor_() {
  try {
    return String(Session.getActiveUser().getEmail() || '').trim().toLowerCase();
  } catch (e) {
    return '';
  }
}

function processWorkflowStep_(id, action, role) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet || !id) throw "الطلب غير موجود.";
  const values = sheet.getDataRange().getValues();
  let rowIndex = -1;
  let rowData = null;

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      rowIndex = i + 1;
      rowData = values[i];
      break;
    }
  }
  
  if (!rowData) throw "الطلب غير موجود.";
  
  const empData = {
    today: formatSimpleDate(rowData[1]),
    employeeCode: String(rowData[2]),
    employeeName: String(rowData[3]),
    jobTitle: String(rowData[4]),
    department: String(rowData[5]),
    leaveType: String(rowData[6]),
    startDate: formatSimpleDate(rowData[7]),
    endDate: formatSimpleDate(rowData[8]),
    daysCount: String(rowData[9]),
    reason: String(rowData[11]),
    employeeEmail: String(rowData[12]),
    submitterEmail: String(rowData[14] || '')
  };
  
  let signatures = [];
  try { signatures = JSON.parse(rowData[13] || '[]'); } catch (parseErr) { signatures = []; }
  const status = String(rowData[10] || 'PENDING_MANAGER');
  const isDirector = isWarehouseDirectorRequest(empData);

  // الطلب انتهى مسبقاً: لا يمكن اعتماده أو رفضه مرة أخرى (كان الرفض يلغي طلباً معتمداً بالفعل)
  if (status === 'APPROVED' || status === 'REJECTED') {
    return { ok: false, message: 'تم البت في هذا الطلب مسبقاً (' + (status === 'APPROVED' ? 'معتمد' : 'مرفوض') + ').' };
  }

  // الرابط يجب أن يخص المرحلة الحالية للطلب
  if (STAGE_BY_ROLE[role] !== status) {
    return { ok: false, message: 'هذا الرابط لم يعد صالحاً: الطلب ليس في مرحلة "' + (role || '-') + '" حالياً.' };
  }

  // الصلاحية: فقط الإيميلات المسجلة في CONFIG لهذه المرحلة يمكنها الاعتماد أو الرفض
  const actor = getCurrentActor_();
  if (!actor) {
    return { ok: false, message: 'تعذر التحقق من هويتك. افتح الرابط وأنت مسجل الدخول بحساب الشركة (@dakahlia.net).' };
  }
  if (getAllowedApprovers_(status, empData).indexOf(actor) === -1) {
    return { ok: false, message: 'غير مصرح لك: الحساب (' + actor + ') ليس مسجلاً للاعتماد أو الرفض في هذه المرحلة.' };
  }

  if (action === 'reject') {
    sheet.getRange(rowIndex, 11).setValue('REJECTED');
    notifyRejection_(id, empData, role);
    return { message: "تم رفض الطلب بنجاح." };
  }

  if (status === 'PENDING_MANAGER') {
    if (isDirector) {
      // استثناء مدير المخازن: اعتماد أ/ عبد الهادي صالح يمثل اعتماد المدير المباشر ومدير الإدارة معاً
      signatures.push('MANAGER');
      signatures.push('DEPT_HEAD');
      sheet.getRange(rowIndex, 11).setValue('PENDING_HR');
      sheet.getRange(rowIndex, 14).setValue(JSON.stringify(signatures));
      let pdf = generateFinalPDF(id, empData, signatures);
      sendApprovalMail(getHREmails(), 'الموارد البشرية', id, empData, pdf);
      return { message: "تم اعتماد إجازة مدير المخازن بنجاح من أ/ عبد الهادي صالح وإحالتها للموارد البشرية." };
    }

    signatures.push('MANAGER');
    sheet.getRange(rowIndex, 11).setValue('PENDING_DEPT_HEAD');
    sheet.getRange(rowIndex, 14).setValue(JSON.stringify(signatures));
    let pdf = generateFinalPDF(id, empData, signatures);

    const directMgr = getDeptInfo(empData.department).managerEmail;
    // إذا كان المدير المباشر هو نفسه مدير الإدارة (أحمد حمدان)، يوجه للمدير الأعلى عليه (أ/ عبد الهادي صالح)
    if (directMgr === CONFIG.FINAL_APPROVERS.DEPT_HEAD.email) {
      sendApprovalMail(CONFIG.WAREHOUSE_DIRECTOR_EXCEPTION.managerEmail, 'مدير الإدارة (المشرف العام)', id, empData, pdf);
    } else {
      sendApprovalMail(CONFIG.FINAL_APPROVERS.DEPT_HEAD.email, 'مدير الإدارة', id, empData, pdf);
    }
    return { message: "تم اعتماد المدير المباشر بنجاح." };
  }

  if (status === 'PENDING_DEPT_HEAD') {
    signatures.push('DEPT_HEAD');
    sheet.getRange(rowIndex, 11).setValue('PENDING_HR');
    sheet.getRange(rowIndex, 14).setValue(JSON.stringify(signatures));
    let pdf = generateFinalPDF(id, empData, signatures);
    sendApprovalMail(getHREmails(), 'الموارد البشرية', id, empData, pdf);
    return { message: "تم اعتماد مدير الإدارة بنجاح." };
  }

  // مرحلة اعتماد الموارد البشرية النهائية (status === 'PENDING_HR')
  signatures.push('HR');
  sheet.getRange(rowIndex, 11).setValue('APPROVED');
  sheet.getRange(rowIndex, 14).setValue(JSON.stringify(signatures));
  let pdf = generateFinalPDF(id, empData, signatures);
  sendFinalApprovalMails_(id, empData, pdf);
  return { message: "تم الاعتماد النهائي للإجازة وتوثيقها (APPROVED) وإرسال النسخ الرسمية للموارد البشرية والموظف بنجاح." };
}

/**
 * إرسال النسخة النهائية المعتمدة لمسؤولي الموارد البشرية وللموظف ومنشئ الطلب
 */
function sendFinalApprovalMails_(id, empData, pdf) {
  const s = escObj(empData);

  // 1. نسخة رسمية كاملة التوقيعات لجميع مسؤولي الموارد البشرية (HR)
  const hrEmails = getHREmails();
  if (hrEmails) {
    const hrHtmlBody = `
        <div dir="rtl" style="font-family: Arial, sans-serif; border: 2px solid #166534; padding: 25px; border-radius: 15px; max-width: 600px; margin: auto; background-color: #ffffff;">
          <div style="text-align: center; border-bottom: 2px solid #166534; padding-bottom: 12px; margin-bottom: 15px;">
            <h2 style="color: #166534; margin: 0;">✅ [نسخة الموارد البشرية] تم الاعتماد النهائي للإجازة</h2>
            <span style="font-size: 13px; color: #555;">طلب رقم: <b style="color: #1e3a8a;">${esc(id)}</b> | الحالة: <b style="color: #166534;">معتمد ومكتمل التوقيعات (APPROVED)</b></span>
          </div>
          
          <p style="font-size: 14px; color: #222;">الزملاء الأفاضل في <b>إدارة الموارد البشرية</b>،</p>
          <p style="font-size: 14px; color: #333; line-height: 1.6;">
            نحيطكم علماً بأنه قد تم اكتمال دورة الموافقات والاعتماد النهائي لطلب الإجازة التالي، ومرفق لكم طيه <b>النسخة الرسمية الكاملة المعتمدة بجميع التوقيعات والأختام بصيغة PDF</b> للحفظ والأرشفة في سجلاتكم:
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 15px 0; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0; width: 35%;">اسم الموظف:</td><td style="padding: 8px 12px; font-weight: bold; color: #1e3a8a; border-bottom: 1px solid #e2e8f0;">${s.employeeName}</td></tr>
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0;">كود الموظف:</td><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${s.employeeCode}</td></tr>
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0;">الوظيفة والقسم:</td><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${s.jobTitle} - ${s.department}</td></tr>
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0;">نوع الإجازة:</td><td style="padding: 8px 12px; color: #b45309; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${s.leaveType}</td></tr>
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0;">الفترة:</td><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">من ${s.startDate} إلى ${s.endDate} (${s.daysCount} أيام)</td></tr>
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0;">ملاحظات / السبب:</td><td style="padding: 8px 12px; border-bottom: 1px solid #e2e8f0;">${s.reason || 'لا يوجد'}</td></tr>
            <tr><td style="padding: 8px 12px; color: #555;">حساب منشئ الطلب:</td><td style="padding: 8px 12px; font-family: monospace; font-weight: bold; color: #1e3a8a;" dir="ltr">${s.submitterEmail || 'غير محدد'}</td></tr>
          </table>

          <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 12px; border-radius: 8px; font-size: 13px; color: #065f46; text-align: center; font-weight: bold; margin-top: 15px;">
            📎 تم إرفاق ملف الاستمارة الرسمية كامل التوقيعات (Leave_Request_${esc(id)}.pdf).
          </div>
        </div>
      `;

    try {
      GmailApp.sendEmail(hrEmails, `✅ [نسخة الموارد البشرية] تم الاعتماد النهائي لطلب إجازة: ${empData.employeeName} (${id})`, "", {
        htmlBody: hrHtmlBody,
        attachments: [pdf]
      });
    } catch (hrErr) {
      console.error("Error sending email to HR:", hrErr);
    }
  }

  // 2. نسخة رسمية كاملة التوقيعات للموظف (ومنشئ الطلب إن وجد)
  const employeeRecipients = [];
  if (empData.employeeEmail && empData.employeeEmail.trim()) {
    employeeRecipients.push(empData.employeeEmail.trim());
  }
  if (empData.submitterEmail && empData.submitterEmail.trim() && employeeRecipients.indexOf(empData.submitterEmail.trim()) === -1) {
    employeeRecipients.push(empData.submitterEmail.trim());
  }

  if (employeeRecipients.length > 0) {
    const empRecipientsStr = employeeRecipients.join(', ');
    const empHtmlBody = `
        <div dir="rtl" style="font-family: Arial, sans-serif; border: 2px solid #1e3a8a; padding: 25px; border-radius: 15px; max-width: 600px; margin: auto; background-color: #ffffff;">
          <div style="text-align: center; border-bottom: 2px solid #1e3a8a; padding-bottom: 12px; margin-bottom: 15px;">
            <h2 style="color: #1e3a8a; margin: 0;">🎉 تهانينا! تم اعتماد طلب الإجازة النهائي</h2>
            <span style="font-size: 13px; color: #555;">طلب رقم: <b style="color: #1e3a8a;">${esc(id)}</b> | الحالة: <b style="color: #166534;">معتمد وموثق بالكامل (APPROVED)</b></span>
          </div>

          <p style="font-size: 14px; color: #222;">عزيزي الزميل/ <b>${s.employeeName}</b>،</p>
          <p style="font-size: 14px; color: #333; line-height: 1.6;">
            تمت الموافقة النهائية واعتماد طلب الإجازة الخاص بكم من قِبل المدير المباشر ومدير الإدارة وإدارة الموارد البشرية. مرفق لسيادتكم <b>النسخة الرسمية الكاملة المعتمدة بجميع التوقيعات والأختام بصيغة PDF</b> للاحتفاظ بها.
          </p>

          <table style="width: 100%; border-collapse: collapse; margin: 15px 0; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0; width: 35%;">نوع الإجازة:</td><td style="padding: 8px 12px; color: #b45309; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${s.leaveType}</td></tr>
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0;">عدد الأيام:</td><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">${s.daysCount} أيام</td></tr>
            <tr><td style="padding: 8px 12px; color: #555; border-bottom: 1px solid #e2e8f0;">الفترة:</td><td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">من ${s.startDate} إلى ${s.endDate}</td></tr>
            <tr><td style="padding: 8px 12px; color: #555;">القسم:</td><td style="padding: 8px 12px; font-weight: bold;">${s.department}</td></tr>
          </table>

          <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; padding: 12px; border-radius: 8px; font-size: 13px; color: #1e40af; text-align: center; font-weight: bold; margin-top: 15px;">
            📎 تم إرفاق نسختك الرسمية المعتمدة كاملة التوقيعات (Leave_Request_${esc(id)}.pdf).
          </div>
        </div>
      `;

    try {
      GmailApp.sendEmail(empRecipientsStr, `✅ تم اعتماد إجازتك وتوثيقها بالكامل - ${empData.employeeName} (${id})`, "", {
        htmlBody: empHtmlBody,
        attachments: [pdf]
      });
    } catch (empErr) {
      console.error("Error sending email to employee:", empErr);
    }
  }
}

/**
 * إشعار الموظف ومنشئ الطلب برفض الطلب (كان الرفض يتم بصمت بدون أي إشعار)
 */
function notifyRejection_(id, empData, role) {
  const recipients = [];
  [empData.employeeEmail, empData.submitterEmail].forEach(function(m) {
    const t = String(m || '').trim();
    if (t && recipients.indexOf(t) === -1) recipients.push(t);
  });
  if (recipients.length === 0) return;

  const s = escObj(empData);
  const html = `
    <div dir="rtl" style="font-family: Arial, sans-serif; border: 2px solid #991b1b; padding: 25px; border-radius: 15px; max-width: 600px; margin: auto;">
      <h2 style="color: #991b1b; margin: 0 0 12px 0;">تم رفض طلب الإجازة</h2>
      <p style="font-size: 14px;">عزيزي الزميل/ <b>${s.employeeName}</b>،</p>
      <p style="font-size: 14px; line-height: 1.6;">نحيطكم علماً بأنه تم رفض طلب الإجازة رقم <b>${esc(id)}</b> (${s.leaveType} - من ${s.startDate} إلى ${s.endDate}) من قِبل: <b>${esc(role)}</b>.</p>
    </div>
  `;
  try {
    GmailApp.sendEmail(recipients.join(', '), `❌ تم رفض طلب الإجازة (${id})`, "", { htmlBody: html });
  } catch (err) {
    console.error("Error sending rejection email:", err);
  }
}

function generateFinalPDF(id, data, signatures) {
  const template = HtmlService.createTemplateFromFile('EmailTemplates');
  template.data = data;
  template.signatures = signatures;
  template.config = CONFIG;
  template.isDirector = isWarehouseDirectorRequest(data);
  const htmlContent = template.evaluate().getContent();
  const blob = Utilities.newBlob(htmlContent, 'text/html', `Request_${id}.html`);
  return blob.getAs('application/pdf').setName(`Leave_Request_${id}.pdf`);
}

function sendApprovalMail(targetEmail, role, id, data, pdfBlob) {
  let recipients = targetEmail;
  if (Array.isArray(recipients)) {
    recipients = recipients.filter(Boolean).map(function(e) { return String(e).trim(); }).join(', ');
  } else if (typeof recipients === 'string') {
    recipients = recipients.trim();
  }
  if (!recipients) return;

  const baseUrl = ScriptApp.getService().getUrl();
  const approveUrl = `${baseUrl}?id=${encodeURIComponent(id)}&action=approve&role=${encodeURIComponent(role)}`;
  const rejectUrl = `${baseUrl}?id=${encodeURIComponent(id)}&action=reject&role=${encodeURIComponent(role)}`;
  
  // التنبيه يظهر فقط للمشرف على مدير المخازن (مرحلة المدير المباشر) وليس للموارد البشرية
  const isDirector = isWarehouseDirectorRequest(data) && STAGE_BY_ROLE[role] === 'PENDING_MANAGER';
  const d = escObj(data);
  const exceptionNotice = isDirector ? `
    <div style="background-color: #fef3c7; border: 1px solid #f59e0b; padding: 10px 15px; border-radius: 8px; margin-bottom: 15px; font-weight: bold; color: #92400e;">
      ⭐ استثناء إداري: هذا الطلب يخص أ/ أحمد حمدان (مدير المخازن) وموجه لسيادتكم للاعتماد بصفتكم المدير المباشر عليه.
    </div>
  ` : '';

  // البريد الإلكتروني للموظف صاحب الإجازة لإرسال الإيميل باسمه وتوجيه الردود إليه
  const empEmail = (data.employeeEmail || data.submitterEmail || '').trim();
  const empName = (data.employeeName || 'موظف').trim();

  const htmlBody = `
    <div dir="rtl" style="font-family: Arial, sans-serif; border: 1px solid #e5e7eb; padding: 25px; border-radius: 15px; max-width: 600px; margin: auto;">
      <h2 style="color: #1e3a8a; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">طلب إجازة للمراجعة - ${esc(role)}</h2>
      ${exceptionNotice}
      <p>عزيزي <b>المسؤول</b>،</p>
      <p>يرجى مراجعة طلب الإجازة المقدم من الموظف التالي:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
        <tr><td style="padding: 5px; color: #666;">اسم الموظف:</td><td style="font-weight: bold;">${d.employeeName}</td></tr>
        ${data.employeeCode ? `<tr><td style="padding: 5px; color: #666;">كود الموظف:</td><td style="font-weight: bold;">${d.employeeCode}</td></tr>` : ''}
        <tr><td style="padding: 5px; color: #666;">الوظيفة والقسم:</td><td style="font-weight: bold;">${d.jobTitle} - ${d.department}</td></tr>
        <tr><td style="padding: 5px; color: #666;">نوع الإجازة:</td><td style="color: #f59e0b; font-weight: bold;">${d.leaveType}</td></tr>
        <tr><td style="padding: 5px; color: #666;">التاريخ:</td><td style="font-weight: bold;">من ${d.startDate} إلى ${d.endDate} (${d.daysCount} أيام)</td></tr>
        <tr><td style="padding: 5px; color: #666;">البريد الإلكتروني للموظف:</td><td style="font-family: monospace; font-weight: bold; color: #1e3a8a;" dir="ltr">${esc(empEmail) || 'غير محدد'}</td></tr>
        ${data.submitterEmail && data.submitterEmail !== empEmail ? `<tr><td style="padding: 5px; color: #666;">حساب منشئ الطلب:</td><td style="font-family: monospace;" dir="ltr">${d.submitterEmail}</td></tr>` : ''}
      </table>
      <div style="margin-top: 30px; display: flex; gap: 10px; justify-content: center;">
        <a href="${approveUrl}" style="background: #166534; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-left: 10px;">اعتماد الطلب</a>
        <a href="${rejectUrl}" style="background: #991b1b; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">رفض الطلب</a>
      </div>
    </div>
  `;

  const emailSubject = `مراجعة طلب إجازة: ${empName} (${id})`;
  const emailOptions = {
    htmlBody: htmlBody,
    attachments: [pdfBlob],
    name: empName, // يظهر اسم الموظف صاحب الإجازة كمرسل للرسالة
    replyTo: empEmail || undefined // أي رد من المدير يذهب مباشرة لبريد الموظف صاحب الإجازة
  };

  // محاولة الإرسال بعنوان بريد الموظف مباشرة في حال وجود صلاحية Send-As أو اسم مستعار
  if (empEmail) {
    try {
      const aliases = GmailApp.getAliases();
      if (aliases && aliases.indexOf(empEmail) !== -1) {
        emailOptions.from = empEmail;
      }
    } catch (aliasErr) {
      console.warn("Could not check aliases:", aliasErr);
    }
  }

  GmailApp.sendEmail(recipients, emailSubject, "", emailOptions);
}
