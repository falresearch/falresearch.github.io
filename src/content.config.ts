import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse } from 'yaml';

const localized = z.object({ zh: z.string(), en: z.string().optional() });

// 记录每条在 YAML 中的位置，用于按文件顺序排序和自动编号
const withOrder = (text: string) =>
  (parse(text) as Record<string, unknown>[]).map((entry, i) => ({ ...entry, fileOrder: i }));

const people = defineCollection({
  loader: file('src/data/people.yaml', { parser: withOrder }),
  schema: z.object({
    name: localized,
    role: z.enum(['pi', 'faculty', 'postdoc', 'phd', 'master', 'undergrad', 'alumni']),
    // 论文里出现的其他写法（如 Google Scholar 的 "R Huang"），用于作者加粗
    aliases: z.array(z.string()).default([]),
    title: localized.optional(),
    interests: localized.optional(),
    bio: localized.optional(),
    // 头像放在 public/people/ 下，这里写 /people/xxx.jpg；不填则显示首字母头像
    avatar: z.string().optional(),
    email: z.string().optional(),
    homepage: z.string().optional(),
    // 以下字段主要用于本科生 / 毕业成员的文字卡片
    major: localized.optional(), // 专业 · 年级，如 "临床医学 · 2023 级"
    // 参与课题，可以写一个，也可以写多个（列表）
    topics: z
      .union([localized, z.array(localized)])
      .optional()
      .transform((v) => (v == null ? [] : Array.isArray(v) ? v : [v])),
    // 成果：type 可选 paper（论文）/ award（获奖）/ project（项目）/ other（其他），有几条写几条
    //   论文写 pub（publications.yaml 中的 id），自动显示论文全称并链接到原文；zh / en 写作者位次，如“第一作者”
    //   其他成果写 zh / en 描述，可选 link 附上链接
    achievements: z
      .array(
        z
          .object({
            type: z.enum(['paper', 'award', 'project', 'other']).default('other'),
            pub: z.string().optional(),
            zh: z.string().optional(),
            en: z.string().optional(),
            link: z.string().optional(),
          })
          .refine((a) => a.pub || a.zh, { message: '成果需要填写 pub（论文 id）或 zh（描述）' }),
      )
      .default([]),
    period: z.string().optional(), // 在组时间，如 "2024.09 – 2026.06"
    // 毕业成员的去向（可选）
    now: localized.optional(),
    // 成员编号（LAB MEM 001…），不填则按 people.yaml 中的顺序自动编号
    mem: z.number().int().positive().optional(),
    fileOrder: z.number(),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    type: z.enum(['journal', 'conference', 'preprint']),
    // 与课题组成员同名、但并非本组成员的作者，写在这里可避免被错误加粗
    notMembers: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    links: z
      .object({
        pdf: z.string().optional(),
        code: z.string().optional(),
        doi: z.string().optional(),
        project: z.string().optional(),
      })
      .default({}),
  }),
});

const research = defineCollection({
  loader: file('src/data/research.yaml'),
  schema: z.object({
    order: z.number(),
    title: localized,
    summary: localized,
    details: localized.optional(),
    keywords: z.array(z.string()).default([]),
    pubs: z.array(z.string()).default([]),
  }),
});


const join = defineCollection({
  loader: file('src/data/join.yaml'),
  schema: z.object({
    order: z.number(),
    title: localized,
    points: z.object({ zh: z.array(z.string()), en: z.array(z.string()).optional() }),
  }),
});

const collab = defineCollection({
  loader: file('src/data/collab.yaml'),
  schema: z.object({
    order: z.number(),
    title: localized,
    points: z.object({ zh: z.array(z.string()), en: z.array(z.string()).optional() }),
  }),
});

export const collections = { people, publications, research, join, collab };
