# create-terminals README

configure created terminals once vscode open


## valid replace for cmd

`${workspaceRoot}`: workspaceRoot

`${projectName}`: project name, if `${workspaceRoot}=/home/vagrant/data-end`, then `${projectName}=data_end`

## config example

### echo and tail supervisor

```
"create-terminals.commands": [
        {
            "cmd": "echo hello",
            "name": "hello"
        },
        {
            "cmd": "sudo s tail -f file_watcher_lint_${projectName}",
            "name":"tail_lint",
        }
    ],
```

it will create two terminals `hello` and `tail_lint`

### changes

#### 0.0.2

add timestamp to channel log

#### 0.0.4

add command `create-terminals.reloadConfig` to reloadConfig and create terminals

#### 0.0.5

fix `create-terminals.reloadConfig` to create terminal quickly.

#### 0.0.6

fix replace bug

### 0.0.7

add `close all terminal` command to close all active terminal

