#! /bin/sh

echo "Processing file...";
for f in $(ls ./data/blog/*.md  ) ; do 
  echo "    $f";
  # get filename
  base="$(basename $f)"


  # (gsed -e ' s/^tags: (.*\), ""]$/tags: \[\1\]]/g' $f ) > /tmp/$base.md && mv /tmp/$base.md $f
  # (gsed -e " s/^tags: \[\]$/tags: \['uncategorized'\]/g" $f ) > /tmp/$base.md && mv /tmp/$base.md $f

  # (gsed -e ' s/^tags: \[\(.*\),"\]$/tags: \[\1"\]/g' $f ) > /tmp/$base.md && mv /tmp/$base.md $f
  # (gsed -e ' s/^tags: \[ \[\(.*\)\]"\]/tags: \[\1"\]/g' $f ) > /tmp/$base.md && mv /tmp/$base.md $f
  


  # ensure there is at least 1 blank row above and below each image
  (gsed -e "s/\!\[\(.*\)\]({static}\.\.\(.*\))/\n\!\[\1\]({static}\.\.\2)/g" $f ) > /tmp/$base.md && mv /tmp/$base.md $f 

  # change markdown image formatting
  (gsed -e "s/({static}\.\.\/images\//(\/static\/images\//g" $f ) > /tmp/$base.md && mv /tmp/$base.md $f 

done
