--  RUN 1st
create extension vector;

-- RUN 2nd
create table jm (
  id bigserial primary key,
  blog_title text,
  blog_url text,
  blog_date text,
  blog_thanks text,
  content text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

-- RUN 3rd after running the scripts
create or replace function jm_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  blog_title text,
  blog_url text,
  blog_date text,
  blog_thanks text,
  content text,
  content_length bigint,
  content_tokens bigint,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    jm.id,
    jm.blog_title,
    jm.blog_url,
    jm.blog_date,
    jm.blog_thanks,
    jm.content,
    jm.content_length,
    jm.content_tokens,
    1 - (jm.embedding <=> query_embedding) as similarity
  from jm
  where 1 - (jm.embedding <=> query_embedding) > similarity_threshold
  order by jm.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RUN 4th
create index on jm 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
