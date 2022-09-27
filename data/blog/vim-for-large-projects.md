---
title: Using Vim with large codebases
slug: vim-for-large-projects
date: "2021-1-15 15:02"
category: Technical/Developer Tools
tags: []
---

I use Vim as my text editor and IDE. I like that its free, open
source and customizable. Below are some of the most useful
plugins and features I've started using this year when I was building Moneybar
and learning how to use Django.

There's a copy of my `.vimrc` at the end.

I'm happy to invest time and effort learning how to make the most of
Vim and its plugins. I'm confident that I'll still be using it twenty
years from now.

1.  Filetype plugins - if you want some settings to be active only for
    particular filetypes, like `.py` (python) or `.txt` (text) then create a file in
    `~/.vim/ftplugin/<filetype>.vim`.

    Vim will look in this file when it opens a buffer of the corresponding
    file type. Good for formatting options like line length, tab spaces, vim
    commands that are language specific.

    You can't activate plugins in these files though. All the plugins have to be
    activated in your `.vimrc` in the usual way.

2.  `janko-m/vim-test` - this plugin lets you runs tests without leaving vim.
    You can run the test that's nearest the cursor, or all the tests in the
    current buffer. It's very customizable. I wish it could be a bit faster, but
    I could probably improve that myself by changing some settings.

3.  `dense-analysis/ale` - The incredible Asyncronous Linting Engine (A.L.E)
    applies fixers and linters to various filetypes, when you want and how you want.
    Super useful for writing tidy code and catching mistakes before the code is
    run.

4.  `junegunn/fzf` and `junegunn/fzf.vim` - It took a little getting used to at
    first, but now I can't imagine not using a tool like this (this could be
    said about so many vim-related things). Use `fzf` to switch between open
    buffers, open a new file, search for files using the filename, or search
    within all the files in the project for specific text.

5.  `majutsushi/tagbar` - This plugin opens a sidebar which contains a list of
    of functions and classes and methods (tags). You can use it to see which
    methods a class contains, and jump to the part of the buffer where a tag
    is defined.

This is my `.vimrc` during January 2021.

