import { getCollection } from 'astro:content';

export async function getPublications() {
  const pubs = await getCollection('publications');
  return pubs.sort((a, b) => b.data.year - a.data.year);
}

export async function getResearch() {
  const items = await getCollection('research');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getCollabSections() {
  const items = await getCollection('collab');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getJoinSections() {
  const items = await getCollection('join');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export const roleOrder = ['pi', 'faculty', 'postdoc', 'phd', 'master', 'undergrad', 'alumni'] as const;

export async function getPeople() {
  const people = (await getCollection('people')).sort((a, b) => a.data.fileOrder - b.data.fileOrder);
  // 没写 mem 的成员按文件顺序补上编号，跳过已被手动占用的号码
  const taken = new Set(people.map((p) => p.data.mem).filter(Boolean));
  let next = 1;
  return people.map((p) => {
    if (p.data.mem) return { ...p, mem: p.data.mem };
    while (taken.has(next)) next++;
    taken.add(next);
    return { ...p, mem: next };
  });
}

/** LAB MEM 001 */
export const labMem = (n: number) => `LAB MEM ${String(n).padStart(3, '0')}`;

/** 论文作者列表里用来识别课题组成员的信息 */
export interface AuthorMatcher {
  names: string[];
  /** 本科生（含已毕业的本科生），作者名后标注“本科生” */
  undergrad: boolean;
  /** 只在这些论文里识别；null 表示所有论文（负责人等） */
  pubs: Set<string> | null;
}

/** 学生只在自己 achievements 里列出的论文中识别，避免把同名的其他作者误标为组员 */
let authorMatchers: Promise<AuthorMatcher[]> | undefined;
export function getAuthorMatchers() {
  authorMatchers ??= getPeople().then((people) =>
    people.map((p) => {
      const student = p.data.role === 'undergrad' || p.data.role === 'alumni';
      return {
        names: [p.data.name.zh, p.data.name.en, ...p.data.aliases].filter((n): n is string => !!n),
        undergrad: student,
        pubs: student ? new Set(p.data.achievements.map((a) => a.pub).filter((id): id is string => !!id)) : null,
      };
    }),
  );
  return authorMatchers;
}

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** 加粗本论文中的课题组成员，本科生后加标注；作者名后加 * 表示通讯作者，会保留星号显示 */
export function highlightAuthors(
  authors: string,
  pubId: string,
  matchers: AuthorMatcher[],
  notMembers: string[],
  undergradLabel: string,
): string {
  return authors
    .split(',')
    .map((a) => {
      const name = a.trim();
      const bare = name.replace(/\*$/, '');
      const safe = escapeHtml(name);
      if (notMembers.includes(bare)) return safe;
      const m = matchers.find((m) => m.names.includes(bare) && (!m.pubs || m.pubs.has(pubId)));
      if (!m) return safe;
      const tag = m.undergrad ? `<span class="pub__ug">${escapeHtml(undergradLabel)}</span>` : '';
      return `<strong>${safe}</strong>${tag}`;
    })
    .join(', ');
}
