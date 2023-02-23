#! /bin/sh

for f in $(ls ./data/blog/*.md ) ; do 
  echo "    $f";
  g="${f:2}"
  echo "    $g";
  # (gsed -i -e " s/^category: t.snippet/category: technical.snippet/" $f )
  # (gsed -i -e " s/^category: nt.snippet/category: nonTechnical.snippet/" $f )

  # (gsed -i -e " s/^category: t.snippet, nt.snippet/category: technical.snippet, nonTechnical.snippet/" $f )
  # (gsed -i -e " s/^category: nt.snippet, t.snippet/category: nonTechnical.snippet, technical.snippet/" $f )

  # (gsed -i -e " s/^category: nonTechnical.snippet, technical.snippet/category: technical.snippet, nonTechnical.snippet/" $f )
  
  # (gsed -i -e " s/^category: technical.snippet, nonTechnical.snippet/category: technical.snippet, non-technical.snippet/" $f )
  # (gsed -i -e " s/^category: nonTechnical.snippet/category: non-technical.snippet/" $f )
 
  (gsed -i -e " s/^category: technical.snippet, nt.snippet/category: technical.snippet, non-technical.snippet/" $f )
  (gsed -i -e " s/^category: non-technical.snippet, t.snippet/category: technical.snippet, non-technical.snippet/" $f )
  (gsed -i -e " s/^category: t.snippet, non-technical.snippet/category: technical.snippet, non-technical.snippet/" $f )
  (gsed -i -e " s/^category: nt.snippet, technical.snippet/category: technical.snippet, non-technical.snippet/" $f )



done