```vim
" ========== Global ==========
set nocompatible              " always put it at the top of .vimrc. effects mappings, undo, etc.
set encoding=utf-8            " utf-8 encoding
set termguicolors
set t_Co=256                  " number of colors
set noerrorbells vb t_vb=     " no error bells, yes screnflash.
set linespace=8
set scrolloff=2               " minimum number of screen lines above and below the cursor
set shortmess-=S              " show how many times a search result occurs in current buffer, and index of current match
set hidden
set number relativenumber     " Line numbers
set splitbelow
set splitright
" set tabstop=8 softtabstop=0 expandtab shiftwidth=4 smarttab
set undofile                  " Maintain undo history between sessions
set undodir=~/.vim/undo       " put all the undo files in this dir

filetype on                   " enables filetype detection
filetype plugin indent on     " detection on, plugin on, indent on. To see the current status, type: :filetype
syntax on                 " syntax highlighting - try 'syntax on/enable'
set noesckeys			" might break stuff, should make <ESC> delay smaller
set timeoutlen=350            " timeoutlen is used for mapping delays
set ttimeoutlen=10             " ttimeoutlen is used for key code delays

"Search/Find/Highlight ======================================
set incsearch  ignorecase  smartcase  hlsearch
highlight Search guibg=purple guifg='NONE'
highlight Search cterm=none ctermbg=green ctermfg=black
highlight CursorColumn guibg=blue guifg=red
highlight CursorColumn ctermbg=red ctermfg=blue
nnoremap // :nohlsearch<CR>
nnoremap # #``
nnoremap * *``

" close buffers properly go to previous buffer, then delete the buffer you were just in.
nnoremap <Leader>bd :bp\|bd #<CR>
inoremap <Leader>bd :bp\|bd #<CR>

" Spell check ==============================================
set spelllang=en
nnoremap <leader>ss :setlocal spell!<CR>
nnoremap <leader>sf z=1<CR><CR>

" ========== Set leader and local leader ===================
let mapleader="\<Space>"
let localleader="\\"

" insert 1 space to the right, without leaving normal mode
nnoremap <localleader><space> i<Space><Right><ESC>

" Flash the cursor row (and column) colors are set after color scheme ========
" nnoremap <leader>f :call Flash()<CR>
" function! Flash()
"     " set cursorline cursorcolumn
"     set cursorline
"     redraw
"     sleep 110m
"     set nocursorline
" endfunction

" Edit/Reload the .vimrc file
nnoremap <silent> <leader>ve :e $MYVIMRC<CR>
nnoremap <silent> <leader>vr :so $MYVIMRC<CR>

augroup VimReload
    autocmd!
    autocmd BufWritePost $MYVIMRC source $MYVIMRC
augroup END

" Yank to clipboard
vnoremap <C-c> "+y
if has("clipboard")
  set clipboard=unnamed " copy to the system clipboard

  if has("unnamedplus") " X11 support
    set clipboard+=unnamedplus
  endif
endif

" Go into NORMAL mode
inoremap jk <ESC>

" view working directory
nnoremap <leader>pwd :cd %:p:h<CR>

" toggle line wrap
nnoremap <leader>lw :set nowrap!<CR>

" toggle line numbers
nnoremap <leader>ln :set relativenumber!<CR>

" Insert current datetime
nnoremap <leader>dt A ()<ESC>hh "=strftime("\%Y-\%m-\%d")<CR>gp

" map w to `
nnoremap ` w

" Swap : and ;
nnoremap ; :
nnoremap : ;
vnoremap ; :
vnoremap : ;

" Navigation & movemement
" save buffer if it has been changed
nnoremap ww :update<CR>
" close Vim, but not if there are unsaved changes
nnoremap qa :qa<CR>
" save all changes
nnoremap wa :wa<CR>
" close buffer
nnoremap qq :bp\|bd #<CR>
nnoremap wq :update<CR>:bp\|bd #<CR>
" switch buffers
nnoremap <silent> + :bn<CR>
nnoremap <silent> _ :bp<CR>

" Split navigations
nmap <Leader>h  <C-W><C-H>
nmap <Leader>j  <C-W><C-J>
nmap <Leader>k  <C-W><C-K>
nmap <Leader>l  <C-W><C-L>
nmap <Leader>ww  <C-W><C-W>
nmap <Leader>wq  <C-W><C-Q>

" split (pane) resize
nnoremap <C-k> :resize +2<CR>
nnoremap <C-j> :resize -2<CR>
nnoremap <C-h> :vertical resize +2<CR>
nnoremap <C-l> :vertical resize -2<CR>

" open help in vertical split by default
cabbrev vhelp vert help

" Natural cursor movement over wrapped lines
nnoremap j gj
nnoremap k gk

" Insert blank lines in normal mode
nnoremap <leader>o o<ESC>k
nnoremap <leader>O O<ESC>j

"*****************************
"========== PLUGINS ==========
"*****************************

call plug#begin('~/.vim/plugged')

" numbers as text objects
Plug 'MisanthropicBit/vim-numbers'


"run shell commands async in vim8"
Plug 'skywind3000/asyncrun.vim'
let g:asyncrun_open = 10

" When using :python or :!python, access the packages in venv
" :VirtualEnvList
" :VirtualEnvActivate <tab>
Plug 'jmcantrell/vim-virtualenv'

" force quickfix to be full widtth
au FileType qf wincmd J

" testing - many languages and test runners
Plug 'janko-m/vim-test'
let test#strategy = "asyncrun_background"
let test#python#runner = 'pytest'
let test#python#pytest#options = '-x'
let test#vim#term_position = "belowright"

nnoremap <silent> t<LEADER>n :TestNearest<CR>
nnoremap <silent> t<LEADER>f :TestFile<CR>
nnoremap <silent> t<LEADER>s :TestSuite<CR>
nnoremap <silent> t<LEADER>l :TestLast<CR>
nnoremap <silent> t<LEADER>g :TestVisit<CR>

" toggle the quickfix window
function! ToggleQuickFix()
    if empty(filter(getwininfo(), 'v:val.quickfix'))
        copen 15
	setlocal norelativenumber
    else
        cclose
    endif
endfunction

nnoremap <silent> cc :call ToggleQuickFix()<cr>


" generates an index (or tag) file of language objects found in source files
" <C-]> jump to definition
" <C-O> jump back
" g] see a list of multiple matches
" <C-t>
Plug 'universal-ctags/ctags'

" (re)generate tags file in the bg
Plug 'ludovicchabant/vim-gutentags'
let g:gutentags_ctags_exclude = ['.json', '.mypy_cache/**']

" sidebar that displays the ctags-generated tags of the current file, ordered by their scope
Plug 'majutsushi/tagbar'
nnoremap <F2> :TagbarToggle<CR>
nnoremap <F2> :TagbarToggle<CR>

" add python library code to tags file, goto def with <C-]>
let pyEnvLib = $VIRTUAL_ENV
let pyEnvLib .= '/lib/python3.8/'

" Async linting engine
Plug 'dense-analysis/ale'
let g:ale_lint_on_enter = 0
let g:ale_lint_on_save = 0

" ALE completion
let g:ale_completion_enabled = 0
set omnifunc=ale#completion#OmniFunc
let g:ale_completion_autoimport = 1

nnoremap <leader>at :ALEToggle<CR>
nnoremap <leader>af :ALEFix<CR>
nnoremap <silent> <leader>aj :ALENext<cr>
nnoremap <silent> <leader>ak :ALEPrevious<cr>

" iSort
Plug 'fisadev/vim-isort'
" track the snippets engine
Plug 'sirver/ultisnips'
" Snippets are separated from the engine. Add this if you want them:
Plug 'honza/vim-snippets'
" Trigger configuration. Do not use <tab> if you use https://github.com/Valloric/YouCompleteMe.
let g:UltiSnipsExpandTrigger="<c-a>"
let g:UltiSnipsJumpForwardTrigger="<c-b>"
let g:UltiSnipsJumpBackwardTrigger="<c-z>"
" If you want :UltiSnipsEdit to split your window.
" let g:UltiSnipsEditSplit="vertical"

Plug 'Valloric/YouCompleteMe'
Plug 'davidhalter/jedi'
Plug 'maksimr/vim-jsbeautify'

nnoremap <leader>x  :YcmCompleter GoTo<CR>
" the subcommands add entries to Vim's 'jumplist' so you can use
" 'CTRL-O' to jump back to where you were before invoking the command (and
" 'CTRL-I' to jump forward; see ':h jumplist' for details)
let g:ycm_confirm_extra_conf = 0
let g:ycm_autoclose_preview_window_after_completion=1
let g:ycm_collect_identifiers_from_tags_files = 1
let g:ycm_use_ultisnips_completer = 1
let g:ycm_seed_identifiers_with_syntax = 1
let g:ycm_complete_in_comments = 1
let g:ycm_complete_in_strings = 1
let g:ycm_collect_identifiers_from_tags_files = 1


" autoclose parens, brackets etc
" Plug 'townk/vim-autoclose'

" vim-tmux focus events
Plug 'tmux-plugins/vim-tmux-focus-events'

" Code folding
" Plug 'konfekt/fastfold'

" match m of n https://vimawesome.com/plugin/indexedsearch
" Plug 'henrik/vim-indexed-search'

" adds vertical lines to easily show indent levels
Plug 'yggdroot/indentline'

" Fugitive
Plug 'tpope/vim-fugitive'

" Marks
Plug 'kshenoy/vim-signature'

" Latex Vimtex
Plug 'lervag/vimtex'
let g:tex_flavor = 'latex'
autocmd Filetype tex set updatetime=1
let g:livepreview_previewer = 'open -a Preview'
let g:tex_IgnoredWarnings =
    \'Underfull'."\n".
    \'Overfull'."\n".
    \'specifier changed to'."\n".
    \'You have requested'."\n".
    \'Missing number, treated as zero.'."\n".
    \'There were undefined references'."\n".
    \'Citation %.%# undefined'."\n".
    \'Double space found.'."\n"
let g:Tex_IgnoreLevel = 8

" Rainbow parenthesis
let blacklist = ['html', 'md', 'wiki']
autocmd BufWritePre * if index(blacklist, &ft) < 0 | Plug 'luochen1990/rainbow'
let g:rainbow_active = 1
let g:rainbow_conf = {
    \'guifgs': ['green', 'magenta1', 'gold', 'red', 'deepskyblue'],
    \'guis': ['bold','standout','undercurl','italic','strikethrough']
    \}

" Set color scheme.
set background=dark

Plug 'chriskempson/base16-vim'
" colorscheme base16-default-dark
colorscheme badwolf
let g:badwolf_darkgutter = 1
let g:badwolf_html_link_underline = 1
let g:badwolf_css_props_highlight = 1

" colorscheme modifications
highlight Comment ctermfg=cyan guifg=cyan
highlight pythonComment ctermfg=cyan guifg=cyan
highlight LineNr ctermfg=cyan guifg=cyan
hi nontext term=bold ctermfg=Cyan guifg=#80a0ff gui=bold
hi vimLineComment term=bold ctermfg=Cyan guifg=#80a0ff gui=bold
" SpecialKey - use :set list to toggle visibility of EOL, CR, etc
hi specialKey term=bold ctermfg=Cyan guifg=#80a0ff gui=bold

" colors for flashing cursorline and cursorcolumn
hi CursorLine   cterm=NONE ctermbg=green ctermfg=black guibg=green guifg=black
hi CursorColumn cterm=NONE ctermbg=green ctermfg=black guibg=green guifg=black

" query what kind of syntax is this color? - wc
nnoremap wc :echo "hi<" . synIDattr(synID(line("."),col("."),1),"name") . '> trans<' . synIDattr(synID(line("."),col("."),0),"name") ."> lo<" . synIDattr(synIDtrans(synID(line("."),col("."),1)),"name") . ">"<CR>

" fuzzy file, buffer, tag finder
set rtp+=/usr/local/opt/fzf

" ensure you have the latest version
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'

nnoremap <silent> <Leader>e :Files<CR>
nnoremap <silent> <Leader>r :Buffers<CR>
nnoremap <silent> <Leader>t :Tags<CR>
nnoremap <silent> <Leader>ff :Rg<CR>
" nnoremap <silent> <Leader>ff :Ag<CR>
nnoremap <silent> <Leader>la :BLines<CR>
nnoremap <silent> <Leader>ll :Lines<CR>
nnoremap <silent> <Leader>' :Marks<CR>
nnoremap <silent> <Leader>fh :Helptags<CR>
nnoremap <silent> <Leader>fs :Snippets<CR>
nnoremap <silent> <Leader>fc :Commits<CR>
nnoremap <silent> <Leader>fbc :BCommits<CR>
nnoremap <silent> <Leader>hh :History<CR>
nnoremap <silent> <Leader>h: :History:<CR>
nnoremap <silent> <Leader>h/ :History/<CR>

" let $FZF_DEFAULT_OPTS = '--layout=reverse --info=inline'
" let $FZF_DEFAULT_COMMAND="rg --files --hidden"

let g:fzf_buffers_jump = 0
let g:fzf_layout = { 'down': '~50%' }
" let g:fzf_preview_window = ''
let g:fzf_preview_window = 'right:0%'

function! s:copy_results(lines)
  let joined_lines = join(a:lines, "\n")
  if len(a:lines) > 1
    let joined_lines .= "\n"
  endif
  let @+ = joined_lines
endfunction

let g:fzf_action = {
  \ 'ctrl-t': 'tab split',
  \ 'ctrl-x': 'split',
  \ 'ctrl-v': 'vsplit',
  \ 'ctrl-o': function('s:copy_results'),
  \ }

let g:fzf_colors =
\ { 'fg':      ['fg', 'Normal'],
  \ 'bg':      ['bg', 'Normal'],
  \ 'hl':      ['fg', 'Comment'],
  \ 'fg+':     ['fg', 'CursorLine', 'CursorColumn', 'Normal'],
  \ 'bg+':     ['bg', 'CursorLine', 'CursorColumn'],
  \ 'hl+':     ['fg', 'Statement'],
  \ 'info':    ['fg', 'PreProc'],
  \ 'prompt':  ['fg', 'Conditional'],
  \ 'pointer': ['fg', 'Exception'],
  \ 'marker':  ['fg', 'Keyword'],
  \ 'spinner': ['fg', 'Label'],
  \ 'header':  ['fg', 'Comment'] }


" grep in vim - shows results in a split window
Plug 'mileszs/ack.vim'

" session tracking
Plug 'tpope/vim-obsession'

" pairs of handy bracket mapping
Plug 'tpope/vim-unimpaired'

" https://vimawesome.com/plugin/surround-vim
Plug 'tpope/vim-surround'

" repeat commands from plugin mappings
Plug 'tpope/vim-repeat'

" vinegar
Plug 'tpope/vim-vinegar'
let g:netrw_liststyle = 3

" CSV
Plug 'chrisbra/csv.vim'

" nerdtree
Plug 'scrooloose/nerdtree'

nnoremap <Leader>n :NERDTreeToggle<CR>
let g:nerdtree_tabs_autoclose=1
let NERDTreeAutoDeleteBuffer = 1 " Automatically delete the buffer of the file you just deleted
let g:nerdtree_tabs_open_on_gui_startup=2 " 2 - open nerdtree only if directory was given as startup argument
let g:nerdtree_tabs_smart_startup_focus=2 " always focus file window after startup
let NERDTreeShowHidden=0

" Status bars
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
let g:airline_powerline_fonts = 1
let g:hybrid_custom_term_colors = 0
let g:hybrid_reduced_contrast = 0
let g:airline_statusline_ontop=0
let g:airline_section_y='' " remove encoding status
let g:airline_skip_empty_sections = 1
let g:airline_theme='badwolf'
let g:airline#extensions#fugitiveline#enabled = 1
let g:airline#extensions#tmuxline#enabled = 1
let g:airline#extensions#gutentags#enabled = 1
let g:airline#extensions#virtualenv#enabled = 1
let g:airline#extensions#ale#enabled = 1
let g:airline#extensions#csv#enabled = 0
let g:airline#extensions#tagbar#enabled = 0
let g:airline#extensions#vimtex#enabled = 0
let g:airline#extensions#tabline#enabled = 0
let g:airline#extensions#tabline#formatter = 'unique_tail_improved'

" comments
Plug 'scrooloose/nerdcommenter'
let g:NERDSpaceDelims = 1
let g:NERDCompactSexyComs = 1
let g:NERDDefaultAlign = 'left'
let g:NERDCommentEmptyLines = 0
let g:NERDTrimTrailingWhitespace = 1

" markdown. tabular is required
Plug 'plasticboy/vim-markdown'
Plug 'godlygeek/tabular'
let g:vim_markdown_fenced_languages = ['python=py']
let g:vim_markdown_follow_anchor = 0
let g:vim_markdown_conceal_code_blocks = 0
let g:vim_markdown_folding_disabled = 1
let g:vim_markdown_conceal = 0
let g:tex_conceal = ""
let g:vim_markdown_math = 1
let g:vim_markdown_new_list_item_indent = 4
let g:vim_markdown_strikethrough = 1

" writing prose
Plug 'reedes/vim-pencil'
Plug 'junegunn/goyo.vim'

augroup pencil
  autocmd!
  autocmd FileType wiki,md,txt call pencil#init()
  autocmd FileType wiki,md,txt :PencilSoft
augroup END

let g:pencil#wrapModeDefault = 'soft'

autocmd! User GoyoEnter
autocmd! User GoyoLeave

" Ensure :q to quit even when Goyo is active
function! s:goyo_enter()
  let b:quitting = 0
  let b:quitting_bang = 0
  autocmd QuitPre <buffer> let b:quitting = 1
  cabbrev <buffer> q! let b:quitting_bang = 1 <bar> q!
  setlocal wrap
endfunction

" Quit Vim if this is the only remaining buffer
function! s:goyo_leave()
  if b:quitting && len(filter(range(1, bufnr('$')), 'buflisted(v:val)')) == 1
    if b:quitting_bang
      qa!
    else
      qa
    endif
  endif
endfunction

autocmd! User GoyoEnter call <SID>goyo_enter()
autocmd! User GoyoLeave call <SID>goyo_leave()

nnoremap <Leader>g :Goyo<CR>

" python linting
" F7 checks flake8
Plug 'nvie/vim-flake8'
Plug 'vim-scripts/pylint.vim'

"Flagging Unnecessary Whitespace
highlight BadWhitespace ctermbg=red guibg=darkred

Plug 'sheerun/vim-polyglot'
let g:polyglot_disabled = ['latex', 'html']
let g:python_highlight_all = 1
let g:graphql_javascript_tags = []

" javaScript
Plug 'pangloss/vim-javascript'
let g:javascript_plugin_jsdoc = 1
let g:javascript_plugin_flow = 1
" format .JSON files by using the jq cli tool
com! JQ %!jq

" HTML/JINJA
Plug 'glench/vim-jinja2-syntax'
Plug 'valloric/matchtagalways'
" Plug 'alvan/vim-closetag'
let g:closetag_filenames = "*.html, *.xhtml, *.phtml"

call plug#end()
```
