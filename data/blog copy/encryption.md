---
title: Encryption
date: "2016-08-30 23:04"
Author: John Mathews
category: Technical/Cryptocurrencies
tags:
  [
    "encryption",
    "rsa",
    "dlt",
    "blockchains",
    "bitcoin",
    "digital currencies",
    "public key cryptography",
  ]
slug: encryption
status: published
---

Blockchains use Elliptical Curve Cryptography (ECC) to authenticate users and
authorise transactions. These notes introduce the field of cryptography and
explains how modern cryptographic methods work. I wrote them to teach myself
about encryption [^1]

To begin with the absolute basics, encryption generally works by taking a
message and representing it as a series of numbers [^2] which are then turned
into a series of random looking numbers. Decryption works by turning the random
looking numbers back into the original message.

## Background

The history of Cryptography can be split into classical and modern eras. Modern
cryptography began in 1977 with the introduction of the RSA and Diffie-Hellman
algorithms.  Until then, Cryptography required using a single key (the secret
code) to encrypt and decrypt the message. This was transferred from sender to
receiver secretly, but not cryptographically. In classical cryptography, the
code is a *shared* secret.

The modern era removed the requirement for a shared secret and instead used
number theory as a basis for quantifying the strength of an encryption method.
The strength of a modern cryptographic technique is quantifiable and provable by
reference to number theory, rather than a users ability to transport or transfer
a secret code.

Modern cryptography is defined by Public Key Cryptographic systems. They use one
key (code) for encryption and another for decryption. The encryption key can be
made public without any risk of the message being decrypted, and is therefore
known as the public key. The key used to decrypt data is the private key, and
must not be revealed. If a message is encrypted with the public key it can only
be decrypted with the private key.

