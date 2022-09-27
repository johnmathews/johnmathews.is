#! /bin/sh

echo "Processing file...";
for f in $(ls ./data/blog/*.md  ) ; do 
  echo "    $f";
  # get filename
  base="$(basename $f)"


  (gsed -e ' s/^tags: (.*\), ""]$/tags: \[\1\]]/g' $f ) > /tmp/$base.md && mv /tmp/$base.md $f
  # (gsed -e " s/^tags: \[\]$/tags: \['uncategorized'\]/g" $f ) > /tmp/$base.md && mv /tmp/$base.md $f

  # (gsed -e ' s/^tags: \[\(.*\),"\]$/tags: \[\1"\]/g' $f ) > /tmp/$base.md && mv /tmp/$base.md $f
  # (gsed -e ' s/^tags: \[ \[\(.*\)\]"\]/tags: \[\1"\]/g' $f ) > /tmp/$base.md && mv /tmp/$base.md $f

done
