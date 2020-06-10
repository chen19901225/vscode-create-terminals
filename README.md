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

