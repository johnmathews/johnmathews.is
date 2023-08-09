---
title: Django CBV method flowchart
slug: django-cbv-method-flowchart
date: '2022-02-16 09:33:28'
category: Technical>Web
tags: ['django', 'back-end', 'web-dev']
---

The
[documentation](https://docs.djangoproject.com/en/3.2/ref/class-based-views/generic-display/)
calls it the method flowchart:

1. setup()
1. dispatch()
1. http_method_not_allowed()
1. get_template_names()
1. get_slug_field()
1. get_queryset()
1. get_object()
1. get_context_object_name()
1. get_context_data()
1. get()
1. render_to_response()

A question on [SO](https://stackoverflow.com/questions/17768444/django-class-based-views-function-execution-order).

## setup(request, \*args, \*\*kwargs)

- Performs key view initialization prior to dispatch().
- If overriding this method, you must call super().

## dispatch(request, \*args, \*\*kwargs)

- The view part of the view – the method that accepts a request argument plus arguments, and returns an HTTP response.

- The default implementation will inspect the HTTP method and attempt to delegate to a method that matches the HTTP method; a GET will be delegated to get(), a POST to post(), and so on.

- By default, a HEAD request will be delegated to get(). If you need to handle HEAD requests in a different way than GET, you can override the head() method. See Supporting other HTTP methods for an example.

## get_object(queryset=None)

Returns the single object that this view will display. If queryset is provided,
that queryset will be used as the source of objects; otherwise, get_queryset()
will be used. get_object() looks for a pk_url_kwarg argument in the arguments to
the view; if this argument is found, this method performs a primary-key based
lookup using that value. If this argument is not found, it looks for a
slug_url_kwarg argument, and performs a slug lookup using the slug_field.

## render_to_response(context, \*\*response_kwargs)¶

- Returns a self.response_class instance.

- If any keyword arguments are provided, they will be passed to the constructor of the response class.

- Calls get_template_names() to obtain the list of template names that will be searched looking for an existent template.

## response_class¶

- The response class to be returned by render_to_response method. Default is TemplateResponse. The template and context of TemplateResponse instances can be altered later (e.g. in template response middleware).

- If you need custom template loading or custom context object instantiation, create a TemplateResponse subclass and assign it to response_class.
