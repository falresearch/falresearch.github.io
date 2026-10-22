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

/** 课题组成员的姓名（中英文），用于在论文作者列表里加粗 */
let memberNames: Promise<string[]> | undefined;
export function getMemberNames() {
  memberNames ??= getPeople().then((people) =>
    people.flatMap((p) => [p.data.name.zh, p.data.name.en, ...p.data.aliases]).filter((n): n is string => !!n),
  );
  return memberNames;
}

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

/** 作者名后加 * 表示通讯作者，会保留星号显示 */
export function highlightAuthors(authors: string, memberNames: string[]): string {
  return authors
    .split(',')
    .map((a) => {
      const name = a.trim();
      const safe = escapeHtml(name);
      return memberNames.includes(name.replace(/\*$/, '')) ? `<strong>${safe}</strong>` : safe;
    })
    .join(', ');
}
