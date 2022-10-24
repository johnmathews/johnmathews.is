---
title: >
  Unix: Utilities To Analyse And Update Multiple Text Files
slug: using-unix-utilities-to-analyse-and-update-multiple-files
category: Technical>Developer-Tools
date: "2021-1-4 13:02"
tags: ["uncategorized"]
---

As part of the redesign of this blog I wanted to make an article's category more meaningful. Previously, I simply picked a handful of categories and then assigned a single category to each post. This method becomes limiting when an article is relevant to multiple categories.

Also, using nested categories seems like a good way of grouping similar content and allowing more nuanced filtering of interests.

As I considered how to update the categories of existing articles, I realised this would be a good opportunity to practice analyzing and updating text files using unix utilities.

Here is how I reviewed and updated the categories of my existing articles:

I use Pelican to generate the static files for this site. It converts markdown into HTML. Metadata for each article is set at the beginning of a file, the title is set by typing `Title: ...` and similarly the category is set by typing `Category: ...` on its own line.

To locate, analyse and update my existing categories, I would therefore need to
find all the markdown files which have a row that begins with `Category: `

- `grep -h ‘Category:’ **/*.md` - prints each search result.
- `grep -h ‘Category:’ **/*.md | sort` - prints and sorts each search result.
- `grep -h ‘Category:’ **/*.md | sort | uniq -c` prints and sorts each search
  result, then counts how many occurrences of each unique result there are.

I had some repeat results though because some rows had white space at the end,
so in order to make these the same, I needed to remove trailing whitespace:

- `grep -h 'Category:' **/*.md | sed 's/[[:space:]]//g' | sort | uniq -c`

This gave me the following results:

```shell
6 Category:
2 Category:Data
16 Category:Disintermediation
2 Category:Engineering
2 Category:Front-end
15 Category:General
15 Category:Startups
8 Category:Tools
```

Category is repeated and isn't needed:

- `grep -h 'Category:' **/*.md | sed 's/[[:space:]]//g' | sort | uniq -c | sort | sed 's/Category://g'`

This gives me the following output, which is acceptable:

```shell
2 Data
2 Engineering
2 Front-end
6
8 Tools
15 General
15 Startups
16 Disintermediation
```

## New Categories

The next stage was to begin updating these categories with the new, nested
categories. I've decided to try splitting the categories into technical and
non-technical groups.

I can imagine splitting `Technical > Data` even more in
future, perhaps having `Data Analytics`, `Data Science`, and `Data Engineering` as
sub categories.

- Technical
  - Data
  - Developer Tools
  - Web
  - Cryptocurrency
  - Civil Engineering
- Not technical
  - Entrepreneurship
  - Family
  - Self
  - Career

I `cd` into the directory containing the markdown files, and then to change
all the articles with `Category: Tools` to `Category: Technical/Developer Tools` I did:

- `grep -l 'Category: Tools' *.md | xargs sed -i 's/Category: Tools/Category: Technical\/Developer Tools/g'`

If I want to see a list of files containing `Category: General`:

- `grep -H 'Category: General' *.md`

If I want to see just the file names, then:

- `grep -l 'Category: General' *.md`

# Update

Since writing this post I've modified the categories a few times. The commands I
run to switch out categories are as follows:

```sh
export oldName=Lifestyle; export newName=Living
grep -l "Category: .*Non-technical/$oldName" content/articles/*.md | xargs sed -i '' "s/Non-technical\/$oldName/Non-technical\/$newName/g"
```

Notes:

- Double quotes are not the same as single quotes. You need to use them if you
  want to access variables or commands inside a string.
- `.*` is a wildcard operator allowing any number of characters. It's
  required when an article belongs to multiple categories.
