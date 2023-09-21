# vim: set filetype=sql:

--  RUN 1st
create extension vector;

-- RUN 2nd
create table blog_content (
  id bigserial primary key,
  blog_title text,
  blog_url text,
  blog_date text,
  content text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

-- RUN 3rd after running the scripts
create or replace function blog_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  blog_title text,
  blog_url text,
  blog_date text,
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
    blog_content.id,
    blog_content.blog_title,
    blog_content.blog_url,
    blog_content.blog_date,
    blog_content.content,
    blog_content.content_length,
    blog_content.content_tokens,
    1 - (jm.embedding <=> query_embedding) as similarity
  from blog_content
  where 1 - (blog_content.embedding <=> query_embedding) > similarity_threshold
  order by blog_content.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RUN 4th
create index on blog_content 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