Public Key Cryptographic (PKC) systems use algorithms that are easy to process
in one direction but difficult to reverse, which are known as mathematical
trap-door functions. A simple example of a trap-door function is the product of
two prime numbers. If two random prime numbers are chosen, it is trivial to find
their product. However if only the product of the two numbers is known, it is
relatively difficult to find either of the factors used to create the number
(this is factorisation). This was first noticed in 1874, when
[Jevons](https://en.wikipedia.org/wiki/William_Stanley_Jevons#Jevons.27_number)
remarked:

> "Can the reader say what two numbers multiplied together will produce the number 8,616,460,799? I think it unlikely that anyone but myself will ever know."\*

This simple problem shows that finding the product of two (secret) prime numbers
is computationally simple, but factorising the result is not. This type of
problem is a key feature of modern cryptography. Factoring prime numbers is a
super famous mathematical problem, it was studied
by [Eratosthenes](https://en.wikipedia.org/wiki/Eratosthenes) [^3] in the 3rd
century BC and more recently the [RSA Factoring
Challenge](https://en.wikipedia.org/wiki/RSA_Factoring_Challenge) has intended
to track state-of-the-art factorisation techniques by issues cash prizes for the
factorisation of products of large primes.

Generally, the bigger the difference in difficulty between executing the
function and reversing it, the better the cryptographic technique.

The RSA algorithm below uses factorisation as the foundation of its security,
but factorisation is not the hardest problem to solve relative to the size of
the keys required. Algorithms have been developed to factor the products of
large prime numbers, and are much more efficient than randomly guessing possible
factors. The greater the size of the primes being factored, the more efficient
these algorithms become, and therefore the difference in difficulty between
executing the function (multiplying two large primes) and reversing it
(factorisation) becomes smaller as the size of the cryptographic key length
increases. This is a problem because as public key cryptography becomes more
commonly used the resources available to factor products of primes increases,
and consequently larger keys are required.

Ultimately, encryption techniques based on the difficulty of factorisation will
become redundant as the difficulty gap between creating and solving them
shrinks. A better trap door function is required.

## Overview of the RSA algorithm

Named after its founders ([Ron Rivest](https://en.wikipedia.org/wiki/Ron_Rivest "Ron Rivest"), [Adi Shamir](https://en.wikipedia.org/wiki/Adi_Shamir "Adi
Shamir"), and [Leonard Adleman](https://en.wikipedia.org/wiki/Leonard_Adleman "Leonard ")), RSA was one of the first public-key encryption algorithms and is
still widely used.

RSA (as well as other cryptographic techniques) makes use of a number line which
loops back to zero after reaching a maximum value, rather than increasing
indefinitely. This means that once a maximum number $n$ has been defined, if a
number greater than $n$ is created the result simply loops around to 0 and
begins counting from 0 again. i.e. if $n = 10$, then $7 + 5 = 12 - 10 = 2$. The
result of a calculation on a looping number line may easily be found by doing
long division and using the remainder as the final answer, i.e. $12 / 10 = 1$
with $2$ remaining.

## Generation of a pair of RSA keys:

### 1. Generate the RSA module

- Select two large random prime numbers, $p$ and $q$. They need to be random because anyone who knows or guesses them will be able to decrypt the encryption.
- Calculate $n = pq$

### 2. Find derived number (e)

- *e* must be greater than 1 and less than $( p - 1)( q - 1)$.
- There must be no common factor for e and $( p - 1)( q - 1)$ except for 1. [^4]

### 3. Form the public key

- The pair of numbers $(n, e)$ form the public key and can be made public.
- Even though $n$ is public, it is so difficult to factor the product of 2 large prime numbers that an attacker would not be able to find its component primes in the time available. The strength of RSA rests entirely on the difficulty of factoring $n$ into its two component prime numbers.

### 4. Generate the private key (d)

- The private key is generated from using $p$, $q$ and e as inputs to the Extended Euclidean Algorithm. For a given set of values, there is a unique answer $d$.
- $d$ is the inverse of $e$ modulo $( p - 1)( q - 1 )$. This means that $d$ is the number less than $( p - 1 ) ( q - 1 )$ such that when it is multiplied by e, it is equal to $1$ modulo $( p - 1 ) ( q - 1 )$.

## RSA example:

RSA does not directly operate on strings as bits, it operates on numbers modulo
(less than) $n$. and it is necessary to represent plain text as a series of
numbers less than $n$. The dominant encoding on the internet
is [UTF-8](https://en.wikipedia.org/wiki/UTF-8), which represents each
upper case Latin letter as a number between 65 and 90. Using this encoding, a
message "HELLO" would become "$72, 69, 76, 76, 79$".

The maximum number $n$ needs to be the product of the two prime numbers $p$ and
$q$. For this example choose $p = 7$ and $q = 13$, so $n  = 91$ [^5]

The public key component *e* can be any number we choose,  as long as there is
no number other than 1 which is a common factor of *e* and $( p - 1 ) ( q - 1
)$. In our example, this requires that there be no common factor between
72 and e other than 1, so let _e_ $= 5$.

Therefore our public key is (91, 5). This can be made available to anyone
without messages being decrypted because of the difficulty of factoring the
product of (very large) prime numbers.

Using the fact that we know 5 and 11 are the prime factors of 55 and e is 5, we
can use the Extended Euclidean Algorithm  to compute our private key $d$, which
is 29.

Therefore when the prime factors 7 and 13 are used, the public key is (91, 5)
and the private key is (91, 29). These parameters fully define a functional RSA
system.

### Encoding

To encode a letter H in a message ('H' is $72$ in UTF-8), we need to multiply it
by itself $e$ times ($e = 5$), remembering to wrap around each time we pass our
maximum value of $n = 91$.

$72 \times 72 = 5184, 5184 / 91 = 56$ with $88$ remaining, (i.e. $5184 = 91 \times 56 + 88$). Therefore:
$72 \times 72 = 5184 = 88$
$88 \times 72 = 6336 = 57$
$57 \times 72 = 4104 = 9$
$9 \times 72 = 648 = 11$

Therefore the encrypted value of "H" is "$11$"

Using the method for each character in the message "HELLO" results in the
encoded message "\$11,62,20,20,53\$".

To decrypt the message, we take each number and multiply it by itself $d$ times,
($d=29$) wrapping around each time we pass $91$.

$11 \times 11 = 121 = 30$
$30 \times 11 = 330 = 57$
...
$57 \times 11 = 627 = 81$
$81 \times 11 = 891 = 72$

And we're back to our original encoding.

## Files

The spreadsheet I used to calculate the encrypted and decrypted values can be
downloaded [here](/documents/RSA-Example.xlsx).

A simple python script to encrypt and decrypt a message is
[here](/documents/AES_Example.py). It uses the AES encryption method.

## Footnotes

[^1]: I used the explanations [here](http://www.tutorialspoint.com/cryptography/public_key_encryption.htm) and [here](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/) a lot.
[^2]: A simple example is $A=1, B=2$ etc
[^3]: Eratosthenes invented his famous [sieving algorithm](https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) which finds all the primes up to a given limit.
[^4]: If this is the case then e and ( p - 1) ( q - 1 ) are called "coprime"
[^5]: Whilst the Extended Euclidean Algorithm is apparently simple to compute, its description is not. Therefore I've used the same numbers in the following example as in the tutorials [here](http://www.tutorialspoint.com/cryptography/public_key_encryption.htm) and [here](http://arstechnica.com/security/2013/10/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/).
