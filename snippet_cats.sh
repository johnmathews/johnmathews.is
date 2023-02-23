#! /bin/sh

for f in $(ls ./data/blog/*.md ) ; do 
  echo "    $f";
  (gsed -e " s/^category: t.snippet/category: technical.snippet/" $f ) > /tmp/$f && mv /tmp/$f $f 
done
