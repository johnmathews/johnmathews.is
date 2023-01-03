---
title: Principles Of Object Orientated Programming
slug: principles-of-oop
date: "2021-1-4 16:27"
category: Technical.Developer-Tools
tags: ["uncategorized"]
---

I recently interviewed for a lead developer role at [Lab Digital](https://labdigital.nl/en/)[^1] and thought it would be sensible to review some of the fundamental aspects of Object Orientated Programming (OOP).

You might think that's a unusual way to prepare for an interview, and you'd be right. Nothing close to these notes arose during the interview, but I find this stuff interesting. If I'm motivated enough to study it, then I think that's a good enough reason by itself, without a specific reason. These are some brief notes.

Object Orientated Programming has four key aspects:

1. Encapsulation (Hiding information)
2. Abstraction (Hiding the implementation)
3. Inheritance
4. Polymorphism

## 1. Encapsulation

- Each object keeps its state private, inside a class.
- Instance variables/properties/attributes are kept private and accessor methods are made public.
- Other objects don’t have direct access to this state. They can only call a list of public functions (methods).
- The object manages its own state via methods, no other class can touch it unless explicitly (not default) allowed.
- Private variables.
- Public methods.
- You can define classes within classes, and functions within functions.

## 2. Abstraction

- A natural extension of encapsulation
- A concept or idea that is not associated with any particular instance.
- Expresses the intent of the class, rather than a specific implementation.
- Programs are often extremely large and separate objects communicate with each other a lot. This makes maintaining large programs difficult, and abstraction tries to solve this.
- Applying abstraction means that each object should only expose a high-level mechanism for using it.
  - This mechanism should hide internal implementation details. It should only reveal operations relevant for the other objects.
  - This mechanism should be easy to use and should rarely change over time.
- Implementation changes — for example, a software update — rarely affect the abstraction you use.
- e.g. a coffee machine. It does a lot of stuff and makes quirky noises under the hood. But all you have to do is put in coffee and press a button.

## 3. Inheritance

- In OOP, objects are often similar, sharing similar logic. But they are not 100% the same.
- Create a (child) class by deriving from another (parent) class. This way, we form a hierarchy.
- child class reuses all fields and methods of the parent class (common part) and can implement its own unique part using method or attribute overloading.

## 4. Polymorphism

- Gives a way to use a class exactly like its parent so there’s no confusion with mixing types. But each child class keeps its own methods as they are.
- This typically happens by defining a (parent) interface to be reused. It outlines a bunch of common methods. Then, each child class implements its own version of these methods.
- Any time a collection (such as a list) or a method expects an instance of the parent (where common methods are outlined), the language takes care of evaluating the right implementation of the common method — regardless of which child is passed.

I'd like to be so familiar with the following features that I can use them without referring to notes:

1. Getters and setters.
2. Instance methods compared to class methods.
3. Inheritance, mixins, and decorators.
4. The "magic" within the `Django` source code that requires `mypy` to use extensions in order to do its static type checking correctly.

[^1]: Unfortunately I didn't get the job. They wanted a senior Python developer with experience with `Infrastructure As Code`, and also working at an agency. Can't win them all.
