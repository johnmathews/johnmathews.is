---
title: Uninstall all pip packages
slug: uninstall-all-pip-packages
date: '2021-11-09 17:05:27'
category: technical.snippet
tags: ['python']
---

In case you want to reset your virtualenv:

```python
pip freeze | xargs pip uninstall -y
```
