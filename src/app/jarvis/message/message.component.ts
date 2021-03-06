import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
import { MarkdownService } from 'ngx-markdown';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {
    _ref: any;
    private _buttonCommand: BehaviorSubject<any>;
    @Input() message: any;
    @Output() deleteMessageFromJson = new EventEmitter();

    constructor(private markdownService: MarkdownService) {
        this._buttonCommand = new BehaviorSubject("");
    }

    ngOnInit() {
        this.markdownService.renderer.paragraph = (text: string) => {
            return text;
        }
    }

    deleteMessage(messageNumber: number) {
        this._ref.destroy();
        this.deleteMessageFromJson.emit(messageNumber);
    }

    // removeObject() {
    //     this._ref.destroy();
    // }

    getButtonCommand(): Observable<any> {
        return this._buttonCommand.asObservable();
    }

    setButtonCommand(command: any) {
        this._buttonCommand.next(command);
    }

    sendButtonCommand(command) {
        this.setButtonCommand(command);
    }

}
