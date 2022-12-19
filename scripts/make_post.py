import os
import subprocess
import sys
from datetime import datetime

TEMPLATE = """
---
title: {title}
date: "{year}-{month}-{day} {hour}:{minute:02d}"
category:
tags:
draft: false
image:
summary:
---
"""

def make_entry(title):
    title = title.replace('_', ' ').title()
    today = datetime.today()
    slug = title.lower().strip().replace(' ', '-')
    f_create = "data/blog/{}.mdx".format(slug)
    t = TEMPLATE.strip().format(
        title=title,
        hashes='#' * len(title),
        year=today.year,
        month=today.month,
        day=today.day,
        hour=today.hour,
        minute=today.minute,
        slug=slug
    )

    editor = os.getenv('EDITOR', 'vim')

    if os.path.exists(f_create):
        print("Opening existing file")
    else:
        with open(f_create, 'a') as w:
            w.write(t)
        print("File created -> " + f_create)

    subprocess.call('%s %s' % (editor, f_create), shell=True)


'''
    App_Path = '/usr/local/Cellar/macvim/8.0-127/MacVim.app'
    subprocess.Popen([App_Path, f_create], shell = True)
'''

if __name__ == '__main__':
    if len(sys.argv) > 1:
        make_entry(sys.argv[1])
    else:
        print("No title given")

