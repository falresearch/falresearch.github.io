// 双语工具：中文为默认语言（无前缀），英文挂在 /en/ 下
export const languages = { zh: '中文', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'zh';

/** 内容里的双语字段，例如 { zh: '张三', en: 'San Zhang' } */
export type Localized = { zh: string; en?: string };

/** 用于 [...lang] 动态路由：zh 对应 undefined（根路径），en 对应 'en' */
export function langPaths() {
  return [{ params: { lang: undefined } }, { params: { lang: 'en' } }];
}

export function getLang(param: string | undefined): Lang {
  return param === 'en' ? 'en' : 'zh';
}

/** 取双语字段，英文缺失时回退到中文 */
export function loc(value: Localized | string | undefined, lang: Lang): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return (lang === 'en' ? value.en : value.zh) || value.zh;
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** 生成带语言前缀和 base 的站内链接，path 以 / 开头 */
export function localizePath(lang: Lang, path = '/'): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  const prefix = lang === defaultLang ? '' : `/${lang}`;
  return `${base}${prefix}${clean}` || '/';
}

/** 去掉当前 URL 中的 base 和语言前缀，得到与语言无关的路径 */
export function stripLang(pathname: string): string {
  let p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  p = p.replace(/^\/en(?=\/|$)/, '');
  return p || '/';
}

export const ui = {
  zh: {
    'nav.home': '首页',
    'nav.research': '研究方向',
    'nav.publications': '研究成果',
    'nav.people': '团队成员',
    'nav.contact': '联系我们',
    'lang.switch': 'EN',
    'hero.cta.research': '探索研究',
    'hero.cta.join': '加入我们',
    'home.research': '研究方向',
    'home.join.body': '课题组欢迎对人工智能与医学交叉研究感兴趣的本科同学加入。计算机、工科与医学背景均可，你将在导师指导下参与真实的科研课题。',
    'common.viewAll': '查看全部',
    'pubs.journal': '期刊',
    'pubs.conference': '会议',
    'pubs.preprint': '预印本',
    'people.pi': '课题组负责人',
    'people.faculty': '教师与研究员',
    'people.postdoc': '博士后',
    'people.phd': '博士研究生',
    'people.master': '硕士研究生',
    'people.undergrad': '本科生',
    'people.topic': '课题',
    'people.period': '在组时间',
    'people.now': '毕业去向',
    'people.present': '至今',
    'people.achievements': '成果',
    'people.ach.paper': '论文',
    'people.ach.award': '获奖',
    'people.ach.project': '项目',
    'people.ach.other': '其他',
    'people.vacancy': '虚位以待',
    'people.vacancy.body': '欢迎对 AI 与医学感兴趣的本科同学加入',
    'people.alumni': '毕业成员',
    'contact.lead': '无论是科研合作还是加入课题组，都欢迎来信交流。',
    'contact.collab': '科研合作',
    'contact.collab.lead': '课题组致力于把人工智能方法用于真实的临床与医学教育问题，欢迎不同领域的同行一起合作。',
    'contact.collab.areas': '可合作的研究方向',
    'contact.collab.note': '来信时请简要介绍您的研究背景与合作设想，我们会尽快回复。',
    'contact.join': '课题组招募',
    'join.how': '如何加入',
    'join.contact': '联系方式',
    'join.email': '邮箱',
    'footer.rights': '保留所有权利',
    'footer.quick': '快速链接',
  },
  en: {
    'nav.home': 'Home',
    'nav.research': 'Research',
    'nav.publications': 'Publications',
    'nav.people': 'People',
    'nav.contact': 'Contact',
    'lang.switch': '中',
    'hero.cta.research': 'Explore research',
    'hero.cta.join': 'Join us',
    'home.research': 'Research Areas',
    'home.join.body': 'Undergraduates interested in research at the intersection of AI and medicine are welcome to join the lab. Students from computing, engineering or medical backgrounds are all welcome, and you will work on real research projects under the guidance of the PI.',
    'common.viewAll': 'View all',
    'pubs.journal': 'Journal',
    'pubs.conference': 'Conference',
    'pubs.preprint': 'Preprint',
    'people.pi': 'Principal Investigator',
    'people.faculty': 'Faculty & Researchers',
    'people.postdoc': 'Postdocs',
    'people.phd': 'PhD Students',
    'people.master': 'Master Students',
    'people.undergrad': 'Undergraduate Researchers',
    'people.topic': 'Projects',
    'people.period': 'In lab',
    'people.now': 'Now',
    'people.present': 'present',
    'people.achievements': 'Achievements',
    'people.ach.paper': 'Paper',
    'people.ach.award': 'Award',
    'people.ach.project': 'Grant',
    'people.ach.other': 'Other',
    'people.vacancy': 'Your seat is waiting',
    'people.vacancy.body': 'Undergraduates interested in AI and medicine are welcome to join',
    'people.alumni': 'Alumni',
    'contact.lead': 'Whether you are interested in research collaboration or in joining the lab, we would love to hear from you.',
    'contact.collab': 'Research Collaboration',
    'contact.collab.lead': 'We apply AI to real problems in clinical care and medical education, and welcome collaborators from many fields.',
    'contact.collab.areas': 'Research areas open to collaboration',
    'contact.collab.note': 'When writing, please briefly describe your research background and what you have in mind. We will reply as soon as we can.',
    'contact.join': 'Join the Lab',
    'join.how': 'How to join',
    'join.contact': 'Contact',
    'join.email': 'Email',
    'footer.rights': 'All rights reserved',
    'footer.quick': 'Quick links',
  },
} as const;

export type UIKey = keyof (typeof ui)['zh'];

export function useT(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui.zh[key];
}
