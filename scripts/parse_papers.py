#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
论文数据解析器

把约定格式的论文清单（默认 papers.txt）转换成网站使用的数据文件
public/papers.json。

约定格式（与用户沟通时直接把这段格式说明发给用户）：
  - 两篇论文之间用一个空行分隔
  - 每行一条字段，格式为「字段名: 内容」（中英文冒号均可）
  - 固定字段：编号、标题、作者、年份、会议、链接
  - 其他字段名视为「二级分类标签名」，其内容是该论文的标签，
    多个标签用逗号分隔，例如：Display Form: 2D (image), 3D (object)
  - 没有的字段整行省略即可；# 开头的行是注释，会被忽略
  - 标签字段名必须与网站分类体系中的二级分类名逐字一致（区分大小写）

用法：
  python scripts/parse_papers.py                # papers.txt -> public/papers.json
  python scripts/parse_papers.py 输入.txt 输出.json
"""

import json
import re
import sys
from pathlib import Path

# 固定字段：中文别名 -> JSON 字段名
FIXED_FIELDS = {
    '编号': 'number',
    'number': 'number',
    '标题': 'title',
    'title': 'title',
    '作者': 'authors',
    'authors': 'authors',
    '年份': 'year',
    'year': 'year',
    '时间': 'year',
    '会议': 'conference',
    'conference': 'conference',
    '链接': 'link',
    'link': 'link',
}

SPLIT_RE = re.compile(r'[,，;；]')


def to_int(value, context, warnings):
    """把字符串解析成整数，容忍夹杂非数字字符（如「2025年」）；失败返回 None。"""
    try:
        return int(value.strip())
    except ValueError:
        match = re.search(r'\d+', value)
        if match:
            return int(match.group())
        warnings.append(f'无法识别的{context}: "{value}"（已跳过该字段）')
        return None


def split_key_value(line):
    """按第一个冒号（中英文均可）切分一行，返回 (key, value)；无冒号返回 None。"""
    match = re.match(r'^([^:：]+)[：:]\s*(.*)$', line)
    if not match:
        return None
    return match.group(1).strip(), match.group(2).strip()


def parse_paper(block, warnings):
    """解析一个论文块（若干行文本），返回论文 dict 或 None。"""
    paper = {}
    for raw in block.splitlines():
        line = raw.strip()
        if not line or line.startswith('#'):
            continue
        kv = split_key_value(line)
        if kv is None:
            warnings.append(f'无法识别的行（缺少冒号，已跳过）: "{line}"')
            continue
        key, value = kv
        field = FIXED_FIELDS.get(key.lower())
        if field == 'number':
            number = to_int(value, '编号', warnings)
            if number is not None:
                paper['number'] = number
        elif field == 'year':
            year = to_int(value, '年份', warnings)
            if year is not None:
                paper['year'] = year
        elif field == 'title':
            paper['title'] = value
        elif field == 'authors':
            # 清理特殊空格，统一为普通空格
            value = value.replace(' ', ' ').replace('　', ' ').strip()
            # 统一加 "by " 前缀（前端按此渲染）
            if not value.lower().startswith('by '):
                value = 'by ' + value
            paper['authors'] = value
        elif field:
            paper[field] = value
        else:
            # 标签字段：字段名即二级分类名
            if key not in paper:
                paper[key] = [t.strip() for t in SPLIT_RE.split(value) if t.strip()]
            else:
                paper[key].extend(t.strip() for t in SPLIT_RE.split(value) if t.strip())
    return paper or None


def parse_papers(text, warnings):
    """把整份文件文本解析成论文列表（按编号排序、去重）。"""
    blocks = re.split(r'\n\s*\n', text)
    papers = []
    for block in blocks:
        paper = parse_paper(block, warnings)
        if paper is None:
            continue
        if 'number' not in paper:
            warnings.append(f'某篇论文缺少「编号」，已跳过: {paper.get("title", "(无标题)")}')
            continue
        if 'title' not in paper:
            warnings.append(f'论文 {paper["number"]} 缺少「标题」')
        papers.append(paper)

    seen = {}
    for paper in papers:
        number = paper['number']
        if number in seen:
            warnings.append(f'编号 {number} 重复，后者覆盖前者')
        seen[number] = paper

    result = sorted(seen.values(), key=lambda p: p['number'])
    for paper in result:
        # 缩略图文件名与编号绑定
        paper.setdefault('thumbnail', f"{paper['number']}.png")
        # 补齐所有已知标签字段为空数组，避免前端键缺失
        paper.setdefault('conference', '')
        paper.setdefault('link', '')
    return result


def validate(papers, warnings):
    """跨论文一致性检查，问题都写入 warnings。"""
    numbers = [p['number'] for p in papers]
    if numbers and numbers != list(range(min(numbers), min(numbers) + len(numbers))):
        missing = sorted(set(range(min(numbers), max(numbers) + 1)) - set(numbers))
        if missing:
            warnings.append(f'编号不连续，缺少: {missing}')
    tag_keys = set()
    for paper in papers:
        tag_keys.update(k for k in paper if k not in
                        set(FIXED_FIELDS.values()) | {'thumbnail'})
    for paper in papers:
        absent = tag_keys - set(paper)
        if absent:
            warnings.append(f'论文 {paper["number"]} 缺少标签字段: {sorted(absent)}')


def main():
    args = sys.argv[1:]
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    input_file = Path(args[0]) if len(args) >= 1 else project_root / 'papers.txt'
    output_file = Path(args[1]) if len(args) >= 2 else project_root / 'public' / 'papers.json'

    if not input_file.exists():
        print(f'错误: 找不到输入文件 {input_file}')
        sys.exit(1)

    warnings = []
    papers = parse_papers(input_file.read_text(encoding='utf-8'), warnings)

    output_file.parent.mkdir(parents=True, exist_ok=True)
    output_file.write_text(
        json.dumps(papers, ensure_ascii=False, indent=2) + '\n',
        encoding='utf-8')

    print(f'已转换 {len(papers)} 篇论文 -> {output_file}')
    if warnings:
        print('\n注意（请逐条确认后再发布）:')
        for w in warnings:
            print(f'  - {w}')
    else:
        print('检查通过，无警告。')


if __name__ == '__main__':
    main()
