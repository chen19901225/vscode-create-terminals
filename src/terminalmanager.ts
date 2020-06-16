import * as vscode from "vscode";
import * as path from "path";
import * as moment from 'moment';

interface ICommand {
    name: string
    cmd: string;
}

interface IConfig extends vscode.WorkspaceConfiguration {
    commands: ICommand[];
}

export class TerminalManager {
    private _outputChannel: vscode.OutputChannel;
    private _context: vscode.ExtensionContext;
    private _config!: IConfig;

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
        this._outputChannel = vscode.window.createOutputChannel("create-terminals");

        this.loadConfig();
        this.logText("loadConfig");
    }

    public logText(text:string){
        this._outputChannel.appendLine(`${moment().format()}--${text}`);
    }

    public loadConfig() {
        this._config = vscode.workspace.getConfiguration("create-terminals") as IConfig;
    }

    public closeTerminal() {
        let searchTerminal= (name:string):vscode.Terminal|null=>{

            let terminals = vscode.window.terminals;
            
            for(let i=0;i<terminals.length;i++){
                let walkTerminal = terminals[i];
                if(walkTerminal.name === name){
                    return walkTerminal;
                }
            }
            return null;
        }
        for(let i=0;i<this._config.commands.length;i++){
            let command = this._config.commands[i];
            let terminal = searchTerminal(command.name);
            if(terminal == null){
                this.logText(`terminal ${command.name} already closed`);
            } else {
                
                terminal.dispose();
                this.logText(`success close terminal ${command.name}`)
            }
        }
    }

    public start() {
        let interval = () => {
            //this.logText("call interval");
            setTimeout(() => {
                interval()
            }, 5000);
            this.run_once();
        }

        interval();


    }
    public getWorkspaceRoot(): string | undefined {
        if (vscode.workspace.workspaceFolders) {
            return vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        return undefined;

    }

    public getOrCreateTerminal(name: string): [boolean, vscode.Terminal] {
        let terminalList = vscode.window.terminals;
        for (let i = 0; i < terminalList.length; i++) {
            let walkTerminal = terminalList[i];
            if (walkTerminal.name === name) {
                return [false, walkTerminal]
            }
        }
        let createdTerminal = vscode.window.createTerminal(name);
        return [true, createdTerminal]
    }

    public formatCmd(cmdStr: string): string {
        let rootPath = this.getWorkspaceRoot();
        let defaultProjectName = rootPath?.split(path.sep).pop();
        defaultProjectName = defaultProjectName?.replace("-", "_");
        cmdStr = cmdStr.replace(/\${workspaceRoot}/g, `${rootPath}`);
        cmdStr = cmdStr.replace(/\${projectName}/g, `${defaultProjectName}`);

        return cmdStr;
    }



    public run_once() {
        let commands = this._config.commands;
        for (let i = 0; i < commands.length; i++) {
            let command = commands[i];
            let [is_create, terminal] = this.getOrCreateTerminal(command.name);
            if (is_create === true) {
                // 只有当是新建的时候，才需要运行command
                this.logText(`create terminal ${command.name}`);
                let cmd = this.formatCmd(command.cmd);
                terminal.sendText(cmd);
            }
        }
    }




}