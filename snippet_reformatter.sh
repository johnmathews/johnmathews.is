#! /bin/sh

echo "Processing file...";
for f in $(ls ./old_blog/content/articles/snippets/*.md | head -109999 ) ; do 
  echo "    $f";

  # get filename
  base="$(basename $f)"

  # make the slug also the filename.
  slug="$(gsed -n "s/^Slug: \(.*\)$/\1/p" ./old_blog/content/articles/snippets/$base)"

  # make filename match the slug, 
  # add --- to top of frontmatter cos its yaml
  (echo "---" && cat "./old_blog/content/articles/snippets/$base") > "./old_blog/new_content/articles/snippets/$slug.md"

  # add --- to end of frontmatter
  end_of_frontmatter=$( sed -n '/^$/=' $f | sed -n 1p )
  (gsed -e "$(($end_of_frontmatter+1)) i \---" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # get the line number containing the tags
  tag_line=$( sed -n '/^Tags:/=' $f | sed -n 1p )
  # echo $tag_line


  # front-matter keys should be lowercase
  (gsed -e " s/^Title:/title:/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/^Slug:/slug:/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/^Date:/date:/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/^Category:/category:/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/^Tags:/tags:/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/^Status:/status:/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/^Image:/image:/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/^Summary:/summary:/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/^Tweet:/tweet: /" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # wrap all datetimes in quotes so that they are treated a json serializable strings
  (gsed -e " s/^date: \(.*\)/date: '\1'/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # tags should be an array, not a list
  # add braces to start and end of tags list
  (gsed -e "$((tag_line+1)) s/^tags: \(.*\)$/tags: \['\L\1'\]/" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  # add quotes
  (gsed -e "$((tag_line+1)) s/, /', '/g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # remove python image-process markdown stuff
  (gsed -e " s/{: .image.*}//g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # update links to internal content 
  (gsed -e " s/({filename}\/articles\/\(.*\).md)/(\L\1)/g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # if tags key doesnt exist, create it
  if ! grep -q "Tags:" $f; then
    # echo "Tags key does not exist!!"
    # echo $end_of_frontmatter
    (gsed -e "$(($end_of_frontmatter+1)) i tags: \[\]" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  fi

  # remove colons from within title
  colon_in_title=$( gsed -n '/^Title:.*:.*$/=' $f | sed -n 1p )
  (gsed -e "$((colon_in_title+1)) s/:/: >\n    /" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # remove colons from within summary
  colon_in_summary=$( gsed -n '/^Summary:.*:.*$/=' $f | sed -n 1p )
  (gsed -e "$((colon_in_summary+1)) s/:/: >\n    /" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # replace <br> with <br></br>
  (gsed -e " s/<\/\{0,1\}br>/<br><\/br>/g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # use mdx table of contents plugin
  (gsed -e " s/\[TOC\]/Contents:\n<TOCInline toc={props.toc} exclude=\"Overview\" toHeading={2} \/>\n/g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # ensure there is at least 1 blank row above and below each image
  (gsed -e " s/\!\[\(.*\)\]({static}\.\.\(.*\))/\n\!\[\1\]({static}\.\.\2)/g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # change markdown image formatting
  (gsed -e " s/({static}\.\.\/images\//(\/static\/images\//g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md

  # make documents hosted on blog downloadable
  # (gsed -e " s/\[\(.*\)\]({attach}\/documents\//\[\1\](\/documents\//g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md
  (gsed -e " s/({attach}\/documents\//(\/documents\//g" ./old_blog/new_content/articles/snippets/$slug.md ) > /tmp/$slug.md && mv /tmp/$slug.md ./old_blog/new_content/articles/snippets/$slug.md



done


# copy selected snippets to new blog data folder
declare -a posts=( "globbing" "nmap" "nohup" "practice" )
echo "\ncopying files:"
for i in "${posts[@]}"
do
  cp "./old_blog/new_content/articles/snippets/$i.md" "./data/blog/$i.md" 
  echo "    $i.. done"
done
