---
title: I Leaked Credentials Onto A Public GitHub Repo
slug: i-leaked-credentials-onto-a-public-github-repo
date: '2021-04-15 19:19:35'
category: Technical>Engineering
tags: ['hack', 'github', 'service-account', 'keys', 'security']
---

<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

# Don't post secrets to public GitHub repositories.

I made this mistake a while ago, and in the interests of openness and learning
from others, I'd like to describe what happened. Maybe it'll help others avoid
the mistake, and maybe I'll learn something from any conversation this article
generates.

# Background

Using Google Cloud Platform (GCP), I've been doing some work across multiple
compute instances. Thankfully, the work wasn't business critical or on
production systems. My account was isolated away from the rest of the
business.

As the number of servers I was working with increased, I realised I needed to
begin using some tools to automate server setup. This lead me to begin using
Ansible, and once I'd cobbled together a working playbook I pushed my Ansible
project to my GitHub account... And accidentally leaked the key for an
account I'd been using.

# The hack

Within a couple of minutes of pushing the repository to GitHub I:

- Made the repository private.
- Stopped tracking the keys in git and removed them from the cache `git rm -r --cached <dir>`.
- Received an email from Google saying they'd found leaked credentials.

OK, close call. The secret was leaked for less than 5 minutes. On my obscure
personal GitHub.

I thought there was nothing to worry about.. But then I noticed some activity
in the console.

Compute instances were being created, I could see the list growing rapidly.
Over the next few minutes 195 compute instances and disks were being created,
each with a unique name in zones across the world. The format of the name was
`node-<type>-<number>`. Where type was either application, backup, jenkins,
gke, prod, staging, worker, www, build, redis, or runner. Maybe some others
too. The number seemed to be 5 random digits.

Some of the instances were ephemeral. They all had delete protection enabled. I
checked the details of a few of them and noticed some scripts that included
references to Monero.

So I guess a Monero mining bot was being set up.

The logs showed that GKE and networking resources had also been requested, but
the account which the stolen credentials belonged to didn't have the necessary
permissions. Our project also maxed out its quota of compute instances in
multiple regions and zones.

# Remediation

I deleted the account that had been leaked, and began quantifying the
damage. I wanted to know exactly what permissions the key had, which
resources could be created, and could the leaked account be used to create
other accounts? No, it can't.

After looking around and becoming confident that it was _only_ 195 compute
instances with disks and delete protection that had been created, in regions
and zones across the globe, I began to remove them. No other resources had been
provisioned.

It took me 10 minutes and some googling to create the following workflow:

1. Get all the compute instances and dump them into a file. I expected to run a
   script that iterated through the file line by line, setting variables based
   on the content of the current line: `gcloud compute instances list --format 'csv[no-heading](name, zone)' > names.txt`

2. In Vim, find the rows that contain the instances that I don't want to
   delete, and remove these from the file. There are a handful of compute
   instances I want to keep, and 195 that I want to remove. `:v/node-` shows
   any rows that _don't_ include "node-&rdquo;

3. Loop through the file and for each row, which contains the instance name and its zone,
   - Remove delete protection
   - Delete the instance

```sh
while IFS=, read -r name zone
  do gcloud compute instances update $name --zone $zone --no-deletion-protection \
  && gcloud compute instances delete $name --zone $zone --quiet
done < names.txt
```

The `--quiet` flag is necessary because otherwise gcloud will ask me to confirm
that I want to delete the instance otherwise.

# Questions

I'm surprised by the speed with which the attacker found the leaked
credentials. The repo did not belong to the clients account but my own, and I
assume that my account is obscure enough to not be on any interesting lists. If
my account is being scanned every few minutes, presumably all accounts are
being scanned regularly.

How many resources are required to do that? I guess if one of these attacks
works you can use the stolen compute to scan more repositories for more leaked
credentials. It's easy to imagine scenarios where large corporations that are
already running complicated cloud infrastructure deployments wouldn't notice a
few (200?) unauthorized compute instances running.

# Study

- [Service accounts](https://www.youtube.com/playlist?list=PLIivdWyY5sqIlPnZ7cvkg2Ck-8ZZ8TA5t) on Google Cloud Platform.
- [Ansible](https://www.youtube.com/watch?v=goclfp6a2IQ&t=1962s) videos.
- [SSH](https://www.youtube.com/watch?v=hQWRp-FdTpc) crash course.
- [Vagrant](https://youtu.be/vBrezgoX) crash course.
- [IFS=](https://stackoverflow.com/questions/26479562/what-does-ifs-do-in-this-bash-loop-cat-file-while-ifs-read-r-line-do/26480210) syntax explanation.

# Comments

There was some useful [discussion](https://lobste.rs/s/5vwctk/i_leaked_credentials_onto_public_github) about this article on Lobste.rs.
