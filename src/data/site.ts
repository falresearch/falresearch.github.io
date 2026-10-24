// 站点全局信息 —— 把这里的占位内容换成你们课题组的真实信息
export const site = {
  name: { zh: '未来智能课题组', en: 'Future AI Lab' },
  shortName: 'FAL',
  // TODO: 补充学院名称
  affiliation: { zh: '南京医科大学', en: 'Nanjing Medical University' },
  founded: 2026,
  hero: {
    eyebrow: { zh: 'AI × 医学', en: 'AI × Medicine' },
    title: {
      zh: '以智能之力，\n探索医学未来',
      en: 'Building the future\nof medicine with AI',
    },
    lead: {
      zh: '课题组聚焦人工智能与医学的交叉研究，以电子病历与医疗大模型为核心，发展可靠、可解释的智能方法，推动其在临床诊疗与医学教育中的应用。',
      en: 'We work at the intersection of artificial intelligence and medicine. Centered on electronic health records and medical large language models, we develop reliable and interpretable methods and bring them into clinical care and medical education.',
    },
  },
  // 首页“关于我们”：一句话定位 + 简短介绍 + 三个入口
  about: {
    title: { zh: '让人工智能\n真正走进临床', en: 'Bringing AI\ninto the clinic' },
    body: {
      zh: '未来智能课题组（Future AI Lab, FAL）依托南京医科大学，以电子病历与医疗大模型为核心，研究可靠、可解释的人工智能方法，并推动其在临床诊疗、医学教育与公众健康中的应用。',
      en: 'The Future AI Lab (FAL) at Nanjing Medical University builds reliable, interpretable AI methods centered on electronic health records and medical large language models, and brings them into clinical care, medical education and public health.',
    },
    pillars: [
      {
        label: { zh: '研究', en: 'Research' },
        text: { zh: '电子病历诊断预测、虚拟患者、健康问答与可信评估', en: 'EHR-based prediction, virtual patients, health QA and trustworthy AI' },
        href: '/research',
      },
      {
        label: { zh: '合作', en: 'Collaborate' },
        text: { zh: '欢迎临床、公共卫生与计算机领域的同行开展科研合作', en: 'Open to collaboration with clinicians, public-health and computing researchers' },
        href: '/contact#collab',
      },
      {
        label: { zh: '加入', en: 'Join' },
        text: { zh: '面向本科同学开放，在真实课题中接受系统的科研训练', en: 'Undergraduates get hands-on research training on real projects' },
        href: '/contact#join',
      },
    ],
  },
  // 首页数字统计（4 项，按顺序显示）
  //   value：数字（中英文可分别写，如中文“20 万”、英文“200K”）；unit：单位；plus：是否显示“+”
  //   value 写 'auto:pubs' / 'auto:research' 时自动统计论文数 / 研究方向数
  stats: [
    { value: 'auto:pubs', label: { zh: '发表论文', en: 'Publications' }, plus: true },
    { value: { zh: 20, en: 200 }, unit: { zh: '万', en: 'K' }, label: { zh: '临床电子病历', en: 'EHR records' }, plus: true },
    { value: 3000, label: { zh: '虚拟患者结构化病例', en: 'Structured virtual-patient cases' }, plus: true },
    { value: 'auto:research', label: { zh: '研究方向', en: 'Research areas' } },
  ],
  scholar: 'https://scholar.google.com/citations?user=DCDjlOYAAAAJ',
  contact: {
    // 页面上目前只显示邮箱；电话与地址保留备用
    email: 'huangrc@njmu.edu.cn',
    phone: '',
    address: {
      zh: '江苏省南京市 · 南京医科大学',
      en: 'Nanjing Medical University, Nanjing, Jiangsu, China',
    },
  },
  social: [
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=DCDjlOYAAAAJ' },
  ],
  // 访问统计（留空则不加载）
  // baidu：百度统计站点 ID（tongji.baidu.com → 代码获取，hm.js? 后面那串）
  // clarity：Microsoft Clarity 项目 ID（clarity.microsoft.com → 设置 → 安装代码里的那串），用于查看访问路径与热力图
  analytics: { baidu: 'b33241095222456a96b2367b7f3ddc85', clarity: 'z2xjiwai3n' },
};
