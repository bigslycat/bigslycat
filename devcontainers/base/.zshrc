export SAVEHIST='10000'
export PROMPT_COMMAND='history -a'
export HISTCONTROL='ignoreboth'
export HISTFILE="${HISTFILE:-"$HOME/.zsh_history"}"

setopt EXTENDED_HISTORY
setopt INC_APPEND_HISTORY
setopt SHARE_HISTORY
setopt HIST_IGNORE_DUPS
setopt HIST_IGNORE_ALL_DUPS
setopt HIST_IGNORE_SPACE
setopt HIST_SAVE_NO_DUPS
setopt HIST_VERIFY
setopt HIST_REDUCE_BLANKS


autoload -Uz compinit promptinit
compinit
promptinit

export PATH="$HOME/bin:$HOME/.local/bin:$PATH"

eval "$(starship init zsh)"
