---
title: Jupyter (iPython) notebooks + Pandas
date: "2016-08-03 13:04"
Author: John Mathews
category: Technical>Developer-Tools
tags: ["data", "jupyter notebook", "pandas", "python"]
slug: Jupyter-ipython-notebooks-pandas
status: published
---

When working with more data than can fit in an Excel file, or when you
want to be sure the data won't be edited, you usually need to interact with
the data by writing scripts.

One of the biggest time sinks (for me) when working with these tools
(ACL, SQL, Python) is debugging, and working out exactly where in the
chain of individual commands something unexpected happened. Even with
only a modest page of code, I can quickly find myself rerunning the
entire script multiple times and commenting-out and uncommenting
multiple lines in order to understand what's really going on. If you
have a time consuming task at the start of your script, such as a
summarise and sort command, the extra time required can be even greater.
This leads to interrupted flow and concentration.

Pandas is a python package to manipulate large datasets, the Jupyter
notebook is an application which allows the user to run a python script
in chunks, and output the results of each chunk before continuing. You
can re-run a previous chunk without returning to the beginning, and
change the code as you go along. This is amazingly flexible and
intuitive.

I recently worked through an exceptionally good Pandas tutorial recorded
at PyCon 2015. "[Pandas from the ground
up](https://youtu.be/5JnMutdy6Fw)" is well structured, clear, has good
scope and the resources are available to download from
[github](https://github.com/brandon-rhodes/pycon-pandas-tutorial).
Brandon Rhodes gives you a good working foundation for using Pandas and
the Jupyter notebook to manipulate datasets using Python.
