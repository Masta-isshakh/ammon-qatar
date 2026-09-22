import type { Industry } from '../types';

export const industries: Industry[] = [
  {
    slug: 'construction-contracting',
    name: 'المقاولات والإنشاءات',
    summary: 'الأعمال المعتمدة ومبالغ الضمان المحتجزة والأعمال الإضافية تُنتج مستحقات كبيرة وموثقة وبطيئة السداد.',
    challenges: ['شهادات الدفع المرحلية تُسدد متأخرة أو منقوصة', 'أرصدة الضمان المحتجز غير المسددة بعد الإنجاز', 'الأعمال الإضافية المتنازع عليها تؤخر الحساب كله', 'سلاسل طويلة من المقاول الرئيسي إلى مقاول الباطن إلى المورد'],
    relevantServices: ['corporate-debt-collection', 'negotiation-settlement', 'legal-follow-up'],
  },
  {
    slug: 'trading-distribution',
    name: 'التجارة والتوزيع',
    summary: 'أحجام الفواتير الكبيرة وشروط الائتمان تجعل المتابعة المنتظمة الفارق بين السيولة والدين المعدوم.',
    challenges: ['فواتير مفتوحة كثيرة لكل عميل مع دفعات جزئية', 'تجاوز حدود الائتمان دون موافقة رسمية', 'المرتجعات والإشعارات الدائنة تعقّد كشف الحساب', 'عملاء منتشرون في أنحاء قطر بانضباط سداد متفاوت'],
    relevantServices: ['early-stage-debt-collection', 'unpaid-invoice-recovery', 'payment-monitoring'],
  },
  {
    slug: 'real-estate',
    name: 'العقارات',
    summary: 'متأخرات الإيجار ورسوم الخدمات والأرصدة بعد التسليم تتطلب تعاملاً حازماً يراعي العلاقة.',
    challenges: ['متأخرات الإيجارات السكنية والتجارية', 'رسوم الخدمات والصيانة غير المسددة', 'متأخرات مرتبطة بالشيكات وطلبات إعادة الجدولة', 'انتقال المستأجر دون تسوية'],
    relevantServices: ['individual-debt-collection', 'corporate-debt-collection', 'payment-monitoring'],
  },
  {
    slug: 'financial-services',
    name: 'الخدمات المالية',
    summary: 'تحتاج جهات الإقراض وشركات التمويل الخاضعة للتنظيم إلى متابعة منتظمة وممتثلة للحسابات المتعثرة.',
    challenges: ['أقساط متأخرة على التمويل الشخصي والتجاري', 'طلبات إعادة هيكلة تحتاج إلى توثيق', 'التواصل مع الكفلاء', 'معايير تواصل مهنية وثابتة'],
    relevantServices: ['individual-debt-collection', 'bank-finance-settlements', 'payment-monitoring'],
  },
  {
    slug: 'healthcare',
    name: 'الرعاية الصحية',
    summary: 'أرصدة المرضى ومستحقات شركات التأمين تحتاج إلى تعامل حساس وتوثيق دقيق.',
    challenges: ['أرصدة الدفع الذاتي بعد العلاج', 'مطالبات التأمين المرفوضة أو المتأخرة', 'حسابات الشركات لخدمات العاملين الطبية', 'الحساسية في التواصل مع المرضى'],
    relevantServices: ['individual-debt-collection', 'corporate-debt-collection', 'early-stage-debt-collection'],
  },
  {
    slug: 'logistics-transportation',
    name: 'الخدمات اللوجستية والنقل',
    summary: 'رسوم الشحن والتخليص والتخزين تتراكم بسرعة عندما يتأخر العملاء في السداد.',
    challenges: ['فواتير الشحن والتخليص المتنازع على رسومها', 'أرصدة التخزين وغرامات التأخير تتزايد يومياً', 'عملاء بعمليات عابرة للحدود', 'ثغرات في مستندات إثبات التسليم'],
    relevantServices: ['unpaid-invoice-recovery', 'corporate-debt-collection', 'negotiation-settlement'],
  },
  {
    slug: 'professional-services',
    name: 'الخدمات المهنية',
    summary: 'كثيراً ما تقصّر الشركات الاستشارية والوكالات والمكاتب في التحصيل لأن المطالبة بالأتعاب تبدو محرجة.',
    challenges: ['أتعاب المراحل غير المسددة بعد قبول المخرجات', 'نزاعات النطاق تُستخدم لتأخير السداد', 'انتهاء عقود الأتعاب الشهرية مع أرصدة قائمة', 'التردد في التصعيد مع عملاء مهمين'],
    relevantServices: ['unpaid-invoice-recovery', 'negotiation-settlement', 'early-stage-debt-collection'],
  },
  {
    slug: 'smes',
    name: 'الشركات الصغيرة والمتوسطة',
    summary: 'تشعر المنشآت الصغيرة بأثر كل تأخر في السداد. العملية المنظمة تحمي التدفق النقدي دون فريق ائتمان كامل.',
    challenges: ['بضعة عملاء كبار يسددون متأخراً', 'لا يوجد موظفون مخصصون لمراقبة الائتمان', 'وقت المالك يُستهلك في ملاحقة المدفوعات', 'عدم اليقين حول توقيت التصعيد وكيفيته'],
    relevantServices: ['early-stage-debt-collection', 'unpaid-invoice-recovery', 'payment-monitoring'],
  },
];
