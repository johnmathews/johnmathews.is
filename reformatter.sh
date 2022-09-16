#! /bin/sh

for f in $(ls ./old_blog/content/articles/*.md | head -109999 ) ; do 
  echo "Processing $f file...";

  # get filename
  base="$(basename $f)"


  # make the slug also the filename.
  slug="$(gsed -n "s/^Slug: \(.*\)$/\1/p" ./old_blog/content/articles/$base)"

  # make filename match the slug, and add --- to top
  (echo "---" && cat "./old_blog/content/articles/$base") > "./old_blog/new_content/articles/$slug.md"

  # add --- to end of frontmatter
  n=$( sed -n '/^$/=' $f | sed -n 1p )
  (gsed -e "$((n+1)) i \---" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md

  # colons in title
  colon=$( gsed -n '/^Title:.*:.*$/=' $f | sed -n 1p )
  (gsed -e "$((colon+1)) s/:/: >\n    /" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md

  # front-matter keys should be lowercase
  (gsed -e " s/^Title:/title:/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md
  (gsed -e " s/^Slug:/slug:/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md
  (gsed -e " s/^Date:/date:/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md
  (gsed -e " s/^Category:/category:/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md
  (gsed -e " s/^Tags:/tags:/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md
  (gsed -e " s/^Status:/status:/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md
  (gsed -e " s/^Image:/image:/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md
  (gsed -e " s/^Summary:/summary:/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md

  # wrap all datetimes in quotes so that they are treated a json serializable strings
  (gsed -e " s/^date: \(.*\)/date: '\1'/" ./old_blog/new_content/articles/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/$slug.md

done
