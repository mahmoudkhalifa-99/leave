
import React from 'react';

export const SetupGuide: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="border-r-4 border-blue-600 pr-4">
        <h2 className="text-2xl font-bold text-gray-800">دليل النظام والمزامنة الحية مع Google Sheets</h2>
        <p className="text-gray-500 mt-1">شرح كيفية سحب بيانات الموظفين وتتبع حساب Google المفتوح تلقائياً.</p>
      </div>

      {/* قسم المزامنة مع الشيت */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-8 rounded-3xl border border-emerald-700 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-xl flex items-center gap-2 text-emerald-300">
            <i className="fas fa-file-excel text-2xl"></i>
            المزامنة اللحظية مع شيت (تصريح اجازات - تبويب data)
          </h3>
          <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">
            مُفعل تلقائياً
          </span>
        </div>

        <p className="text-sm text-emerald-100 leading-relaxed">
          يقوم النظام بسحب بيانات الموظفين مباشرة من جدول بيانات Google المعتمد دون الحاجة إلى تثبيت أي بيانات داخل الكود:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="bg-white/10 p-4 rounded-xl border border-white/15">
            <span className="text-emerald-300 font-bold block mb-1">Spreadsheet ID:</span>
            <span className="text-white select-all break-all">1n2sp5TNNGL3M5_LRNJ7IMLXXWoH6-kL8r4eGZokISCs</span>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/15">
            <span className="text-emerald-300 font-bold block mb-1">اسم التبويب (Tab Name):</span>
            <span className="text-white text-base font-bold">data</span>
          </div>
        </div>

        <div className="bg-black/20 p-5 rounded-xl border border-white/10 text-xs space-y-3">
          <div>
            <strong className="text-yellow-300 block mb-1 font-sans font-bold text-sm">
              قراءة كافة الصفوف تلقائياً بدون أي حد أقصى:
            </strong>
            <p className="text-emerald-100 font-sans leading-relaxed">
              يقوم الكود الآن بسحب <strong>جميع الصفوف في تبويب data</strong> بالكامل من الصف 1 حتى آخر صف مسجل (<code className="bg-white/20 px-1 rounded font-mono">sheet.getLastRow()</code>)، مع التعرف الذكي على أسماء الأعمدة سواء بدأ الكود من العمود A أو العمود B (في حال وجود عمود مسلسل):
            </p>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center mt-2 font-sans">
            <li className="bg-white/10 p-2 rounded">عمود A أو B: <strong>كود الموظف</strong></li>
            <li className="bg-white/10 p-2 rounded">عمود B أو C: <strong>اسم الموظف</strong></li>
            <li className="bg-white/10 p-2 rounded">عمود C أو D: <strong>القسم</strong></li>
            <li className="bg-white/10 p-2 rounded">عمود D أو E: <strong>الرصيد السنوي</strong></li>
            <li className="bg-white/10 p-2 rounded">عمود E أو F: <strong>الوظيفة</strong></li>
            <li className="bg-white/10 p-2 rounded">عمود F أو G: <strong>البريد الإلكتروني</strong></li>
          </ul>
          <div className="bg-emerald-950/40 p-3 rounded-lg border border-emerald-500/30 text-emerald-200 text-[11px] font-sans">
            💡 <strong>ملاحظة للمسؤول:</strong> تم إضافة دالة <code className="bg-white/20 px-1 rounded font-mono text-white">getEmployeesData()</code> في ملف <code className="bg-white/20 px-1 rounded font-mono text-white">backend/Code.gs</code>. بعد تحديث السكربت ونشر نسخة جديدة، سيسحب التطبيق كافة موظفي الشيت تلقائياً. كما تم توفير زر <strong>"لصق كل الصفوف فوراً"</strong> في واجهة التطبيق للاستيراد الفوري بنقرة واحدة!
          </div>
        </div>
      </div>

      {/* قسم إرسال الإيميل من بريد الموظف صاحب الإجازة */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-8 rounded-3xl border border-blue-700 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-black text-xl flex items-center gap-2 text-blue-300">
            <i className="fas fa-paper-plane text-2xl text-yellow-400"></i>
            إرسال إيميل طلب الإجازة من بريد الموظف نفسه (بدلاً من الميل الموحد)
          </h3>
          <span className="bg-yellow-400 text-yellow-950 text-xs px-3 py-1 rounded-full font-black">
            تحديث مطلوب
          </span>
        </div>

        <p className="text-sm text-blue-100 leading-relaxed">
          بناءً على طلبكم بأن يتم إرسال الإيميل باسم وإيميل <strong>الموظف صاحب الإجازة</strong> بدلاً من الميل الموحد العام، تم تطبيق التعديلات التالية في الكود، مع توفير خياري التنفيذ:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-2">
            <div className="flex items-center gap-2 text-yellow-300 font-black text-sm">
              <i className="fas fa-code"></i>
              ١. في الكود البرمجي (تم تنفيذه تلقائياً في Code.gs):
            </div>
            <p className="text-blue-100 leading-relaxed">
              يقوم النظام الآن بسحب <strong>البريد الإلكتروني للموظف صاحب الإجازة</strong> (<code className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold text-white">employeeEmail</code>) وضبطه في خيارات الإرسال:
            </p>
            <ul className="space-y-1 text-blue-200 list-disc list-inside">
              <li><strong>الاسم الظاهر للمرسل (name):</strong> اسم الموظف صاحب الإجازة ليظهر في صندوق وارد المدير.</li>
              <li><strong>الرد المباشر (replyTo):</strong> بريد الموظف صاحب الإجازة ليرد عليه المدير بضغطة زر واحدة.</li>
              <li><strong>الإرسال المباشر (from):</strong> بريد الموظف في حال توفر صلاحية النيابة (Send-As Alias).</li>
            </ul>
          </div>

          <div className="bg-white/10 p-5 rounded-2xl border border-white/15 space-y-2">
            <div className="flex items-center gap-2 text-green-300 font-black text-sm">
              <i className="fas fa-rocket"></i>
              ٢. لإرسال الإيميل فعلياً من صندوق بريد كل موظف (Apps Script Deployment):
            </div>
            <p className="text-blue-100 leading-relaxed">
              إذا رغبت في أن يخرج الإيميل حرفياً ومباشرة من حساب Google الخاص بكل موظف على نطاق الشركة (<span className="font-mono text-white">@dakahlia.net</span>):
            </p>
            <ol className="space-y-1 text-blue-200 list-decimal list-inside">
              <li>افتح مشروع <strong>Apps Script</strong> واضغط <strong>Deploy ➔ Manage Deployments</strong>.</li>
              <li>اضغط أيقونة القلم ✏️ (تعديل).</li>
              <li>في خانة <strong>Execute as</strong> اختر: <strong className="text-white bg-blue-800/80 px-1 rounded">User accessing the web app</strong> (المستخدم الذي يفتح التطبيق).</li>
              <li>في خانة <strong>Who has access</strong> اختر: <strong className="text-white bg-blue-800/80 px-1 rounded">Anyone within dakahlia.net</strong>.</li>
              <li>اضغط <strong>Deploy</strong>.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* قسم حساب Google المنشئ */}
      <div className="bg-amber-50 p-8 rounded-3xl border-2 border-amber-200 shadow-sm space-y-4">
        <h3 className="font-black text-amber-900 flex items-center gap-2 text-lg">
          <i className="fas fa-user-shield text-amber-600 text-xl"></i>
          معرفة حساب Google المفتوح (منشئ الإجازة)
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          بناءً على طلبكم، تم فصل <strong>"البريد الإلكتروني للموظف صاحب الإجازة"</strong> عن <strong>"حساب Google المفتوح حالياً"</strong> الذي قام بإنشاء وتقديم الطلب:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-amber-200">
            <h4 className="font-black text-sm text-[#1e3a8a] mb-1">١. في كود Google Apps Script:</h4>
            <p className="text-xs text-gray-600">
              يتم استدعاء <code className="bg-gray-100 px-1 py-0.5 rounded font-mono font-bold text-red-600">Session.getActiveUser().getEmail()</code> لأخذ بريد الجيميل الفعلي للمستخدم الذي نفذ العملية وحفظه في سجل الطلب.
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-amber-200">
            <h4 className="font-black text-sm text-[#1e3a8a] mb-1">٢. في إيميل الإشعار المرسل للمدير:</h4>
            <p className="text-xs text-gray-600">
              يصل للمدير المباشر في نص الإيميل وقالب الـ PDF تنبيه صريح يوضح: <strong>"تم إنشاء هذا الطلب بواسطة الحساب: [إيميل_الجيميل]"</strong> لتوضيح المسؤولية الإدارية بدقة.
            </p>
          </div>
        </div>
      </div>

      {/* هيكل المديرين */}
      <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-4">
        <h3 className="font-black text-[#1e3a8a] flex items-center gap-2">
          <i className="fas fa-sitemap"></i>
          توزيع إيميلات المديرين بالأقسام واستثناء مدير المخازن
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          في ملف <code className="bg-gray-100 px-2 py-1 rounded text-red-600">Code.gs</code>، يتم توجيه كل قسم لمديره تلقائياً، مع تطبيق استثناء خاص بمدير المخازن:
        </p>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1 font-bold">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm">
            <i className="fas fa-exclamation-triangle text-amber-600"></i>
            استثناء إداري خاص بمدير المخازن (أ/ أحمد حمدان):
          </div>
          <div>
            الطلب الخاص بمدير المخازن <span className="font-mono" dir="ltr">ahmed.hamdan@dakahlia.net</span> (كود 70335) يوجه تلقائياً إلى مديره المباشر المعتمد عليه: <span className="font-mono text-blue-900 font-black" dir="ltr">abdelhady.saleh@dakahlia.net</span> (أ/ عبد الهادي صالح - المشرف العام).
          </div>
        </div>

        <pre className="bg-gray-900 text-green-400 p-4 rounded-xl text-[11px] font-mono overflow-x-auto text-left" dir="ltr">
{`// استثناء خاص بمدير المخازن:
WAREHOUSE_DIRECTOR_EXCEPTION: {
  directorEmail: "ahmed.hamdan@dakahlia.net",
  managerEmail: "abdelhady.saleh@dakahlia.net", // أ/ عبد الهادي صالح
  managerName: "أ/ عبد الهادي صالح"
},

DEPARTMENTS: {
  "التخطيط و المتابعة": { managerEmail: "ahmed.hamdan@dakahlia.net", managerName: "أ/ احمد حمدان" },
  "إدارة المخازن": { managerEmail: "ahmed.hamdan@dakahlia.net", managerName: "أ/ احمد حمدان" },
  "الخامات": { managerEmail: "raw.store.mgr@dakahlia.net", managerName: "أ/ احمد كمال" },
  "المنتج التام": { managerEmail: "finished.store@dakahlia.net", managerName: "أ/ محمود غالى" },
  "المخازن العامة": { managerEmail: "general.store@dakahlia.net", managerName: "أ/ رمضان زينهم" },
  "حركة المعدات": { managerEmail: "equipment.mgr@dakahlia.net", managerName: "أ/ ايمن عليوه" }
},

// مسؤولي الموارد البشرية (وصول الإشعار لأكثر من شخص):
FINAL_APPROVERS: {
  DEPT_HEAD: { email: "ahmed.hamdan@dakahlia.net", name: "أ/ مدير الاداره" },
  HR: {
    emails: [
      "sadat.planning.officer@dakahlia.net",
      "taha.zaki@dakahlia.net", // الإيميل الثاني
      "hr2@dakahlia.net"       // الإيميل الثالث
    ],
    name: "إدارة الموارد البشرية"
  }
}`}
        </pre>
      </div>

      {/* قسم اعتماد الموارد البشرية النهائي وإرسال النسخ الرسمية */}
      <div className="bg-emerald-50 p-8 rounded-3xl border-2 border-emerald-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-emerald-950 flex items-center gap-2 text-lg">
            <i className="fas fa-stamp text-emerald-600 text-xl"></i>
            آلية الاعتماد النهائي للموارد البشرية وإرسال النسخ المكتملة
          </h3>
          <span className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-bold">
            نسخة للموارد البشرية + نسخة للموظف
          </span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          عند نقر مسؤول الموارد البشرية على رابط <strong>"اعتماد الطلب"</strong>، يقوم النظام تلقائياً بختم وتوثيق جميع التوقيعات الأربعة وإرسال نسختين كاملتي التوقيعات بالتزامن:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 font-black text-sm">
              <i className="fas fa-users-cog"></i>
              ١. نسخة رسمية كاملة لإدارة الموارد البشرية (HR):
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              تصل مباشرة لجميع إيميلات مسؤولي الموارد البشرية المحددة في النظام (<span className="font-mono text-emerald-900 font-bold">sadat.planning.officer@dakahlia.net</span> و <span className="font-mono text-emerald-900 font-bold">taha.zaki@dakahlia.net</span> وغيرهم) مرفق بها ملف <span className="font-mono font-bold">PDF</span> كامل الأختام للاحتفاظ به وأرشفته في سجلات الإدارة.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-black text-sm">
              <i className="fas fa-user-check"></i>
              ٢. نسخة رسمية كاملة للموظف (ومنشئ الطلب):
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              تصل إلى البريد الإلكتروني للموظف (وحساب Google المنشئ) تهنئة بالاعتماد مرفق بها ملف <span className="font-mono font-bold">PDF</span> المعتمد رسمياً بجميع التوقيعات الأربعة كإثبات رسمي للإجازة.
            </p>
          </div>
        </div>

        <div className="p-4 bg-emerald-100/60 rounded-xl border border-emerald-300 text-xs text-emerald-900 flex items-start gap-2">
          <i className="fas fa-info-circle text-emerald-700 text-sm mt-0.5"></i>
          <div className="space-y-1">
            <strong>خطوات تفعيل الشعار في ملفات الـ PDF على Google Apps Script:</strong>
            <p className="text-emerald-950 font-normal">
              1. افتح مشروع <strong>Google Apps Script</strong> الخاص بك.<br />
              2. افتح ملف <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold">EmailTemplates.html</code> وانسخ محتوى الملف المحدث في المشروع (يحتوي على كود الشعار الرسمي المعتمد بدقة عالية وأبعاد ثابتة).<br />
              3. اضغط حفظ، ثم قم بعمل نشر جديد: <span className="font-mono font-bold">Deploy ➔ Manage Deployments ➔ Edit ✏️ ➔ Version: New Version ➔ Deploy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
